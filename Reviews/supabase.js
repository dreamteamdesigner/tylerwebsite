const { createClient } = supabase;

const SUPABASE_URL = "https://panqdcdjylcmmrwemakg.supabase.co";
const SUPABASE_KEY = "sb_publishable_BWqcIGipjAN6cNCb6uf93A_zhkMM_ia";

const db = createClient(SUPABASE_URL, SUPABASE_KEY);