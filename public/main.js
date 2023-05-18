const url = "http://localhost:3000";

//assign variables and query selectors
const submitButton = document.querySelector("button[type='submit']");
const firstNameHistory = document.querySelector("#firstNameHistory");
const lastNameHistory = document.querySelector("#lastNameHistory");
const emailHistory = document.querySelector("#emailAddressHistory");
const catchphraseHistory = document.querySelector("#catchphraseHistory");

function handleSubmit(event) {
    event.preventDefault();
    console.log("submit button clicked");
    //call the function to submit the form via POST
    submitForm();
}

//functoin to get data from the form
function getFormData() {
    //get first name,last name, email, catchphrase from the form
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const catchphrase = document.querySelector("#catchphrase").value;
    //create a new user object
    const body = {
        firstName,
        lastName,
        email,
        catchphrase,
    }
    console.log(body);
    return body;
}

//function to submit the form
async function submitForm() {
    const response = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(getFormData()),
    });
    const data = await response.json();
    console.log(data);
    //This will clear the form after submission, added defensive code to check if the element exists
    const firstNameInput = document.querySelector("#first-name");
    if (firstNameInput){
        firstNameInput.value = "";
    }
    const lastNameInput = document.querySelector("#last-name");
    if (lastNameInput){
        lastNameInput.value = "";
    }
    const emailInput = document.querySelector("#email");
    if (emailInput){
        emailInput.value = "";
    }
    const catchphraseInput = document.querySelector("#catchphrase");
    if (catchphraseInput){
        catchphraseInput.value = "";
    }

    //This will display the latest user info that was added to the database
    firstNameHistory.innerHTML = `${data.payload.payload.firstName}`; 
    lastNameHistory.innerHTML =` ${data.payload.payload.lastName}`;
    emailHistory.innerHTML = `${data.payload.payload.email}`;
    catchphraseHistory.innerHTML =` ${data.payload.payload.catchphrase}`;
    
    //Scroll to top of the page after submission
    window.scrollTo({top: 0, behavior: 'smooth'});
}

//fetch data from API to display on the page
//will display the latest user info that was added to the database
async function fetchLatestUser() {
    const response = await fetch(`${url}/api/users`,
        {
            method: "GET",
            headers: { "content-type": "application/json" },
            });
    const data = await response.json();
    let latestUser = data.payload[data.payload.length - 1];
    console.log(latestUser);
    firstNameHistory.innerHTML = `${latestUser.firstName}`;
    lastNameHistory.innerHTML = `${latestUser.lastName}`;
    emailHistory.innerHTML = `${latestUser.email}`;
    catchphraseHistory.innerHTML = `${latestUser.catchphrase}`;
}

//add event listener to submit button
submitButton.addEventListener("click", handleSubmit);
