import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutLibraryProps {
    workouts: Workout[];
}

const WorkoutLibrary = ({ workouts }: WorkoutLibraryProps) => {
    if (!workouts || workouts.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                Loading.......
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    THE LIBRARY
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
};

export default WorkoutLibrary;