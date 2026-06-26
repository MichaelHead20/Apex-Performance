const workoutForm = document.getElementById("workout-form");
const exerciseInput = document.getElementById("exercise");
const weightInput = document.getElementById("weight");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");

workoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    console.log("Workout submitted!");
    console.log("Exercise:", exerciseInput.value);
    console.log("Weight:", weightInput.value);
    console.log("Sets:", setsInput.value);
    console.log("Reps:", repsInput.value);
});