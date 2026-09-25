import { Workout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link href={`/workout/${workout.id}`}>
            <div className="bg-[#111521] border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer">
                <div>
                    {/* image */}
                    <div className="relative w-full h-48 bg-[#181d2d] overflow-hidden">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* details */}
                    <div className="p-5 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                            {workout.muscleGroups.map((group, index) => (
                                <span
                                    key={index}
                                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#a3e635] text-black tracking-wider"
                                >
                                    {group}
                                </span>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#a3e635] transition-colors">
                                {workout.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">{workout.equipment}</p>
                        </div>
                    </div>
                </div>

                {/* footer info */}
                <div className="px-5 pb-5 pt-2 border-t border-gray-800/50 flex items-center justify-between text-xs font-semibold text-gray-400">
                    <div><span>⏱ {workout.duration} m</span></div>
                    <div><span>🔥 {workout.caloriesBurned} Kcal</span></div>
                    <div className="text-amber-400"><span>★ {workout.rating}</span></div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
