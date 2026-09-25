import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-800/80 bg-[#0c0f17] py-6 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Figma Horizontal Dumbbell Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <svg
                        className="w-5 h-5 text-[#a3e635]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm12 0a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zM3 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm18 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM7 11h10v2H7v-2z" />
                    </svg>
                    <span className="text-white font-black text-sm uppercase tracking-wider">
                        FITLOG
                    </span>
                </Link>

                {/* Copyright Text */}
                <p className="text-xs text-gray-500 font-medium text-center sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;