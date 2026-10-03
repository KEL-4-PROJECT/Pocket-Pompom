import { supabase } from './supabaseClient';

export interface Pet {
  id: string;
  pet_name: string;
  hunger: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  coins: number;
  is_sleeping: boolean;
  sleep_start_time: string | null;
  equipped_outfit: string;
  equipped_accessory: string;
  last_updated: string;
}

export interface InventoryItem {
  id: string;
  pet_id: string;
  item_id: string;
  item_type: 'outfit' | 'accessory';
  unlocked_at: string;
}

export interface PetDataWithInventory {
  pet: Pet | null;
  inventory: InventoryItem[];
}

/**
 * Fetch or create a pet profile by owner/pet name.
 */
export async function getOrCreatePetByName(name: string): Promise<PetDataWithInventory> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error('Nama tidak boleh kosong');
  }

  // 1. Search for existing pet profile with matching name (case-insensitive)
  const { data: existingPet, error: searchError } = await supabase
    .from('pets')
    .select('*')
    .ilike('pet_name', trimmedName)
    .maybeSingle();

  if (searchError) {
    console.error('Error searching pet profile:', searchError.message);
  }

  let petData: Pet;

  if (existingPet) {
    petData = existingPet as Pet;
  } else {
    // 2. Create brand new pet profile with 500 starting coins & 100 stats
    const { data: newPet, error: createError } = await supabase
      .from('pets')
      .insert([
        {
          pet_name: trimmedName,
          hunger: 100,
          energy: 100,
          happiness: 100,
          cleanliness: 100,
          coins: 500,
          is_sleeping: false,
          equipped_outfit: 'none',
          equipped_accessory: 'none',
        },
      ])
      .select('*')
      .single();

    if (createError || !newPet) {
      console.error('Error creating pet profile:', createError?.message);
      throw new Error('Gagal membuat profil Pompom baru.');
    }

    petData = newPet as Pet;
  }

  // 3. Fetch user_inventory for this pet
  const { data: inventoryData, error: inventoryError } = await supabase
    .from('user_inventory')
    .select('*')
    .eq('pet_id', petData.id);

  if (inventoryError) {
    console.error('Error fetching inventory:', inventoryError.message);
  }

  // Save active profile name to localStorage for fast auto-login
  if (typeof window !== 'undefined') {
    localStorage.setItem('pompom_active_name', petData.pet_name);
    // Add to saved profiles list in localStorage
    try {
      const savedList = JSON.parse(localStorage.getItem('pompom_saved_profiles') || '[]');
      if (!savedList.includes(petData.pet_name)) {
        savedList.push(petData.pet_name);
        localStorage.setItem('pompom_saved_profiles', JSON.stringify(savedList));
      }
    } catch {
      // ignore JSON parse error
    }
  }

  return {
    pet: petData,
    inventory: (inventoryData || []) as InventoryItem[],
  };
}

/**
 * Fetch default or active pet data from database.
 */
export async function getPetData(): Promise<PetDataWithInventory> {
  let activeName = '';
  if (typeof window !== 'undefined') {
    activeName = localStorage.getItem('pompom_active_name') || '';
  }

  if (activeName) {
    try {
      return await getOrCreatePetByName(activeName);
    } catch {
      // Fallback if error
    }
  }

  // Fallback: Fetch first record if no active name
  const { data: petData, error: petError } = await supabase
    .from('pets')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (petError || !petData) {
    return { pet: null, inventory: [] };
  }

  const { data: inventoryData } = await supabase
    .from('user_inventory')
    .select('*')
    .eq('pet_id', petData.id);

  return {
    pet: petData as Pet,
    inventory: (inventoryData || []) as InventoryItem[],
  };
}

/**
 * Update specific stats or columns for a pet.
 */
export async function updatePetStats(
  petId: string,
  updates: Partial<Omit<Pet, 'id'>>
): Promise<Pet> {
  const payload = {
    ...updates,
    last_updated: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('pets')
    .update(payload)
    .eq('id', petId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating pet stats:', error.message);
    throw error;
  }

  return data as Pet;
}

/**
 * Equip an outfit or accessory on a pet.
 */
export async function equipItem(
  petId: string,
  type: 'outfit' | 'accessory',
  itemId: string
): Promise<Pet> {
  const updatePayload =
    type === 'outfit'
      ? { equipped_outfit: itemId }
      : { equipped_accessory: itemId };

  return updatePetStats(petId, updatePayload);
}

/**
 * Purchase an item from the shop, save to user_inventory, deduct coins, and equip it.
 */
export async function buyAndEquipItem(
  petId: string,
  itemId: string,
  itemType: 'outfit' | 'accessory',
  cost: number
): Promise<{ pet: Pet; inventoryItem: InventoryItem }> {
  const { data: currentPet, error: fetchError } = await supabase
    .from('pets')
    .select('coins, equipped_outfit, equipped_accessory')
    .eq('id', petId)
    .single();

  if (fetchError || !currentPet) {
    throw new Error(fetchError?.message || 'Pet not found');
  }

  if (currentPet.coins < cost) {
    throw new Error('Koin tidak cukup untuk membeli item ini');
  }

  const { data: newInventory, error: inventoryError } = await supabase
    .from('user_inventory')
    .insert([
      {
        pet_id: petId,
        item_id: itemId,
        item_type: itemType,
      },
    ])
    .select('*')
    .single();

  if (inventoryError) {
    console.error('Error adding item to inventory:', inventoryError.message);
    throw inventoryError;
  }

  const newCoins = currentPet.coins - cost;
  const equipPayload =
    itemType === 'outfit'
      ? { coins: newCoins, equipped_outfit: itemId }
      : { coins: newCoins, equipped_accessory: itemId };

  const updatedPet = await updatePetStats(petId, equipPayload);

  return {
    pet: updatedPet,
    inventoryItem: newInventory as InventoryItem,
  };
}

/**
 * Reset pet cleanliness stat to 100.
 */
export async function cleanPet(petId: string): Promise<Pet> {
  return updatePetStats(petId, { cleanliness: 100 });
}
