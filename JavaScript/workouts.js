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

//function to get today's date in YYYY-MM-DD format
function getTodaysDate() {
    return new Date().toISOString().split("T")[0]; // Returns the date in YYYY-MM-DD format
}


//function to create a workout card to display the logged workout
function createWorkoutCard(workout) {

    let isEditing = false; // Flag to track editing state

    // Create a new workout card element to display the logged workout
    const workoutCard = document.createElement("div");

    const exerciseTitle = document.createElement("h4");
    const exerciseEditInput = document.createElement("input");

    const exerciseWeight = document.createElement("p");
    const exerciseWeightEditInput = document.createElement("input");

    const exerciseSets = document.createElement("p");
    const exerciseSetsEditInput = document.createElement("input");

    const exerciseReps = document.createElement("p");
    const exerciseRepsEditInput = document.createElement("input");

    const deleteWorkoutButton = document.createElement("button");
    const editWorkoutButton = document.createElement("button");

    // Populate the workout card with the user's input values
    workoutCard.className = "workout-card";

    exerciseTitle.textContent = workout.exercise;
    exerciseEditInput.value = workout.exercise;

    exerciseWeight.textContent = "Weight: " + workout.weight + " kg";
    exerciseWeightEditInput.value = workout.weight;

    exerciseSets.textContent = "Sets: " + workout.sets;
    exerciseSetsEditInput.value = workout.sets;

    exerciseReps.textContent = "Reps: " + workout.reps;
    exerciseRepsEditInput.value = workout.reps;

    deleteWorkoutButton.type = "button";
    deleteWorkoutButton.textContent = "🗑 Delete";
    editWorkoutButton.type = "button";
    editWorkoutButton.textContent = "✏️ Edit";

    // Hide the input fields initially
    exerciseEditInput.style.display = "none";
    exerciseWeightEditInput.style.display = "none";
    exerciseSetsEditInput.style.display = "none";
    exerciseRepsEditInput.style.display = "none";

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

            exerciseEditInput.style.display = "block";
            exerciseWeightEditInput.style.display = "block";
            exerciseSetsEditInput.style.display = "block";
            exerciseRepsEditInput.style.display = "block";

            editWorkoutButton.textContent = "💾 Save";
        } else {
            // SAVE mode

            workout.exercise = exerciseEditInput.value;
            workout.weight = Number(exerciseWeightEditInput.value);
            workout.sets = Number(exerciseSetsEditInput.value);
            workout.reps = Number(exerciseRepsEditInput.value);

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

            exerciseEditInput.style.display = "none";
            exerciseWeightEditInput.style.display = "none";
            exerciseSetsEditInput.style.display = "none";
            exerciseRepsEditInput.style.display = "none";

            editWorkoutButton.textContent = "✏️ Edit";

            isEditing = false; // Reset editing state
        }
    });

    //build the card
    workoutCard.appendChild(exerciseTitle);
    workoutCard.appendChild(exerciseEditInput);

    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseWeightEditInput);

    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseSetsEditInput);

    workoutCard.appendChild(exerciseReps);
    workoutCard.appendChild(exerciseRepsEditInput);

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
    if (workout.date === getTodaysDate()) {
        // only create cards for workouts logged today
        createWorkoutCard(workout);
    }
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