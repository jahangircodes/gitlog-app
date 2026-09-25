# 🏋️ FitLog — Train With Intent

**Live Link:** [https://gitlog-app-chi.vercel.app](https://gitlog-app-chi.vercel.app)
**GitHub Repository:** [https://github.com/jahangircodes/gitlog-app](https://github.com/jahangircodes/gitlog-app)

FitLog is a modern, high-performance web application designed to help fitness enthusiasts track daily workouts, manage personalized fitness plans, and store exercise routines with precision. Built with a sleek dark-themed UI inspired by Figma designs, FitLog provides a seamless, distraction-free experience for gym-goers.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API
- **Persistence:** LocalStorage API (Bidirectional Data Sync)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **Icons & Assets:** Custom SVG / Next Image Component

---

## ✨ 5 Key Features

1. **Interactive Plan & Saved Management**  
   Dynamically add exercises to Today's Plan or save them for later. Features real-time state synchronization across all pages and badges.

2. **5-Lift Daily Cap Validation**  
   Automatically enforces a maximum limit of 5 lifts for Today's Plan to prevent overtraining, disabling action buttons with clear UI feedback when full.

3. **Multi-Criteria Dynamic Sorting**  
   Easily sort workout lists by **Duration**, **Calories Burned**, or **Rating** using a custom styled dropdown with instantaneous UI updates.

4. **Real-time Metrics Dashboard**  
   Calculates total exercises, duration (minutes), and total calories dynamically based on the active tab (Today's Plan vs. Saved).

5. **Persistent Local Storage & Smart Notifications**  
   All plans and saved states persist across browser sessions. Features position-adjusted toast notifications for addition, completion, and removal actions.