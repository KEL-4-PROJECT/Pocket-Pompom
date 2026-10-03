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
 * Fetch the first pet record from the database along with its inventory items.
 */
export async function getPetData(): Promise<PetDataWithInventory> {
  const { data: petData, error: petError } = await supabase
    .from('pets')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (petError) {
    console.error('Error fetching pet data:', petError.message);
    throw petError;
  }

  if (!petData) {
    return { pet: null, inventory: [] };
  }

  const { data: inventoryData, error: inventoryError } = await supabase
    .from('user_inventory')
    .select('*')
    .eq('pet_id', petData.id);

  if (inventoryError) {
    console.error('Error fetching inventory data:', inventoryError.message);
    throw inventoryError;
  }

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
  // 1. Get current pet coins
  const { data: currentPet, error: fetchError } = await supabase
    .from('pets')
    .select('coins, equipped_outfit, equipped_accessory')
    .eq('id', petId)
    .single();

  if (fetchError || !currentPet) {
    throw new Error(fetchError?.message || 'Pet not found');
  }

  if (currentPet.coins < cost) {
    throw new Error('Insufficient coins to purchase this item');
  }

  // 2. Insert item into user_inventory
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

  // 3. Deduct coins & equip item on pet
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
