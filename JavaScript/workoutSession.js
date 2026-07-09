//========================================================
// JavaScript for Active Workout Session
//========================================================


// Get HTML references

const workoutTitle = document.getElementById("workout-title");

const sessionExercises = document.getElementById("session-exercises");

const finishWorkoutButton = document.getElementById("finish-workout");



//========================================================
// Load Active Workout
//========================================================


// Get active workout from local storage

const activeWorkout =
    JSON.parse(localStorage.getItem("activeWorkout"));



// If no workout has been selected, return home

if (!activeWorkout) {

    window.location.href = "homepage.html";

}



//========================================================
// Display Workout Information
//========================================================


// Display workout name

workoutTitle.textContent = activeWorkout.name;




//========================================================
// Create Exercise Trackers
//========================================================


for (const exercise of activeWorkout.exercises) {


    // Create exercise card

    const exerciseCard = document.createElement("div");

    exerciseCard.className = "exercise-card";



    // Exercise title

    const exerciseTitle = document.createElement("h3");

    exerciseTitle.textContent = exercise;



    // Weight input

    const weightInput = document.createElement("input");

    weightInput.type = "number";

    weightInput.placeholder = "Weight (kg)";



    // Sets input

    const setsInput = document.createElement("input");

    setsInput.type = "number";

    setsInput.placeholder = "Sets";



    // Reps input

    const repsInput = document.createElement("input");

    repsInput.type = "number";

    repsInput.placeholder = "Reps";



    // Add elements to card

    exerciseCard.appendChild(exerciseTitle);

    exerciseCard.appendChild(weightInput);

    exerciseCard.appendChild(setsInput);

    exerciseCard.appendChild(repsInput);



    // Add card to page

    sessionExercises.appendChild(exerciseCard);


}





//========================================================
// Finish Workout Functionality
//========================================================


finishWorkoutButton.addEventListener("click", () => {


    // Store completed exercises

    const completedExercises = [];



    // Get every exercise card

    const exerciseCards =
        document.querySelectorAll(".exercise-card");



    exerciseCards.forEach(card => {


        const inputs =
            card.querySelectorAll("input");



        const exerciseData = {


            name:
            card.querySelector("h3").textContent,


            weight:
            Number(inputs[0].value),


            sets:
            Number(inputs[1].value),


            reps:
            Number(inputs[2].value)


        };



        completedExercises.push(exerciseData);


    });



    // Create completed workout object

    const completedWorkout = {


        id:
        crypto.randomUUID(),


        name:
        activeWorkout.name,


        date:
        new Date().toISOString().split("T")[0],


        exercises:
        completedExercises


    };



    // Get previous workout history

    const workoutHistory =
        JSON.parse(localStorage.getItem("workoutHistory")) || [];



    // Add completed workout

    workoutHistory.push(completedWorkout);



    // Save workout history

    localStorage.setItem(
        "workoutHistory",
        JSON.stringify(workoutHistory)
    );



    // Remove active workout

    localStorage.removeItem("activeWorkout");



    // Return to history page

    window.location.href = "workoutHistory.html";


});