"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

export function AuthButton() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200"></div>
    );
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/dashboard"
        className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
      >
        <InteractiveHoverButton>Dashboard</InteractiveHoverButton>
      </Link>
    );
  }

  return (
    <Link
      href="/sign-up"
      className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
    >
      <InteractiveHoverButton>Join Now</InteractiveHoverButton>
    </Link>
  );
}
