import "dotenv/config"
import { createClient } from '@supabase/supabase-js'

const { 
    SUPABASE_URL,
    SUPABASE_KEY
} = process.env as { [name:string]: string }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase