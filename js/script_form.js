/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/

const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname that must begin the first letter with uppercase.";
    return false;
  } else {

    const FirstName = names[0];     // Check Uppercase
    const LastName = names[1];
    const isFirstNameValid = /^[A-Z][a-z]*$/.test(FirstName);
    const isLastNameValid = /^[A-Z][a-z]*$/.test(LastName);

    if (!isFirstNameValid || !isLastNameValid) {
      return false;
    }

    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^6609\d{6}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID start with '6609'. ";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^[a-zA-Z]+\.[a-zA-Z]{3}@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxxxxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

//Function to validate Telephone Number
function validatephoneNumber(){
  const phoneInput = document.getElementById("phoneNumber");
  const phonePattern = /^0\d{9}$/;
  const errorElement = document.getElementById("phoneError");

  if (!phonePattern.test(phoneInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Phone Number.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}
// Function to validate form inputs on user input
//  function validateFormOnInput() {
//  validateName();
//  validateStudentID();
//  validateEmail();
// }

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}


// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});


// Image viewer
function previewImage() {
  var input = document.getElementById('image');
  var previewImage = document.getElementById('previewImage');

  var file = input.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
      previewImage.src = reader.result;
      previewImage.style.display = 'block';
  };

  if (file) {
      reader.readAsDataURL(file);
  } else {
      previewImage.src = '';
      previewImage.style.display = 'none';
  }
}



// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail() || !validatephoneNumber()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    phone: parseInt(formData.get("phoneNumber")),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  const detailsContainer = document.createElement("div");
  var name = document.getElementById("fullname").value;
  var studentID = document.getElementById("studentID").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var title = document.getElementById("workTitle").value;
  var image = document.getElementById("image").files[0];
  var semester = document.getElementById("semester").value;
  var start_date = document.getElementById("startDate").value;
  var end_date = document.getElementById("endDate").value;
  var description = document.getElementById("description").value;

  detailsContainer.id = "submission-details"; // กำหนด id หรือ class ตามที่ต้องการ
  detailsContainer.classList.add("element_box");

  // สร้าง HTML หรือเนื้อหาที่ต้องการแสดง
  const detailsContent = `
  <h2>${title}</h2>
  <img src="${URL.createObjectURL(image)}" alt="Preview" style="max-width: 100%; height: auto;">
  <p><b>Name :</b> ${name}</p>
  <p><b>student ID :</b> ${studentID}</p>
  <p><b>Email :</b> ${email} <b>PhoneNumber :</b> ${phoneNumber}</p>
  <p><b>Time :</b> ${startDate} to ${endDate} (Semester ${semester})</p>
  <p><b>Description :</b> ${description}</p>
  <a href="#form_spot" class ="back_button" style="color: #2461b2"> --^ Back ^-- </a>
`;

  detailsContainer.innerHTML = detailsContent;

  // Add element
  document.body.appendChild(detailsContainer);

  const elementToInsertBefore = document.getElementById("footer");
  document.body.insertBefore(detailsContainer, elementToInsertBefore);


  // clear form
  document.getElementById("myForm").reset();

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      //alert("Succeed to submit form data. Please try again.");
      alert("Thanks.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
document
  .getElementById("phoneNumber")
  .addEventListener("input", validatephoneNumber);
