"use client"

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

type Message = {
    id: number;
    sender: "user" | "bot";
    text: string;
};

const ChatFAB: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "bot", text: "Hi! How can I help you today?" },
    ]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, sender: "user", text: input },
        ]);
        setInput("");
    };

    return (
        <>
            {/* Backdrop blur overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Chat popup */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-1 text-white">
                        <span className="font-semibold text-sm">AI Chat Assistant</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/10 rounded-full p-1 transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                                        msg.sender === "user"
                                            ? "bg-blue-1 text-white rounded-br-sm"
                                            : "bg-white text-gray-800 border border-slate-200 rounded-bl-sm"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 p-3 border-t border-slate-200 bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 text-sm rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/40"
                        />
                        <button
                            onClick={handleSend}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-1 text-white hover:bg-green-800 transition-colors shrink-0"
                            aria-label="Send message"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating action button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-800 hover:scale-105 active:scale-95 transition-all"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </>
    );
};

export default ChatFAB;