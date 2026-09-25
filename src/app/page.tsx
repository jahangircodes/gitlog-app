import Banner from "@/components/homepage/Banner";
import WorkoutLibrary from "@/components/homepage/WorkoutLibrary";
import { getAllWorkouts } from "@/lib/api";

export default async function Home() {
  // API থেকে সরাসরি ডাটা লোড
  const workouts = await getAllWorkouts();

  return (
    <main className="min-h-screen bg-[#0c0f17] text-white">
      {/* Navbar এখান থেকে মুছে ফেলা হয়েছে যেন ডাবল না আসে */}
      <Banner />
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}