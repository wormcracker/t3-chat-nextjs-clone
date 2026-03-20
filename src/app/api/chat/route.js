import { streamText } from "ai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompt";
import db from "@/lib/db";
import { MessageRole } from "@/generated/prisma/enums";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// -----------------------------
// Normalize DB message → UI message
// -----------------------------
function convertStoredMessageToUI(msg) {
  try {
    const parts = JSON.parse(msg.content);

    const textParts = Array.isArray(parts)
      ? parts.filter((p) => p?.type === "text")
      : [];

    if (textParts.length === 0) return null;

    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase(),
      parts: textParts,
      createdAt: msg.createdAt,
    };
  } catch {
    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase(),
      parts: [{ type: "text", text: msg.content }],
      createdAt: msg.createdAt,
    };
  }
}

// -----------------------------
// Extract text content safely
// -----------------------------
function extractTextContent(message) {
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p) => p?.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join("\n");
  }

  if (typeof message.content === "string") {
    return message.content;
  }

  return "";
}

// -----------------------------
// Normalize to model format
// -----------------------------
function toModelMessages(messages) {
  return messages
    .map((msg) => {
      const content = extractTextContent(msg).trim();

      if (!content) return null;

      return {
        role: msg.role,
        content,
      };
    })
    .filter(Boolean);
}

// -----------------------------
// Extract parts for storage
// -----------------------------
function extractPartsAsJSON(message) {
  if (message.parts && Array.isArray(message.parts)) {
    return JSON.stringify(message.parts);
  }

  const content = message.content || "";
  return JSON.stringify([{ type: "text", text: content }]);
}

// -----------------------------
// Route handler
// -----------------------------
export async function POST(req) {
  try {
    const {
      chatId,
      messages: newMessages,
      model,
      skipUserMessage,
    } = await req.json();

    // Fetch previous messages
    const previousMessages = chatId
      ? await db.message.findMany({
          where: { chatId },
          orderBy: { createdAt: "asc" },
        })
      : [];

    // Convert DB → UI format
    const uiMessagesFromDB = previousMessages
      .map(convertStoredMessageToUI)
      .filter(Boolean);

    // Normalize incoming messages
    const normalizedNewMessages = Array.isArray(newMessages)
      ? newMessages
      : newMessages
        ? [newMessages]
        : [];

    // Combine all messages
    const allMessages = [...uiMessagesFromDB, ...normalizedNewMessages];

    console.log("📊 Total messages:", allMessages.length);

    // Convert to strict model format
    const modelMessages = toModelMessages(allMessages);

    console.log(
      "🤖 Final model messages:",
      JSON.stringify(modelMessages, null, 2),
    );

    // Stream response
    const result = streamText({
      model: provider.chat(model),
      messages: modelMessages,
      system: CHAT_SYSTEM_PROMPT,
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      originalMessages: allMessages,

      onFinish: async ({ responseMessage }) => {
        try {
          const messagesToSave = [];

          // Save user message
          if (!skipUserMessage) {
            const lastUserMessage =
              normalizedNewMessages[normalizedNewMessages.length - 1];

            if (lastUserMessage?.role === "user") {
              messagesToSave.push({
                chatId,
                content: extractPartsAsJSON(lastUserMessage),
                messageRole: MessageRole.USER,
                model,
                messageType: "NORMAL",
              });
            }
          }

          // Save assistant message
          if (responseMessage) {
            messagesToSave.push({
              chatId,
              content: extractPartsAsJSON(responseMessage),
              messageRole: MessageRole.ASSISTANT,
              model,
              messageType: "NORMAL",
            });
          }

          if (messagesToSave.length > 0) {
            await db.message.createMany({
              data: messagesToSave,
            });
          }
        } catch (err) {
          console.error("❌ Error saving messages:", err);
        }
      },
    });
  } catch (error) {
    console.error("❌ API Route Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
