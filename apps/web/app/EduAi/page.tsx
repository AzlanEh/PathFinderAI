"use client";

import type React from "react";
import { useState } from "react";
import { RefreshCw, Send, Paperclip, Image } from "lucide-react";
import SideNavbar from "../../components/sideNav";

const COMMON_PROMPTS = [
  "Write a to-do list for a personal project or task",
  "Generate an email to reply to a job offer",
  "Summarise this article or text for me in one paragraph",
  "How does AI work in a technical capacity",
];

const PROMPT_ICONS = {
  "Write a to-do list for a personal project or task": "list-checks",
  "Generate an email to reply to a job offer": "mail",
  "Summarise this article or text for me in one paragraph": "file-text",
  "How does AI work in a technical capacity": "cpu",
};

export default function EduAi() {
  const [inputValue, setInputValue] = useState("");
  const [prompts, setPrompts] = useState(COMMON_PROMPTS);
  const [useImage, setUseImage] = useState(false);
  const [addAttachment, setAddAttachment] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  const handleRefreshPrompts = () => {
    setPrompts([...COMMON_PROMPTS].sort(() => Math.random() - 0.5));
  };

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
  };

  const getIconForPrompt = (prompt: string) => {
    switch (prompt) {
      case "Write a to-do list for a personal project or task":
        return <div className="w-5 h-5 text-gray-500">👤</div>;
      case "Generate an email to reply to a job offer":
        return <div className="w-5 h-5 text-gray-500">✉️</div>;
      case "Summarise this article or text for me in one paragraph":
        return <div className="w-5 h-5 text-gray-500">📄</div>;
      case "How does AI work in a technical capacity":
        return <div className="w-5 h-5 text-gray-500">⚙️</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1 p-4 overflow-auto bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-5xl font-bold mb-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e293b] to-[#3b82f6]">
                Hi there, User
              </span>
            </h1>
            <h2 className="text-4xl font-semibold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e293b] to-[#3b82f6]">
                What would you like to know?
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              Use one of the most common prompts below or use your own to begin
            </p>
          </header>

          {/* Common Prompts */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptSelect(prompt)}
                  className="
                    p-4 
                    bg-white 
                    rounded-lg 
                    border 
                    border-gray-200 
                    hover:border-purple-500 
                    hover:shadow-md 
                    transition-all 
                    duration-200 
                    text-left 
                    flex
                    items-start
                    gap-3
                  "
                >
                  <div className="mt-1">{getIconForPrompt(prompt)}</div>
                  <span className="text-gray-800 text-sm">{prompt}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleRefreshPrompts}
              className="
                text-gray-600 
                hover:text-purple-600 
                flex 
                items-center 
                text-sm 
                transition-colors 
                duration-200
              "
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Prompts
            </button>
          </section>

          {/* Input Area */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="relative mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask whatever you want..."
                className="
                  w-full
                  p-3 
                  pr-16 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:border-purple-500 
                  focus:ring-1 
                  focus:ring-purple-200 
                  outline-none 
                  text-sm
                  transition-all 
                  duration-200
                "
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                <span className="text-xs text-gray-400 mr-2">0/1000</span>
                <button
                  onClick={handleSendMessage}
                  className="
                    p-1.5
                    bg-purple-600
                    hover:bg-purple-700
                    rounded-md 
                    transition-colors 
                    duration-200
                  "
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setAddAttachment(!addAttachment)}
                className={`
                  flex items-center gap-2 text-sm 
                  ${addAttachment ? "text-purple-600" : "text-gray-500"}
                  hover:text-purple-600 transition-colors duration-200
                `}
              >
                <Paperclip className="h-4 w-4" />
                Add Attachment
              </button>

              <button
                onClick={() => setUseImage(!useImage)}
                className={`
                  flex items-center gap-2 text-sm 
                  ${useImage ? "text-purple-600" : "text-gray-500"}
                  hover:text-purple-600 transition-colors duration-200
                `}
              >
                <Image className="h-4 w-4" />
                Use Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
