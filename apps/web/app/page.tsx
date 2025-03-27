import React from "react";
import { NavbarDemo } from "../components/navbar.tsx";
import { BackgroundBeams } from "../components/ui/background-beams.tsx";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button.tsx";
import { BackgroundLines } from "../components/ui/background-lines.tsx";
import { GoogleGeminiEffectDemo } from "../components/google-gemini-effect.tsx";
import { AnimatedBeamDemo } from "../components/animated-beam-bidirectional.tsx";
import { FeaturesSectionDemo } from "../components/featureSection.tsx";

import Link from "next/link";

export default function Home() {
	return (
		<div>
			<div className="bg-[#0a0f18] w-full h-screen relative overflow-hidden">
				{/* BackgroundBeams contained to the hero section */}
				<div className="absolute inset-0 z-10 overflow-hidden">
					<BackgroundBeams />
				</div>

				{/* Navbar Section */}
				<div className="flex justify-between items-center relative z-50 px-4 py-4">
					<div className="w-32 rounded-3xl h-14 bg-[#e3e3e3] flex items-center justify-center font-Yatra">
						<div className="text-2xl text-[#35425a]">
							<p>Knowster</p>
						</div>
					</div>

					<div className="flex-1 flex justify-center z-50">
						<NavbarDemo />
					</div>

					<Link
						href="/"
						className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
					>
						<InteractiveHoverButton>Join Now</InteractiveHoverButton>
					</Link>
				</div>

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
							<InteractiveHoverButton>Get Started</InteractiveHoverButton>
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
