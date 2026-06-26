const workoutForm = document.getElementById("workout-form");

const exerciseInput = document.getElementById("exercise");
const weightInput = document.getElementById("weight");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");

const workoutCard = document.createElement("div");
workoutCard.className="workout-card";

const exerciseTitle = document.createElement("h3");
exerciseTitle.textContent = "Exercise: " + exerciseInput.value;

const exerciseWeight = document.createElement("p");
exerciseWeight.textContent = "Weight: " + weightInput.value + " kg";

const exerciseSets = document.createElement("p");
exerciseSets.textContent = "Sets: " + setsInput.value;

const exerciseReps = document.createElement("p");
exerciseReps.textContent = "Reps: " + repsInput.value;

workoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    console.log("Workout submitted!");
    console.log("Exercise:", exerciseInput.value);
    console.log("Weight:", weightInput.value);
    console.log("Sets:", setsInput.value);
    console.log("Reps:", repsInput.value);
});