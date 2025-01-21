import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { getTransactions } from "@/lib/api";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  if (!user || !user.email) {
    await supabase.auth.signOut();
    return redirect("/sign-in");
  }

  const transactions = await getTransactions(user.email);
  console.log({ transactions });

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
    </div>
  );
}
