import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yuqqbzzvufugtlbbjhtg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_E1TW5WupAesrkWmvOupYgg_sjfcAjcJ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
