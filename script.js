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

//Event listener for the workout form submission
workoutForm.addEventListener("submit", function (event) {
    //prevent the default form submission behavior to avoid page reload
    event.preventDefault();

    // Create a new workout card element to display the logged workout
    const workoutCard = document.createElement("div");
    const exerciseTitle = document.createElement("h4");
    const exerciseWeight = document.createElement("p");
    const exerciseSets = document.createElement("p");
    const exerciseReps = document.createElement("p");

    // Populate the workout card with the user's input values
    workoutCard.className = "workout-card";
    exerciseTitle.textContent = exerciseInput.value;
    exerciseWeight.textContent = "Weight: " + exerciseWeightInput.value + " kg";
    exerciseSets.textContent = "Sets: " + setsInput.value;
    exerciseReps.textContent = "Reps: " + repsInput.value;

    //build the card
    workoutCard.appendChild(exerciseTitle);
    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseReps);
    loggedWorkouts.appendChild(workoutCard);

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
    
    //populate the card with the date and weight values from the input fields
    weightCard.className = "weight-card";
    weightDateTitle.textContent = "📅 Date: " + weightDateInput.value;
    weightValue.textContent = "⚖️ Weight: " + bodyWeightInput.value + " kg";
    
    //build the card
    weightCard.appendChild(weightDateTitle);
    weightCard.appendChild(weightValue);

    //display the card in the logged weight section
    loggedWeight.appendChild(weightCard);

    // Reset the form fields after submission
    progressForm.reset();
});