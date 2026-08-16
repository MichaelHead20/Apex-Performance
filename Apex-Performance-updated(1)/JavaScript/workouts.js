//========================================================
// JavaScript for Workout History Page
//========================================================


// Get references to the input fields and buttons
const workoutNameInput = document.getElementById("workout-name");
const exerciseNameInput = document.getElementById("exercise-name");
const addExerciseButton = document.getElementById("add-exercise");
const saveWorkoutButton = document.getElementById("save-workout");
const exerciseList = document.getElementById("exercise-list");
const savedWorkouts = document.getElementById("saved-workouts");


// Array to hold the current exercises being added to the workout
let currentExercises = [];


//========================================================
// Add Exercise Functionality
//========================================================

addExerciseButton.addEventListener("click", () => {

    const exercise = exerciseNameInput.value.trim();

    if (exercise === "") {
        return;
    }


    currentExercises.push(exercise);


    const exerciseItem = document.createElement("p");

    exerciseItem.textContent = exercise;

    exerciseList.appendChild(exerciseItem);


    exerciseNameInput.value = "";

});



//========================================================
// Save Workout Template Functionality
//========================================================

saveWorkoutButton.addEventListener("click", () => {


    if (
        workoutNameInput.value.trim() === "" ||
        currentExercises.length === 0
    ) {
        return;
    }


    const workoutTemplate = {

        id: crypto.randomUUID(),

        name: workoutNameInput.value.trim(),

        exercises: [...currentExercises]

    };


    const savedWorkoutTemplates =
        JSON.parse(localStorage.getItem("workoutTemplates")) || [];



    savedWorkoutTemplates.push(workoutTemplate);



    localStorage.setItem(
        "workoutTemplates",
        JSON.stringify(savedWorkoutTemplates)
    );


    displayWorkoutTemplates();


    currentExercises = [];

    exerciseList.innerHTML = "";

    workoutNameInput.value = "";

    exerciseNameInput.value = "";

});




//========================================================
// Display Saved Workout Templates
//========================================================

function displayWorkoutTemplates() {


    const savedWorkoutTemplates =
        JSON.parse(localStorage.getItem("workoutTemplates")) || [];


    savedWorkouts.innerHTML = "";



    for (const workout of savedWorkoutTemplates) {


        // Create workout card
        const workoutCard = document.createElement("div");

        workoutCard.className = "workout-card";



        // Workout title
        const workoutTitle = document.createElement("h3");

        workoutTitle.textContent = workout.name;


        workoutCard.appendChild(workoutTitle);



        // Exercise list
        const exerciseContainer = document.createElement("ul");



        for (const exercise of workout.exercises) {


            const exerciseItem = document.createElement("li");


            exerciseItem.textContent = exercise;


            exerciseContainer.appendChild(exerciseItem);

        }


        workoutCard.appendChild(exerciseContainer);



        // Delete button
        const deleteWorkoutButton = document.createElement("button");

        deleteWorkoutButton.textContent = "🗑 Delete Workout";



        deleteWorkoutButton.addEventListener("click", () => {


            let savedWorkoutTemplates =
                JSON.parse(localStorage.getItem("workoutTemplates")) || [];



            savedWorkoutTemplates = savedWorkoutTemplates.filter(currentWorkout => {

                return currentWorkout.id !== workout.id;

            });



            localStorage.setItem(
                "workoutTemplates",
                JSON.stringify(savedWorkoutTemplates)
            );



            displayWorkoutTemplates();

        });



        workoutCard.appendChild(deleteWorkoutButton);



        // Add card to page
        savedWorkouts.appendChild(workoutCard);


    }


}



//========================================================
// Load Workout Templates When Page Opens
//========================================================

displayWorkoutTemplates();