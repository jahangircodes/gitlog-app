"use client";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { todayPlan, savedWorkouts } = usePlan();
    const pathname = usePathname();

    return (
        <header className="border-b border-gray-800/80 bg-[#0c0f17] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Figma Left Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <Image
                        src={logo}
                        alt="FITLOG Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                        priority
                    />
                    <span className="text-white font-black text-xl uppercase tracking-wider">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation Pill Buttons (Updated Style) */}
                <nav className="flex items-center gap-2 text-xs font-bold">
                    <Link
                        href="/"
                        className={`px-5 py-2 rounded-full transition-all duration-200 ${pathname === "/"
                            ? "bg-[#1d2712] text-[#a3e635] shadow-sm"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`px-5 py-2 rounded-full transition-all duration-200 ${pathname === "/my-plan"
                            ? "bg-[#1d2712] text-[#a3e635] shadow-sm"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Right Plan & Saved Badges */}
                <div className="flex items-center gap-3 text-xs font-bold">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <span>Plan</span>
                        <span className="bg-[#a3e635] text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
                            {todayPlan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <span>Saved</span>
                        <span className="bg-[#181d2d] text-gray-300 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-gray-700">
                            {savedWorkouts.length}
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
}