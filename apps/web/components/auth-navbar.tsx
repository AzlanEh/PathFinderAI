"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu.tsx";
import { cn } from "../lib/utils";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export function AuthNavbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <div className="absolute right-0 flex items-center space-x-4">
        {isLoading ? (
          <div className="h-9 w-24 animate-pulse rounded-full bg-gray-200" />
        ) : isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              {session?.user?.name || session?.user?.email}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Home</HoveredLink>
            <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/about">About Us</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Courses">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Web Development"
              href="/courses/web-development"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Learn modern web development techniques." />
            <ProductItem
              title="Data Science"
              href="/courses/data-science"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Master data analysis and machine learning." />
            <ProductItem
              title="Mobile Development"
              href="/courses/mobile-development"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Build native mobile apps for iOS and Android." />
            <ProductItem
              title="UI/UX Design"
              href="/courses/ui-ux-design"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Create beautiful and functional user interfaces." />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/blog">Blog</HoveredLink>
            <HoveredLink href="/tutorials">Tutorials</HoveredLink>
            <HoveredLink href="/documentation">Documentation</HoveredLink>
            <HoveredLink href="/faq">FAQ</HoveredLink>
          </div>
        </MenuItem>
        {/* Only show Dashboard for authenticated users */}
        <MenuItem setActive={setActive} active={active} item="Dashboard">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard">My Dashboard</HoveredLink>
            <HoveredLink href="/dashboard/courses">My Courses</HoveredLink>
            <HoveredLink href="/dashboard/profile">Profile</HoveredLink>
            <HoveredLink href="/dashboard/settings">Settings</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
