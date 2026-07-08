const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const closeSidebar = document.getElementById("close-sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
    menuToggle.style.display = "none"; // Hide the menu toggle button when sidebar is open
});

closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuToggle.style.display = "block"; // Show the menu toggle button when sidebar is closed
});