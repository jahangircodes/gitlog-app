"use client";

import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyPlanPage() {
    const { todayPlan, savedWorkouts, removeFromPlan, toggleSave, toggleComplete, completedIds } = usePlan();
    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
    const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

    const listToDisplay = activeTab === "today" ? todayPlan : savedWorkouts;

    // Sorting Logic
    const sortedList = [...listToDisplay].sort((a, b) => {
        if (sortBy === "duration") return b.duration - a.duration;
        if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    // Calculate Totals based on current active tab
    const totalExercises = listToDisplay.length;
    const totalMinutes = listToDisplay.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = listToDisplay.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

    // Handle Remove / Cross Button Click
    const handleRemove = (item: (typeof todayPlan)[number]) => {
        if (activeTab === "today") {
            removeFromPlan(item.id);
            toast("Removed from Today's Plan", {
                icon: "🗑️",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #ef4444",
                },
            });
        } else {
            toggleSave(item);
            toast("Removed from Saved", {
                icon: "🗑️",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #ef4444",
                },
            });
        }
    };

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <div>
                <h1 className="text-3xl font-black uppercase text-white tracking-tight">MY PLAN</h1>
                <p className="text-xs text-gray-400 mt-1">Cap of five lifts for today. Finish them, then load more.</p>
            </div>

            {/* Summary Board */}
            <div className="grid grid-cols-3 gap-4 bg-[#111521] border border-gray-800 p-6 rounded-2xl text-center sm:text-left">
                <div>
                    <span className="text-[10px] font-bold uppercase text-gray-500">Exercises</span>
                    <p className="text-3xl font-black text-[#a3e635] mt-1">{totalExercises}</p>
                </div>
                <div className="border-x border-gray-800/80 px-4">
                    <span className="text-[10px] font-bold uppercase text-gray-500">Minutes</span>
                    <p className="text-3xl font-black text-white mt-1">{totalMinutes}</p>
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase text-gray-500">Calories</span>
                    <p className="text-3xl font-black text-white mt-1">{totalCalories}</p>
                </div>
            </div>

            {/* Tabs and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex bg-[#111521] border border-gray-800 p-1 rounded-xl w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab("today")}
                        className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "today" ? "bg-[#181d2d] text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "saved" ? "bg-[#181d2d] text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                        className="bg-[#111521] border border-gray-800 text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {/* List / Empty View */}
            {sortedList.length === 0 ? (
                <div className="bg-[#111521] border border-dashed border-gray-800 rounded-2xl py-16 text-center space-y-3">
                    <h3 className="text-lg font-black uppercase text-white tracking-wider">NOTHING HERE YET</h3>
                    <p className="text-xs text-gray-400">Browse the library and add a lift to get today moving.</p>
                    <Link
                        href="/"
                        className="inline-block mt-2 bg-[#a3e635] text-black font-extrabold text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider hover:bg-[#8cd321] transition-all"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedList.map((item) => {
                        const isDone = completedIds.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className="bg-[#111521] border border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative w-20 h-16 bg-[#181d2d] rounded-lg overflow-hidden shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className={`font-black text-sm uppercase ${isDone ? "line-through text-gray-500" : "text-white"}`}>
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-gray-400">{item.equipment}</p>
                                        <div className="flex gap-3 text-[11px] text-gray-400 mt-1">
                                            <span>⏱ {item.duration} min</span>
                                            <span>🔥 {item.caloriesBurned} kcal</span>
                                            <span className="text-amber-400">★ {item.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <Link
                                        href={`/workout/${item.id}`}
                                        className="border border-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold"
                                    >
                                        View Details
                                    </Link>

                                    {activeTab === "today" && (
                                        <button
                                            onClick={() => toggleComplete(item.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${isDone ? "bg-gray-800 text-gray-400" : "bg-[#a3e635] text-black hover:bg-[#8cd321]"
                                                }`}
                                        >
                                            {isDone ? "Completed ✓" : "Mark as Done"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="text-gray-500 hover:text-red-400 text-sm font-bold px-2"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}


// "use client";

// import { usePlan } from "@/context/PlanContext";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function MyPlanPage() {
//     const { todayPlan, savedWorkouts, removeFromPlan, toggleSave, toggleComplete, completedIds } = usePlan();
//     const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

//     // Default sort is Duration
//     const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

//     const listToDisplay = activeTab === "today" ? todayPlan : savedWorkouts;

//     // Re-sorts the current list dynamically
//     const sortedList = [...listToDisplay].sort((a, b) => {
//         if (sortBy === "duration") return b.duration - a.duration;
//         if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
//         if (sortBy === "rating") return b.rating - a.rating;
//         return 0;
//     });

//     // Dynamic summary calculations
//     const totalExercises = listToDisplay.length;
//     const totalMinutes = listToDisplay.reduce((acc, curr) => acc + curr.duration, 0);
//     const totalCalories = listToDisplay.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

//     const handleRemove = (item: any) => {
//         if (activeTab === "today") {
//             removeFromPlan(item.id);
//             toast("Removed from Today's Plan", {
//                 icon: "🗑️",
//                 style: {
//                     background: "#181d2d",
//                     color: "#fff",
//                     border: "1px solid #ef4444",
//                 },
//             });
//         } else {
//             toggleSave(item);
//             toast("Removed from Saved", {
//                 icon: "🗑️",
//                 style: {
//                     background: "#181d2d",
//                     color: "#fff",
//                     border: "1px solid #ef4444",
//                 },
//             });
//         }
//     };

//     return (
//         <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
//             <div>
//                 <h1 className="text-3xl font-black uppercase text-white tracking-tight">MY PLAN</h1>
//                 <p className="text-xs text-gray-400 mt-1">Cap of five lifts for today. Finish them, then load more.</p>
//             </div>

//             {/* Summary Board */}
//             <div className="grid grid-cols-3 gap-4 bg-[#111521] border border-gray-800 p-6 rounded-2xl text-center sm:text-left">
//                 <div>
//                     <span className="text-[10px] font-bold uppercase text-gray-500">Exercises</span>
//                     <p className="text-3xl font-black text-[#a3e635] mt-1">{totalExercises}</p>
//                 </div>
//                 <div className="border-x border-gray-800/80 px-4">
//                     <span className="text-[10px] font-bold uppercase text-gray-500">Minutes</span>
//                     <p className="text-3xl font-black text-white mt-1">{totalMinutes}</p>
//                 </div>
//                 <div>
//                     <span className="text-[10px] font-bold uppercase text-gray-500">Calories</span>
//                     <p className="text-3xl font-black text-white mt-1">{totalCalories}</p>
//                 </div>
//             </div>

//             {/* Tabs and Custom Sort Dropdown */}
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <div className="flex bg-[#111521] border border-gray-800 p-1 rounded-xl w-full sm:w-auto">
//                     <button
//                         onClick={() => setActiveTab("today")}
//                         className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "today" ? "bg-[#181d2d] text-white" : "text-gray-400 hover:text-white"
//                             }`}
//                     >
//                         Today's Plan
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("saved")}
//                         className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "saved" ? "bg-[#181d2d] text-white" : "text-gray-400 hover:text-white"
//                             }`}
//                     >
//                         Saved
//                     </button>
//                 </div>

//                 {/* Sort By Dropdown with Custom Chevron Icon */}
//                 <div className="flex items-center gap-2 text-xs">
//                     <span className="text-gray-400 font-medium">Sort By</span>
//                     <div className="relative inline-block">
//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
//                             className="appearance-none bg-[#111521] border border-gray-800 text-white rounded-xl pl-4 pr-10 py-2 text-xs font-bold outline-none cursor-pointer hover:border-gray-700 transition-colors"
//                         >
//                             <option value="duration">Duration</option>
//                             <option value="calories">Calories</option>
//                             <option value="rating">Rating</option>
//                         </select>

//                         {/* Chevron Icon */}
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
//                             <svg
//                                 className="w-4 h-4 fill-current"
//                                 viewBox="0 0 20 20"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Exercises List / Empty State */}
//             {sortedList.length === 0 ? (
//                 <div className="bg-[#111521] border border-dashed border-gray-800 rounded-2xl py-16 text-center space-y-3">
//                     <h3 className="text-lg font-black uppercase text-white tracking-wider">NOTHING HERE YET</h3>
//                     <p className="text-xs text-gray-400">Browse the library and add a lift to get today moving.</p>
//                     <Link
//                         href="/"
//                         className="inline-block mt-2 bg-[#a3e635] text-black font-extrabold text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider hover:bg-[#8cd321] transition-all"
//                     >
//                         Go to workouts
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="space-y-4">
//                     {sortedList.map((item) => {
//                         const isDone = completedIds.includes(item.id);
//                         return (
//                             <div
//                                 key={item.id}
//                                 className="bg-[#111521] border border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
//                             >
//                                 <div className="flex items-center gap-4 w-full sm:w-auto">
//                                     <div className="relative w-20 h-16 bg-[#181d2d] rounded-lg overflow-hidden shrink-0">
//                                         <Image src={item.image} alt={item.name} fill className="object-cover" />
//                                     </div>
//                                     <div>
//                                         <h4 className={`font-black text-sm uppercase ${isDone ? "line-through text-gray-500" : "text-white"}`}>
//                                             {item.name}
//                                         </h4>
//                                         <p className="text-xs text-gray-400">{item.equipment}</p>
//                                         <div className="flex gap-3 text-[11px] text-gray-400 mt-1">
//                                             <span>⏱ {item.duration} min</span>
//                                             <span>🔥 {item.caloriesBurned} kcal</span>
//                                             <span className="text-amber-400">★ {item.rating}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
//                                     <Link
//                                         href={`/workout/${item.id}`}
//                                         className="border border-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold"
//                                     >
//                                         View Details
//                                     </Link>

//                                     {activeTab === "today" && (
//                                         <button
//                                             onClick={() => toggleComplete(item.id)}
//                                             className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${isDone ? "bg-gray-800 text-gray-400" : "bg-[#a3e635] text-black hover:bg-[#8cd321]"
//                                                 }`}
//                                         >
//                                             {isDone ? "Completed ✓" : "Mark as Done"}
//                                         </button>
//                                     )}

//                                     <button
//                                         onClick={() => handleRemove(item)}
//                                         className="text-gray-500 hover:text-red-400 text-sm font-bold px-2"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </main>
//     );
// }