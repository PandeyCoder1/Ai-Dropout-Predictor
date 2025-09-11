"use client";

import { useState, KeyboardEvent, useEffect, useRef } from "react";
import {  X, Send, Bot, User, Loader2, BotMessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your AI assistant for dropout prediction queries. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (open) {
      // Use a small delay to ensure the DOM is rendered
      setTimeout(() => {
        const inputElement = document.querySelector('[data-slot="input"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user123",
          message: currentInput,
        }),
      });

      const data = await res.json();

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I'm having trouble connecting to the server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
      // Focus the input field after everything is done
      const inputElement = document.querySelector('[data-slot="input"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      // Ensure focus is maintained after Enter
      setTimeout(() => {
        const inputElement = document.querySelector('[data-slot="input"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }, 50);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Floating button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer animate-in fade-in slide-in-from-bottom-2 ease-out"
        >
          <BotMessageSquare className="h-12 w-12 sm:h-16 sm:w-16 transition-transform duration-200 group-hover:scale-110" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}

      {/* Chat window */}
      {open && (
        <Card className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[70vh] sm:h-[500px] max-h-[600px] flex flex-col shadow-2xl border-neutral-300 overflow-hidden animate-in slide-in-from-bottom-4 slide-in-from-right-4 fade-in zoom-in-95 duration-300 ease-out">
          {/* Header */}
          <div className="flex justify-between items-center p-3 sm:p-4 bg-primary text-primary-foreground border-b border-border/20">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h2 className="font-semibold text-sm">AI Assistant</h2>
            </div>
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary-foreground/20 text-primary-foreground transition-colors duration-150 cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 sm:space-y-4 bg-muted/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2 items-start",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "bot" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] sm:max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card text-card-foreground border border-border/50 rounded-tl-sm shadow-sm"
                  )}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-2 justify-start items-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="bg-card text-card-foreground border border-border/50 px-3 py-2 rounded-lg rounded-tl-sm text-sm flex items-center gap-2 shadow-sm">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 sm:p-4 border-t border-border/50 bg-background">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 text-sm"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                size="sm"
                className="px-3 min-w-[40px]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
