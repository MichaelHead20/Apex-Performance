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
    // Create a new workout card element to display the logged workout
    const workoutCard = document.createElement("div");
    const exerciseTitle = document.createElement("h4");
    const exerciseWeight = document.createElement("p");
    const exerciseSets = document.createElement("p");
    const exerciseReps = document.createElement("p");
    const deleteWorkoutButton = document.createElement("button");

    // Populate the workout card with the user's input values
    workoutCard.className = "workout-card";
    exerciseTitle.textContent = workout.exercise;
    exerciseWeight.textContent = "Weight: " + workout.weight + " kg";
    exerciseSets.textContent = "Sets: " + workout.sets;
    exerciseReps.textContent = "Reps: " + workout.reps;
    deleteWorkoutButton.type = "button";
    deleteWorkoutButton.textContent = "🗑 Delete";

    //Tell the Delete button what to do when clicked
    deleteWorkoutButton.addEventListener("click", function(){
        //removes the workout added by user
        workoutCard.remove();
    })

    //build the card
    workoutCard.appendChild(exerciseTitle);
    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseReps);
    workoutCard.appendChild(deleteWorkoutButton);

    //display the card in the logged workouts section
    loggedWorkouts.appendChild(workoutCard);
}

// load the saved workouts
const savedWorkouts = localStorage.getItem("workouts") || "[]";

// turns the string into an array
const workoutsArray = JSON.parse(savedWorkouts);

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
        exercise: exerciseInput.value,
        weight: exerciseWeightInput.value,
        sets: setsInput.value,
        reps: repsInput.value
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