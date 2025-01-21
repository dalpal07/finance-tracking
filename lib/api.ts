import { createClient } from "@/utils/supabase/server";

export async function getTransactions(email: string) {
    const supabase = await createClient();
    return (await supabase.from("category").select("*")).data;
}