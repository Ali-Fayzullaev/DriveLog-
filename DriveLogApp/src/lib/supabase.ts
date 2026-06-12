import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your Supabase credentials
// 1. Create project at https://supabase.com
// 2. Settings → API → copy "Project URL" and "anon public" key
export const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
export const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

export const isSupabaseConfigured =
  !SUPABASE_URL.includes('YOUR_PROJECT') &&
  !SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY');

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
