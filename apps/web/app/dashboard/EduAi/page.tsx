"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, Paperclip, Image, Sparkles } from "lucide-react";
import SideNavbar from "../../component/sideNav";

const COMMON_PROMPTS = [
	"Write a to-do list for a personal project or task",
	"Generate an email to reply to a job offer",
	"Summarise this article or text for me in one paragraph",
	"How does AI work in a technical capacity",
];

interface ChatMessage {
	id: number;
	type: "user" | "ai";
	content: string;
	timestamp: Date;
}

export default function EduAi() {
	const [inputValue, setInputValue] = useState("");
	const [prompts, setPrompts] = useState(COMMON_PROMPTS);
	const [useImage, setUseImage] = useState(false);
	const [addAttachment, setAddAttachment] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasInteraction, setHasInteraction] = useState(false);

	useEffect(() => {
		setHasInteraction(chatHistory.length > 0);
	}, [chatHistory]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSendMessage = async () => {
		if (inputValue.trim()) {
			const userMessage: ChatMessage = {
				id: Date.now(),
				type: "user",
				content: inputValue,
				timestamp: new Date(),
			};

			setChatHistory((prev) => [...prev, userMessage]);
			setInputValue("");
			setIsLoading(true);

			try {
				const response = await fetch(
					"http://localhost:10000/api/gemini/generate",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ prompt: inputValue }),
					},
				);

				if (!response.ok) throw new Error("API request failed");
				const data = await response.json();

				const aiMessage: ChatMessage = {
					id: Date.now() + 1,
					type: "ai",
					content: data.response || "No response from API",
					timestamp: new Date(),
				};

				setChatHistory((prev) => [...prev, aiMessage]);
			} catch (error) {
				console.error("Error sending message:", error);
				const errorMessage: ChatMessage = {
					id: Date.now() + 2,
					type: "ai",
					content: "Sorry, there was an error processing your request.",
					timestamp: new Date(),
				};
				setChatHistory((prev) => [...prev, errorMessage]);
			} finally {
				setIsLoading(false);
			}
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

	// Format message content with proper paragraphs
	const formatMessageContent = (content: string, type: "user" | "ai") => {
		if (type === "user") {
			return content;
		}

		return content.split("\n").map((line, index) => (
			<p key={index} className="mb-2 last:mb-0">
				{line}
			</p>
		));
	};

	return (
		<div className="flex h-screen">
			<SideNavbar />
			<div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
				<div className="max-w-4xl mx-auto w-full h-full flex flex-col p-4">
					{/* Original Header - Hidden after interaction */}
					<header
						className={`mb-8 animate-fade-in ${hasInteraction ? "hidden" : ""}`}
					>
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
						<p className="text-sm text-gray-500 flex items-center gap-2">
							<Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
							Use one of the prompts below or your own to begin
						</p>
					</header>

					{/* EduAI Header - Shown after first interaction */}
					{hasInteraction && (
						<div className="mb-8">
							<h1 className="text-3xl font-bold text-gray-800 mb-2">
								EduAI Assistant
							</h1>
							<p className="text-gray-500">How can I assist you today?</p>
						</div>
					)}

					{/* Chat History */}
					<section
						className={`flex-1 overflow-auto mb-4 space-y-4 ${
							hasInteraction ? "mt-4" : ""
						}`}
					>
						{chatHistory.map((message) => (
							<div
								key={message.id}
								className={`
                  p-4 rounded-lg max-w-3xl 
                  transition-all duration-300 ease-in-out
                  ${
										message.type === "user"
											? "bg-purple-100 ml-auto animate-slide-in-right"
											: "bg-white mr-auto animate-slide-in-left"
									}
                  ${hasInteraction ? "max-w-2xl" : "max-w-3xl"}
                `}
							>
								<div className="text-sm md:text-base">
									{formatMessageContent(message.content, message.type)}
								</div>
								<span className="text-xs text-gray-500 block text-right mt-2">
									{message.timestamp.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</div>
						))}
						{isLoading && (
							<div className="p-3 bg-white rounded-lg animate-pulse">
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
										<Sparkles className="w-4 h-4 text-purple-600" />
									</div>
									<p className="text-sm text-gray-500">
										EduAI is generating your response...
									</p>
								</div>
							</div>
						)}
					</section>

					{/* Conditional Prompts Section */}
					{!hasInteraction && (
						<section className="mb-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
								{prompts.map((prompt) => (
									<button
										key={prompt}
										onClick={() => handlePromptSelect(prompt)}
										className="
                      p-3 
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
                      hover:scale-[1.02]
                      active:scale-95
                      text-sm md:text-base
                    "
									>
										<div className="mt-1">{getIconForPrompt(prompt)}</div>
										<span className="text-gray-800">{prompt}</span>
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
					)}

					{/* Input Area */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
						<div className="relative">
							<input
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								placeholder="Ask whatever you want..."
								maxLength={1000}
								className="
                  w-full
                  p-3 
                  pr-24 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:border-purple-500 
                  focus:ring-1 
                  focus:ring-purple-200 
                  outline-none 
                  text-sm md:text-base
                  transition-all 
                  duration-200
                  placeholder-gray-400
                "
								onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
							/>
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
								<span
									className={`text-xs ${
										inputValue.length > 900 ? "text-red-500" : "text-gray-400"
									}`}
								>
									{inputValue.length}/1000
								</span>
								<button
									onClick={handleSendMessage}
									disabled={isLoading}
									className="
                    p-2
                    bg-purple-600
                    hover:bg-purple-700
                    rounded-lg 
                    transition-colors 
                    duration-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    active:scale-95
                    flex items-center justify-center
                  "
									aria-label="Send message"
								>
									<Send className="h-4 w-4 text-white" />
								</button>
							</div>
						</div>

						{!hasInteraction && (
							<div className="flex items-center gap-4 mt-3">
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
