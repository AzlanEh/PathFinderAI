import React from "react";
import { CombinedNavbar } from "../components/combined-navbar";
import { BackgroundBeams } from "../components/ui/background-beams";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import { BackgroundLines } from "../components/ui/background-lines";
import { GoogleGeminiEffectDemo } from "../components/google-gemini-effect";
import { AnimatedBeamDemo } from "../components/animated-beam-bidirectional";
import { FeaturesSectionDemo } from "../components/featureSection";

export default function Home() {
	return (
		<div>
			<div className="bg-[#0a0f18] w-full h-screen relative overflow-hidden">
				{/* BackgroundBeams contained to the hero section */}
				<div className="absolute inset-0 z-10 overflow-hidden">
					<BackgroundBeams />
				</div>

				{/* Navbar Section */}
				<CombinedNavbar />

				{/* Middle section */}
				<div className="flex flex-col items-center justify-center h-[70vh] mt-8">
					<BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
						<h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-50 to-neutral-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
							Keep Learning, <br /> On Track.
						</h2>
						<p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-300 text-center mb-8">
							Elevate your management skills with our cutting-edge courses. Join
							Our Courses for Comprehensive Learning
						</p>

						<div className="relative z-40 mt-6">
							<a href="/courses" className="rounded-full px-6 py-3 bg-[#e3e3e3] text-[#0a0f18] font-medium hover:bg-opacity-90">
								Get Started
							</a>
						</div>
					</BackgroundLines>
				</div>
			</div>

			<div className="bg-[#0a0f18] py-16 px-6 md:px-12 lg:px-24">
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						{/* Left side: AnimatedBeamDemo */}
						<div className="w-full md:w-1/2 order-2 md:order-1">
							<AnimatedBeamDemo />
						</div>

						{/* Right side: Text content */}
						<div className="w-full md:w-1/2 order-1 md:order-2 text-left">
							<h3 className=" text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400">
								Enhance Your Learning Journey
							</h3>
							<p className="text-neutral-300 text-lg md:text-xl mb-6 leading-relaxed">
								Interact with our AI-powered chatbot to personalize your study
								experience and accelerate your progress.
							</p>
							<p className="text-neutral-400 text-base md:text-lg mb-8">
								Get instant answers, study recommendations, and learning
								resources tailored to your needs.
							</p>
							<div className="flex justify-start">
								<InteractiveHoverButton>
									Try AI Assistant
								</InteractiveHoverButton>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-[#0a0f18] -mt-10">
				<FeaturesSectionDemo />
			</div>
			<div className="mt-52">
				<GoogleGeminiEffectDemo />
			</div>
		</div>
	);
}
