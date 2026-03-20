import ActiveChatLoader from "@/modules/chat/components/active-chat-loader";
import MessageForm from "@/modules/chat/components/message-form";
import MessageViewWithForm from "@/modules/chat/components/message-view-form";

const Page = async ({ params }) => {
  const { chatId } = await params;

  return (
    <div>
      <ActiveChatLoader chatId={chatId} />
      <MessageViewWithForm chatId={chatId} />
    </div>
  );
};

export default Page;
