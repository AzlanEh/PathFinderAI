"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
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

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid email or password");
				setIsLoading(false);
				return;
			}

			router.push("/");
		} catch (error) {
			setError("Something went wrong. Please try again.");
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await signIn("google", { callbackUrl: "/" });
		} catch (error) {
			setError("Failed to sign in with Google");
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
			<BackgroundBeams />
			<div className="relative w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
					<p className="text-muted-foreground">Sign in to your account</p>
				</div>

				{error && (
					<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
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
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Password
							</label>
							<Link
								href="/forgot-password"
								className="text-xs text-primary hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<input
							id="password"
							type="password"
							value={isClient ? password : ""}
							onChange={(e) => setPassword(e.target.value)}
							className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							required
							autoComplete="current-password"
							data-form-type="password"
							suppressHydrationWarning
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign In"}
					</Button>
				</form>

				<div className="relative flex items-center justify-center">
					<span className="absolute inset-x-0 h-px bg-muted" />
					<span className="relative bg-card px-2 text-xs text-muted-foreground">
						Or continue with
					</span>
				</div>

				<Button
					variant="outline"
					type="button"
					className="w-full"
					onClick={handleGoogleSignIn}
					disabled={isLoading}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-2 h-4 w-4"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M17.13 17.13v-4.26h-4.26M6.87 6.87v4.26h4.26" />
					</svg>
					Google
				</Button>

				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link
						href="/sign-up"
						className="font-medium text-primary hover:underline"
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
