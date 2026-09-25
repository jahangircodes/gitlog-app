import { Workout } from "@/types/workout";


export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch workouts");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}


export async function getWorkoutById(id: string): Promise<Workout | null> {
  const workouts = await getAllWorkouts();
  const found = workouts.find((item) => item.id.toString() === id);
  return found || null;
}