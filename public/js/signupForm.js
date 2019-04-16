//Create a reference to the form
const myForm = document.getElementById("signup-form");

if (myForm) {
    //Get a reference to the text_input field
    const textInput = document.getElementById("username");

    //Add an event listener for the form submit
    myForm.addEventListener("submit", event => {
        //We need to prevent the default behavior of the form submit
        event.preventDefault();

        /*  Now we check to make sure the user entered a value in the input box
            We are only concerned if they entered something, we do not need to
            validate if it's a number, string etc.. in this example
        */
        if (textInput.value) {
            //we hide the error div in case it's visible
            $("#usererror").hide();
            if(textInput.value.length <5 || textInput.value.length >15)
            {
                $("#usererror").show();
                $("#usererror").html("User name should be minimum 5 characters and maximum 15 characters!");
                return
                
            }
            var regexp = /^[a-zA-Z][a-zA-Z0-9-_]+$/;
            if(textInput.value.search(regexp) == -1)
            {
                $("#usererror").show();
                $("#usererror").html("User name can only contain alphanumeric characters and underscore and it should start with an alphabet!");
                return
            }
            

            //We create the list item element variable
            const li = `<li> ${textInput.value} </li>`

            //we add the li element created above to the UL
            $("#myList").append(li);

            //We then reset the form
            $("#myForm").trigger('reset');
            /*  you can also do this by just clearing the text input as shown below
                if you want to reset all fields, use the reset example above
                if you want to just clear certain form fields you can use the example below
                $("#text_input").val('');
            */

            //then set the cursor focus to the input box
            $('#text_input').focus();
        } else {
            //If the user did not enter input, we show the error div and text
            $("#usererror").show();
            $("#usererror").html("You Need to supply an user name!");

            //then set the cursor focus to the input field
            $('#text_input').focus();
        }

    });
}