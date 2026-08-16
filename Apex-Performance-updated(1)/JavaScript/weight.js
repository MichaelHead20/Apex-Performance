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

    //redraw the chart to reflect the deleted entry
    drawProgressChart();
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



//get the canvas element used to draw the progress chart (may not exist on every page)
const progressChartCanvas = document.getElementById("progress-chart");

//function to draw a simple line chart of weight over time
function drawProgressChart() {

    if (!progressChartCanvas) return; // Exit if there's no chart on this page

    const ctx = progressChartCanvas.getContext("2d");
    const width = progressChartCanvas.width;
    const height = progressChartCanvas.height;
    const padding = 30;

    //clear the canvas before redrawing
    ctx.clearRect(0, 0, width, height);

    //nothing to plot yet
    if (weightHistoryArray.length === 0) {
        ctx.fillStyle = "#888";
        ctx.font = "14px sans-serif";
        ctx.fillText("No weight entries logged yet.", padding, height / 2);
        return;
    }

    //sort a copy of the entries by date so the line reads left to right
    const sortedEntries = [...weightHistoryArray].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    const weights = sortedEntries.map(entry => entry.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    //avoid a zero-height range if every entry is the same weight
    const weightRange = maxWeight - minWeight || 1;

    //draw axes
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    //helper to convert an entry index/weight into canvas coordinates
    function pointFor(index, weight) {
        const x = sortedEntries.length === 1
            ? width / 2
            : padding + (index / (sortedEntries.length - 1)) * (width - padding * 2);
        const y = height - padding - ((weight - minWeight) / weightRange) * (height - padding * 2);
        return { x, y };
    }

    //draw the line connecting each entry
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    sortedEntries.forEach((entry, index) => {
        const { x, y } = pointFor(index, entry.weight);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    //draw a dot for each entry
    ctx.fillStyle = "#3b82f6";
    sortedEntries.forEach((entry, index) => {
        const { x, y } = pointFor(index, entry.weight);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

//display the logged weight entries
if (weightHistoryArray.length > 0) {
    //get the latest weight entry
    const latestWeightEntry = weightHistoryArray[weightHistoryArray.length - 1];

    //update the current weight display with the latest weight entry
    updateCurrentWeight(latestWeightEntry);
}

//draw the chart on page load
drawProgressChart();



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

    //redraw the chart to include the new entry
    drawProgressChart();

    // Reset the form fields after submission
    progressForm.reset();
});