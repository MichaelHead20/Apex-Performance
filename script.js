const workoutForm = document.getElementById("workout-form");
const loggedWorkouts = document.getElementById("logged-workouts");

const exerciseInput = document.getElementById("exercise");
const exerciseWeightInput = document.getElementById("exercise-weight");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");

workoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";

    const exerciseTitle = document.createElement("h4");
    exerciseTitle.textContent = exerciseInput.value;

    const exerciseWeight = document.createElement("p");
    exerciseWeight.textContent = "Weight: " + exerciseWeightInput.value + " kg";

    const exerciseSets = document.createElement("p");
    exerciseSets.textContent = "Sets: " + setsInput.value;

    const exerciseReps = document.createElement("p");
    exerciseReps.textContent = "Reps: " + repsInput.value;

    workoutCard.appendChild(exerciseTitle);
    workoutCard.appendChild(exerciseWeight);
    workoutCard.appendChild(exerciseSets);
    workoutCard.appendChild(exerciseReps);
    loggedWorkouts.appendChild(workoutCard);

    workoutForm.reset();
});

const progressForm = document.getElementById("progress-form");
const loggedWeight = document.getElementById("logged-weight");

const weightDateInput = document.getElementById("weight-date");
const bodyWeightInput = document.getElementById("body-weight");

progressForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    console.log("weight logged!");
    console.log("Date: " + weightDateInput.value);
    console.log("Weight: " + bodyWeightInput.value + " kg");

    const weightCard = document.createElement("div");
    weightCard.className = "weight-card";
    weightCard.textContent = "Date: " + weightDateInput.value + ", Weight: " + bodyWeightInput.value + " kg";
    
    loggedWeight.appendChild(weightCard);

    progressForm.reset();
});