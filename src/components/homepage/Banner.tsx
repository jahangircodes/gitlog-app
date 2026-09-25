import banner from "@/assets/banner.png";
import Image from "next/image";

const Banner = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
            <div className="relative overflow-hidden bg-[#111521] border border-gray-800/80 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
                {/* Glow effect in background */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a3e635]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Content Column */}
                <div className="lg:col-span-7 z-10 space-y-6 text-center lg:text-left">
                    <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#a3e635] uppercase bg-[#a3e635]/10 px-3 py-1 rounded-md border border-[#a3e635]/20">
                        WORKOUT LIBRARY
                    </span>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
                        TRAIN WITH INTENT. <br className="hidden sm:inline" />
                        <span className="text-gray-200">LOG EVERY SET.</span>
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    <div className="pt-2">
                        <button className="w-full sm:w-auto px-8 py-4 bg-[#a3e635] hover:bg-[#8ce011] text-black font-extrabold tracking-wider text-xs uppercase rounded-xl transition-all shadow-lg shadow-[#a3e635]/20 active:scale-95">
                            BROWSE WORKOUTS
                        </button>
                    </div>
                </div>

                {/* Image Column */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
                    <div className="relative w-full max-w-md lg:max-w-none aspect-square max-h-95 sm:max-h-112.5">
                        <Image
                            src={banner}
                            alt="Fitness Equipment Banner"
                            fill
                            priority
                            className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;