const appStatus = document.getElementById("statusButton");

 if (appStatus) {
//     //Get a reference to the text_input field
    const textInput = document.getElementById("status");

//     //Add an event listener for the form submit
     appStatus.addEventListener("submit", event => {
//         //We need to prevent the default behavior of the form submit
         event.preventDefault();
         appStatus.submit()


     });
 }