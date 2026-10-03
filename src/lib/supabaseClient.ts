import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrwfitkkgpatclcnhpjz.supabase.co';
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_czwIF0dV8Qahh5XHYk6lVg_qDXjU0bd';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
