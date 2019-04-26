//Create a reference to the form
const myForm = document.getElementById("signup-form");

if (myForm) {
    //Get a reference to the text_input field
    const textInput = document.getElementById("username");
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password");
    const confirmpasswordInput = document.getElementById("confirmpassword");
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

        if(emailInput.value)
        {
            console.log(emailInput.value);
            $("#emailerror").hide();
            
            var regexp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9\_]+){0,15}@[a-zA-Z0-9\_\-]+(\.[a-zA-Z0-9\_\-]+){0,4}$/;
            if(emailInput.value.search(regexp) == -1)
            {   
                console.log("hello");
                $("#emailerror").show();
                $("#emailerror").html("Invalid Email ID!");
                return
            }
        

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
            $("#emailerror").show();
            $("#emailerror").html("You Need to supply an user name!");

            //then set the cursor focus to the input field
            $('#text_input').focus();
        }






        if(passwordInput.value)
        {
            $("#passworderror").hide();
        }
        else {
            //If the user did not enter input, we show the error div and text
            $("#passworderror").show();
            $("#passworderror").html("You Need to supply a password!");

        }

    });
}