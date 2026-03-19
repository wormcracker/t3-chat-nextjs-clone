"use client";

import React, { useEffect } from "react";
import { useChatStore } from "@/modules/chat/store/chat-store";
import { useGetChatById } from "../hooks/chat";

export default function ActiveChatLoader({ chatId }) {
  const { setActiveChatId, setMessages, addChat, chats } = useChatStore();

  const { data, isLoading, isError } = useGetChatById(chatId);

  useEffect(() => {
    if (!chatId) return;
    setActiveChatId(chatId);
  }, [chatId, setActiveChatId]);

  useEffect(() => {
    if (!data || !data.success || !data.data) return;

    const chat = data.data;

    // populate messages
    setMessages(chat.messages || []);

    if (!chats?.some((c) => c.id === chat.id)) {
      addChat(chat);
    }
  }, [data, setMessages, addChat, chats]);

  return null;
}
