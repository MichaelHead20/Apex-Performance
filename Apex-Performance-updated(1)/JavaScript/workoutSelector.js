//========================================================
// Workout Selector Functionality
//========================================================


// Get references to HTML elements
const workoutSelector = document.getElementById("workout-selector");

const startWorkoutButton = document.getElementById("start-workout-button");



//========================================================
// Load Workout Templates Into Dropdown
//========================================================


// Get saved workout templates
const workoutTemplates =
    JSON.parse(localStorage.getItem("workoutTemplates")) || [];



// Add each workout template to the dropdown
for (const workout of workoutTemplates) {


    const workoutOption = document.createElement("option");


    // Store workout ID as the option value
    workoutOption.value = workout.id;


    // Display workout name
    workoutOption.textContent = workout.name;


    // Add option to dropdown
    workoutSelector.appendChild(workoutOption);

}



//========================================================
// Start Workout Functionality
//========================================================


startWorkoutButton.addEventListener("click", () => {


    // Get selected workout ID
    const selectedWorkoutID = workoutSelector.value;



    // Prevent starting without selecting workout
    if (selectedWorkoutID === "") {

        return;

    }



    // Find selected workout template
    const selectedWorkout = workoutTemplates.find(workout => {


        return workout.id === selectedWorkoutID;


    });



    // Save selected workout as active workout
    localStorage.setItem(
        "activeWorkout",
        JSON.stringify(selectedWorkout)
    );



    // Move to workout session page
    window.location.href = "workoutSession.html";


});