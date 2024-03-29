// Sample user data storage (replace with your backend solution)
let userLogData = JSON.parse(localStorage.getItem('userLogData')) || [];
let allUserLogData = JSON.parse(localStorage.getItem('allUserLogData')) || [];
let currentUser = null;

// Array of user credentials
const users = [
    { username: 'tafhim6', password: 'm3l1', videoLink: 'https://dai.ly/k2Ed0rGqIPCSrrzPmqh' },
    { username: 'yeasib', password: 'ym3l2', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQPf0HP91KuOBC6H?e=skgyd6'},
    { username: 'yeasib', password: 'ym3l1', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQIyx_7ECwWnHlwl?e=7QXgwb'}, 
    { username: 'yeasib', password: 'yjl1', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQElGL4boxC_caE-?e=eF0uXG'},
     { username: 'yeasib', password: 'yjp1', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQTPlNm7zrna-K3f?e=m67z9g'},
    { username: 'mowmita', password: 'mjl1', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQElGL4boxC_caE-?e=eF0uXG' },
     { username: 'mowmita', password: 'mm3l1', videoLink:'https://1drv.ms/v/s!ApCuyg6c8MEzmQIyx_7ECwWnHlwl?e=7QXgwb'},
    { username: 'mowmita', password: 'mm3l2', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQPf0HP91KuOBC6H?e=skgyd6'},
    { username: 'mowmita', password: 'm', videoLink: 'https://1drv.ms/v/s!ApCuyg6c8MEzmQdSLYm9F2ZJNiCi?e=xwkbAJ'},
    
    // Add more users as needed
];

// Function to fetch user log data asynchronously
async function fetchUserLogData() {
    // Simulate fetching data from a server
    // Replace this with actual backend communication
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userLogData);
        }, 1000); // Simulating a delay
    });
}

// Function to display user log data dynamically
async function displayUserLogData() {
    var userLogList = document.getElementById('userLogList');
    userLogList.innerHTML = '';

    // Fetch user log data
    const data = await fetchUserLogData();

    // Display user log data in the admin dashboard only if the current user is an admin
    if (currentUser === 'Admin') {
        for (var i = 0; i < data.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = `Username: ${data[i].username} | Password: ${data[i].password} | Device: ${data[i].deviceSpecifications} | Location: ${data[i].location} | Login Time: ${data[i].loginTime}`;
            userLogList.appendChild(listItem);

            // Add data to allUserLogData array on admin login
            if (currentUser === 'Admin') {
                allUserLogData.push(data[i]);
            }
        }
    }
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the entered credentials match any user
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        currentUser = username;

        // Hide login form
        document.getElementById('loginForm').style.display = 'none';

        // Show video page
        document.getElementById('videoPage').style.display = 'block';

        // Log user data
        logUserLogin(username, password);

        // Display user log data dynamically for admin
        if (currentUser === 'Admin') {
            displayUserLogData();
        }

        // Dynamically create video links
        createVideoLink(user.videoLink);
    } else {
        // Do nothing or handle the failure silently
    }
}


// Function to fetch all user log data asynchronously
async function fetchAllUserLogData() {
    // Simulate fetching data from a server
    // Replace this with actual backend communication
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(allUserLogData);
        }, 1000); // Simulating a delay
    });
}

function logout() {
    currentUser = null;

    // Show login form
    document.getElementById('loginForm').style.display = 'block';

    // Hide other pages
    document.getElementById('videoPage').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';

    // Update the displayed data on the admin page after logout
    displayUserLogData();
}

function logUserLogin(username, password) {
    var currentTime = new Date().toLocaleString();
    var deviceSpecs = getUserDeviceSpecifications();
    var userLocation = getUserLocation();

    userLogData.push({
        username: username,
        password: password,
        deviceSpecifications: deviceSpecs,
        location: userLocation,
        loginTime: currentTime
    });

    // Store the updated user log data in local storage
    localStorage.setItem('userLogData', JSON.stringify(userLogData));
}

function deleteStoredData() {
    // Admin can use this function to manually delete stored data
    localStorage.removeItem('userLogData');
    userLogData = [];
    displayUserLogData(); // Update the displayed data after deletion

    localStorage.removeItem('allUserLogData');
    allUserLogData = [];
    displayUserLogData(); // Update the displayed data after deletion
}

function getUserDeviceSpecifications() {
    var deviceSpecs = `Device: ${navigator.userAgent}`;
    // Add more specifications if needed
    return deviceSpecs;
}

function getUserLocation() {
    // Use Geolocation API to get user's location
    navigator.geolocation.getCurrentPosition(
        (position) => {
            var location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            // Add more location details if needed
            return location;
        },
        (error) => {
            console.error('Error getting user location:', error.message);
            return 'Location not available';
        }
    );
}

function createVideoLink(videoLink) {
    // Create and append video link dynamically
    var videoPage = document.getElementById('videoPage');

    var videoLinkElement = document.createElement('a');
    videoLinkElement.href = videoLink;
    videoLinkElement.target = "_self";
    videoLinkElement.textContent = "Watch Video";

    // Append link to the video page
    videoPage.appendChild(videoLinkElement);
    videoPage.appendChild(document.createElement('br')); // Add a line break for better formatting
}
