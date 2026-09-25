"use client";

import { Workout } from "@/types/workout";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PlanContextType {
    todayPlan: Workout[];
    savedWorkouts: Workout[];
    completedIds: number[];
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    toggleSave: (workout: Workout) => void;
    toggleComplete: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        const storedPlan = localStorage.getItem("fitlog_plan");
        return storedPlan ? JSON.parse(storedPlan) : [];
    });
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        const storedWorkouts = localStorage.getItem("fitlog_saved");
        return storedWorkouts ? JSON.parse(storedWorkouts) : [];
    });
    const [completedIds, setCompletedIds] = useState<number[]>(() => {
        if (typeof window === "undefined") return [];
        const storedIds = localStorage.getItem("fitlog_done");
        return storedIds ? JSON.parse(storedIds) : [];
    });


    useEffect(() => {
        localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
        localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
        localStorage.setItem("fitlog_done", JSON.stringify(completedIds));
    }, [todayPlan, savedWorkouts, completedIds]);

    const addToPlan = (workout: Workout) => {
        if (!todayPlan.some((item) => item.id === workout.id)) {
            setTodayPlan((prev) => [...prev, workout]);
        }
    };

    const removeFromPlan = (id: number) => {
        setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleSave = (workout: Workout) => {
        if (savedWorkouts.some((item) => item.id === workout.id)) {
            setSavedWorkouts((prev) => prev.filter((item) => item.id !== workout.id));
        } else {
            setSavedWorkouts((prev) => [...prev, workout]);
        }
    };

    const toggleComplete = (id: number) => {
        if (completedIds.includes(id)) {
            setCompletedIds((prev) => prev.filter((item) => item !== id));
        } else {
            setCompletedIds((prev) => [...prev, id]);
        }
    };

    return (
        <PlanContext.Provider
            value={{
                todayPlan,
                savedWorkouts,
                completedIds,
                addToPlan,
                removeFromPlan,
                toggleSave,
                toggleComplete,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) throw new Error("usePlan must be used within a PlanProvider");
    return context;
};