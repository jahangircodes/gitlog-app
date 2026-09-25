"use client";

import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast"; // Toast Import

export default function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [workout, setWorkout] = useState<Workout | null>(null);
    const { addToPlan, toggleSave, todayPlan, savedWorkouts } = usePlan();

    useEffect(() => {
        getWorkoutById(id).then((data) => setWorkout(data));
    }, [id]);

    if (!workout) {
        return <div className="text-center py-20 text-gray-400">Loading workout details...</div>;
    }

    const isAdded = todayPlan.some((item) => item.id === workout.id);
    const isSaved = savedWorkouts.some((item) => item.id === workout.id);

    // 1. Add to Today's Plan Click Handler
    const handleAddToPlan = () => {
        if (isAdded) {
            toast("Already in your plan", {
                icon: "ℹ️",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #374151",
                },
            });
        } else {
            addToPlan(workout);
            toast.success("Added to today's plan", {
                icon: "✅",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #a3e635",
                },
            });
        }
    };

    // 2. Save For Later Click Handler
    const handleSaveForLater = () => {
        if (isSaved) {
            toast("Already saved", {
                icon: "ℹ️",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #374151",
                },
            });
        } else {
            toggleSave(workout);
            toast.success("Saved for later", {
                icon: "📌",
                style: {
                    background: "#181d2d",
                    color: "#fff",
                    border: "1px solid #a3e635",
                },
            });
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white mb-6 inline-block">
                ← BACK TO LIBRARY
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#111521] border border-gray-800 p-6 sm:p-8 rounded-3xl">
                <div className="relative w-full h-87.5 sm:h-112.5 bg-[#181d2d] rounded-2xl overflow-hidden">
                    <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex gap-2 mb-2">
                            {workout.muscleGroups.map((g, i) => (
                                <span key={i} className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#a3e635] text-black">
                                    {g}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl font-black uppercase text-white tracking-tight">{workout.name}</h1>
                        <p className="text-xs text-gray-400 mt-2">{workout.description}</p>
                    </div>

                    <div className="bg-[#181d2d]/60 border border-gray-800 rounded-xl p-4 space-y-2 text-xs">
                        <div className="flex justify-between border-b border-gray-800 pb-1.5"><span className="text-gray-400">EQUIPMENT</span><span className="font-bold">{workout.equipment}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-1.5"><span className="text-gray-400">DIFFICULTY</span><span className="font-bold">{workout.difficulty}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-1.5"><span className="text-gray-400">SETS / REPS</span><span className="font-bold">{workout.sets} / {workout.reps}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-1.5"><span className="text-gray-400">DURATION</span><span className="font-bold">{workout.duration} min</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-1.5"><span className="text-gray-400">CALORIES</span><span className="font-bold">{workout.caloriesBurned} kcal</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">RATING</span><span className="font-bold text-amber-400">★ {workout.rating}</span></div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase text-white mb-2">INSTRUCTIONS</h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-gray-300">
                            {workout.instructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            onClick={handleAddToPlan}
                            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${isAdded ? "bg-gray-700 text-gray-300" : "bg-[#a3e635] text-black hover:bg-[#8cd321]"
                                }`}
                        >
                            {isAdded ? "Added to Plan" : "Add to Today's Plan"}
                        </button>
                        <button
                            onClick={handleSaveForLater}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${isSaved ? "border-[#a3e635] text-[#a3e635]" : "border-gray-700 text-gray-300 hover:border-gray-500"
                                }`}
                        >
                            {isSaved ? "Saved" : "Save for later"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
