//Workout Form

//Main workout form
const workoutForm = document.getElementById("workout-form");

//container for logged workouts
const loggedWorkouts = document.getElementById("logged-workouts");

//user input fields for exercise, weight, sets, and reps
const exerciseInput = document.getElementById("exercise");
const exerciseWeightInput = document.getElementById("exercise-weight");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");



//function to create a workout card to display the logged workout
function createWorkoutCard(workout) {

    let isEditing = false; // Flag to track editing state

    // Create a new workout card element to display the logged workout
    const workoutCard = document.createElement("div");

    const exerciseTitle = document.createElement("h4");
    const exerciseInput = document.createElement("input");

    const exerciseWeight = document.createElement("p");
    const exerciseWeightInput = document.createElement("input");

    const exerciseSets = document.createElement("p");
    const exerciseSetsInput = document.createElement("input");

    const exerciseReps = document.createElement("p");
    const exerciseRepsInput = document.createElement("input");

    const deleteWorkoutButton = document.createElement("button");
    const editWorkoutButton = document.createElement("button");

    // Populate the workout card with the user's input values
    workoutCard.className = "workout-card";

    exerciseTitle.textContent = workout.exercise;
    exerciseInput.value = workout.exercise;

    exerciseWeight.textContent = "Weight: " + workout.weight + " kg";
    exerciseWeightInput.value = workout.weight;

    exerciseSets.textContent = "Sets: " + workout.sets;
    exerciseSetsInput.value = workout.sets;

    exerciseReps.textContent = "Reps: " + workout.reps;
    exerciseRepsInput.value = workout.reps;

    deleteWorkoutButton.type = "button";
    deleteWorkoutButton.textContent = "🗑 Delete";
    editWorkoutButton.type = "button";
    editWorkoutButton.textContent = "✏️ Edit";

    // Hide the input fields initially
    exerciseInput.style.display = "none";
    exerciseWeightInput.style.display = "none";
    exerciseSetsInput.style.display = "none";
    exerciseRepsInput.style.display = "none";

    //Tell the Delete button what to do when clicked
    deleteWorkoutButton.addEventListener("click", function(){

        //removes the workout from the workouts array
        workoutsArray = workoutsArray.filter(currentWorkout => {
            return currentWorkout.id !== workout.id;
        });

        //convert the array back into a string and save it to local storage
        localStorage.setItem("workouts", JSON.stringify(workoutsArray));

        //removes the workout added by user
        workoutCard.remove();
    })

    editWorkoutButton.addEventListener("click", function () {

        isEditing = !isEditing; // Toggle editing state

        if (isEditing) {
            // switch to edit mode
            exerciseTitle.style.display = "none";
            exerciseWeight.style.display = "none";
            exerciseSets.style.display = "none";
            exerciseReps.style.display = "none";

            exerciseInput.style.display = "block";
            exerciseWeightInput.style.display = "block";
            exerciseSetsInput.style.display = "block";
            exerciseRepsInput.style.display = "block";

            editWorkoutButton.textContent = "💾 Save";
        } else {
            // SAVE mode

            workout.exercise = exerciseInput.value;
            workout.weight = Number(exerciseWeightInput.value);
            workout.sets = Number(exerciseSetsInput.value);
            workout.reps = Number(exerciseRepsInput.value);

            // Update the displayed values
            exerciseTitle.textContent = workout.exercise;
            exerciseWeight.textContent = "Weight: " + workout.weight + " kg";
            exerciseSets.textContent = "Sets: " + workout.sets;
            exerciseReps.textContent = "Reps: " + workout.reps;

            // save the updated workout to local storage
            localStorage.setItem("workouts", JSON.stringify(workoutsArray));

            // switch back to view mode
            exerciseTitle.style.display = "block";
            exerciseWeight.style.display = "block";
            exerciseSets.style.display = "block";
            exerciseReps.style.display = "block";

            exerciseInput.style.display = "none";
            exerciseWeightInput.style.display = "none";
            exerciseSetsInput.style.display = "none";
            exerciseRepsInput.style.display = "none";

            editWorkoutButton.textContent = "✏️ Edit";

            isEditing = false; // Reset editing state
        }
    });

    //build the card
    workoutCard.appendChild(exerciseTitle);
    workoutCard.appendChild(exerciseInput);

    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseWeightInput);

    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseSetsInput);

    workoutCard.appendChild(exerciseReps);
    workoutCard.appendChild(exerciseRepsInput);

    workoutCard.appendChild(deleteWorkoutButton);
    workoutCard.appendChild(editWorkoutButton);

    //display the card in the logged workouts section
    loggedWorkouts.appendChild(workoutCard);
}



// load the saved workouts
const savedWorkouts = localStorage.getItem("workouts") || "[]";

// turns the string into an array
let workoutsArray = JSON.parse(savedWorkouts);

// create workout cards for each saved workout
for (const workout of workoutsArray) {
    createWorkoutCard(workout);
}



//Event listener for the workout form submission
workoutForm.addEventListener("submit", function (event) {
    //prevent the default form submission behavior to avoid page reload
    event.preventDefault();

    //create a workout object to store the user's input values
    const workout = {
        id: crypto.randomUUID(), // generates a unique ID for each workout
        exercise: exerciseInput.value,
        weight: Number(exerciseWeightInput.value),
        sets: Number(setsInput.value),
        reps: Number(repsInput.value),
        date: new Date().toISOString().split("T")[0]
    };

    // adds the new workout
    workoutsArray.push(workout);

    // convert the array back into a string and save it to local storage
    localStorage.setItem("workouts", JSON.stringify(workoutsArray));

    //create a workout card to display the logged workout
    createWorkoutCard(workout);

    // Reset the form fields after submission
    workoutForm.reset();
});



//weight progress form

//Main weight progress form
const progressForm = document.getElementById("progress-form");

//get the current weight display element
const currentWeightDiv = document.getElementById("current-weight");

//user input fields for date and body weight
const weightDateInput = document.getElementById("weight-date");
const bodyWeightInput = document.getElementById("body-weight");

//load the saved weight history from local storage or initialize an empty array if none exists
let weightHistoryArray = JSON.parse(localStorage.getItem("weightHistory")) || [];


//function to delete the latest weight entry
function deleteLatestWeight() {

    //get the current weight display element
    if (weightHistoryArray.length === 0) {
         return; // No weight entries to delete
    }

    //remove last etry from DATA
    weightHistoryArray.pop();

    //update stroage
    localStorage.setItem("weightHistory", JSON.stringify(weightHistoryArray));

    //update the current weight display
    if (weightHistoryArray.length > 0) {
        //get the latest weight entry
        const latestWeightEntry = weightHistoryArray[weightHistoryArray.length - 1];
        updateCurrentWeight(latestWeightEntry);
    } else {
        currentWeightDiv.innerHTML = "No weight entries logged yet.";
    }
};



//function to update the current weight display
function updateCurrentWeight(weightEntry) {

    if (!currentWeightDiv) return; // Exit if the element is not found

    //update the current weight display with the latest weight entry
    currentWeightDiv.innerHTML =
        "Current Weight: " + weightEntry.weight + " kg" +
        "<br>" +
        "Last updated: " + weightEntry.date +
        "<br>" +
        "<button id='deleteWeightBtn'>🗑 Delete</button>";

    //add event listener to the delete button
    const deleteWeightBtn = document.getElementById("deleteWeightBtn");

    if (deleteWeightBtn) {
        deleteWeightBtn.addEventListener("click", deleteLatestWeight);
    }
}



//display the logged weight entries
if (weightHistoryArray.length > 0) {
    //get the latest weight entry
    const latestWeightEntry = weightHistoryArray[weightHistoryArray.length - 1];

    //update the current weight display with the latest weight entry
    updateCurrentWeight(latestWeightEntry);
}



//listener for the weight progress form submission
progressForm.addEventListener("submit", function (event) {
    //prevent the default form submission behavior
    event.preventDefault();

    //create a weight entry object to store the user's input values
    const weightEntry = {
        id: crypto.randomUUID(), // generates a unique ID for each weight entry
        date: weightDateInput.value,
        weight: Number(bodyWeightInput.value)
    };

    //add the new weight entry to the array
    weightHistoryArray.push(weightEntry);

    //convert the array back into a string and save it to local storage
    localStorage.setItem("weightHistory", JSON.stringify(weightHistoryArray));

    //update the current weight display
    updateCurrentWeight(weightEntry);

    // Reset the form fields after submission
    progressForm.reset();
});