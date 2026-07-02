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
    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseReps);
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

//container for logged weight entries
const loggedWeight = document.getElementById("logged-weight");

//user input fields for date and body weight
const weightDateInput = document.getElementById("weight-date");
const bodyWeightInput = document.getElementById("body-weight");

//listener for the weight progress form submission
progressForm.addEventListener("submit", function (event) {
    //prevent the default form submission behavior
    event.preventDefault();

    //create a card to display the weight entry with date and weight
    const weightCard = document.createElement("div");
    const weightDateTitle = document.createElement("h4");
    const weightValue = document.createElement("p");
    const deleteWeightButton = document.createElement("button");
    
    //populate the card with the date and weight values from the input fields
    weightCard.className = "weight-card";
    weightDateTitle.textContent = "📅 Date: " + weightDateInput.value;
    weightValue.textContent = "⚖️ Weight: " + bodyWeightInput.value + " kg";
    deleteWeightButton.type = "button";
    deleteWeightButton.textContent = "🗑 Delete";

    //Tell the delete button what to do when clicked
    deleteWeightButton.addEventListener("click", function (event){
        //removes the weight card added by user
        weightCard.remove();
    });
    
    //build the card
    weightCard.appendChild(weightDateTitle);
    weightCard.appendChild(weightValue);

    //display the card in the logged weight section
    loggedWeight.appendChild(weightCard);

    // Reset the form fields after submission
    progressForm.reset();
});