import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dscczaukwjawwbkzstet.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzY2N6YXVrd2phd3dia3pzdGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTE5MDgsImV4cCI6MjA2MDcyNzkwOH0.GdvFyJvLI6zm-rlC84kwYCjm8JXARZ622o5AAffszQc";

export const supabase = createClient(supabaseUrl, supabaseKey);
