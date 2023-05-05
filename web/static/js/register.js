let valid_u = false
let valid_p = false
let valid_p2 = false


function check_input(e){
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    switch($(this).attr("id")){
        
        case "username":
            console.log("username")
            if (alphanumericRegex.test(log)) {
                valid_u = true;
                $("#register_error").text("")
            } 
            else {
                valid_u = false;
                $("#register_error").text("Username must contain only characters and numbers")
            }
        break;

        case "password":
            console.log("p1")
            if (log.length < 8) {
                valid_p = false;
                $("#register_error").text("Password must be at least 8 characters")
            } 
            else {
                valid_p = true;
                $("#register_error").text("")
            }
        break;

        case "password_2":
            console.log("p2")
            if (log == $("#password").val()) {
                valid_p2 = true;
                $("#register_error").text("")
            } 
            else {
                valid_p2 = false;
                $("#register_error").text("Passwords must match")
            }
        break;

            default:
    }
}

$("#username").on("input", check_input)
$("#password").on("input", check_input)
$("#password_2").on("input", check_input)

$("#register_form").submit(async function(event){
    event.preventDefault();

    if (valid_u && valid_p2 && valid_p2){
        const formData = new FormData(event.target);
  
        // send a POST request to the server
        const response = await fetch('/register', {
        method: 'POST',
        body: formData
        });
  
        // handle the server response
        if (response.ok) {
        // success, redirect to the home page
        window.location.href = "/";
        } else {
        // error, update the form with the error message
        const error = await response.text();
        $("#register_error").text(error)
        }
    }
});