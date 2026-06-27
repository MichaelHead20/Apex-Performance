const workoutForm = document.getElementById("workout-form");
const loggedWorkouts = document.getElementById("logged-workouts");

const exerciseInput = document.getElementById("exercise");
const exerciseWeightInput = document.getElementById("exercise-weight");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");

workoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);

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