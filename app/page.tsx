import { getTransactions } from "@/app/loaders";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
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
