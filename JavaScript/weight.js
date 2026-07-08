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