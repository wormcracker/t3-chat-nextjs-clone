import { auth } from "@/lib/auth";
import { currentUser } from "@/modules/authentication/actions";
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar";
import Header from "@/modules/chat/components/header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const user = await currentUser();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ChatSidebar */}
      <ChatSidebar user={user} />
      <main className="flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
