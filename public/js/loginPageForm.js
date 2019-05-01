// //Create a reference to the form
const myForm = document.getElementById("static-form1");

 if (myForm) {
//     //Get a reference to the text_input field
    const textInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
//     const textInput = document.getElementById("text1");

//     //Add an event listener for the form submit
     myForm.addEventListener("submit", event => {
//         //We need to prevent the default behavior of the form submit
         event.preventDefault();
         myForm.submit()


     });
 }