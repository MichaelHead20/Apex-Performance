//========================================================
// Personal Records Functionality
//========================================================

// Map each PR card's element ID to the exercise name(s) it should match.
// Matching is case-insensitive and matches on "contains" so slight naming
// differences (e.g. "Barbell Bench Press") still count.
const personalRecordMap = [
    { elementId: "bench-press-record", keywords: ["bench press", "bench"] },
    { elementId: "squat-record", keywords: ["squat"] },
    { elementId: "deadlift-record", keywords: ["deadlift"] }
];

//========================================================
// Calculate and Display Personal Records
//========================================================

function updatePersonalRecords() {

    // Get completed workout history
    const workoutHistory =
        JSON.parse(localStorage.getItem("workoutHistory")) || [];

    // Flatten every logged exercise from every completed workout into one list
    const allExercises = [];

    for (const workout of workoutHistory) {
        for (const exercise of workout.exercises) {
            allExercises.push(exercise);
        }
    }

    // For each tracked lift, find the heaviest logged weight that matches
    for (const record of personalRecordMap) {

        const recordElement = document.getElementById(record.elementId);

        if (!recordElement) continue; // Not on this page, skip

        const matchingExercises = allExercises.filter(exercise => {
            const exerciseName = exercise.name.toLowerCase();
            return record.keywords.some(keyword => exerciseName.includes(keyword));
        });

        if (matchingExercises.length === 0) {
            recordElement.textContent = "0 kg";
            continue;
        }

        const heaviestWeight = Math.max(
            ...matchingExercises.map(exercise => exercise.weight || 0)
        );

        recordElement.textContent = heaviestWeight + " kg";
    }
}

//========================================================
// Load Personal Records When Page Opens
//========================================================

updatePersonalRecords();
