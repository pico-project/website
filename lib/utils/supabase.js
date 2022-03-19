"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYWdmeHlqa3V0dm1nZG9ic29lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzE3NDA1MywiZXhwIjoxOTYyNzUwMDUzfQ.WngDWSsQVwtRP3KfUcNDen6T4_Z3XPVuD_gDng-LGuw';
const SUPABASE_URL = "https://mgagfxyjkutvmgdobsoe.supabase.co";
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
exports.default = supabase;
