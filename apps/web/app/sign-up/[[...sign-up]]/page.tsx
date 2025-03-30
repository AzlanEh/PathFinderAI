"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const BackgroundBeams = dynamic(
	() =>
		import("@/components/ui/background-beams").then(
			(mod) => mod.BackgroundBeams,
		),
	{ ssr: false },
);

export default function SignUp() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isClient, setIsClient] = useState(false);

	// Set isClient to true once the component is mounted
	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Basic validation
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters long");
			setIsLoading(false);
			return;
		}

		try {
			// Create the user registration API endpoint
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to register");
			}

			// Redirect to sign-in page after successful registration
			router.push("/sign-in");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Something went wrong. Please try again.");
			}
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 ">
			<BackgroundBeams />
			<div className="relative w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Create an account
					</h1>
					<p className="text-muted-foreground">
						Enter your details to get started
					</p>
				</div>

				{error && (
					<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label
							htmlFor="name"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							value={isClient ? name : ""}
							onChange={(e) => setName(e.target.value)}
							className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="John Doe"
							required
							autoComplete="name"
							data-form-type="name"
							suppressHydrationWarning
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={isClient ? email : ""}
							onChange={(e) => setEmail(e.target.value)}
							className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="name@example.com"
							required
							autoComplete="email"
							data-form-type="email"
							suppressHydrationWarning
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="password"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={isClient ? password : ""}
							onChange={(e) => setPassword(e.target.value)}
							className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							required
							autoComplete="new-password"
							data-form-type="password"
							suppressHydrationWarning
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="confirmPassword"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							value={isClient ? confirmPassword : ""}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							required
							autoComplete="new-password"
							data-form-type="password"
							suppressHydrationWarning
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating account..." : "Sign Up"}
					</Button>
				</form>

				<div className="text-center text-sm">
					Already have an account?{" "}
					<Link
						href="/sign-in"
						className="font-medium text-primary hover:underline"
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
