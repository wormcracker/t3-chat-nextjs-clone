import ActiveChatLoader from "@/modules/chat/components/active-chat-loader";
import MessageForm from "@/modules/chat/components/message-form";

const Page = async ({ params }) => {
  const { chatId } = await params;

  return (
    <div>
      <ActiveChatLoader chatId={chatId} />
      <MessageForm chatId={chatId} />
    </div>
  );
};

export default Page;
