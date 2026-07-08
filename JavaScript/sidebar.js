// JavaScript for sidebar toggle functionality

// Get references to the sidebar and toggle buttons
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const closeSidebar = document.getElementById("close-sidebar");

// Add event listeners to toggle the sidebar visibility
menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
    menuToggle.style.display = "none"; // Hide the menu toggle button when sidebar is open
});

// Add event listener to close the sidebar when the close button is clicked
closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuToggle.style.display = "block"; // Show the menu toggle button when sidebar is closed
});