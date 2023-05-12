let valid_u = false
let valid_p = false
let valid_p2 = false


function check_input(e){
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    switch($(this).attr("id")){
        
        case "username":
            if (alphanumericRegex.test(log)) {
                valid_u = true;
                $("#register_error").text("default")
                $("#register_error").css("opacity","0")
            } 
            else {
                valid_u = false;
                if (log != ""){
                    $("#register_error").text("Username must contain only characters and numbers")
                    $("#register_error").css("opacity","1")
                }
                else{
                    $("#register_error").text("default")
                    $("#register_error").css("opacity","0")
                }
            }
        break;

        case "password":
            if (log.length < 8) {
                valid_p = false;
                if (log != ""){
                    $("#register_error").text("Password must be at least 8 characters")
                    $("#register_error").css("opacity","1")
                }
                else{
                    $("#register_error").text("default")
                    $("#register_error").css("opacity","0")
                }
            } 
            else {
                valid_p = true;
                $("#register_error").text("default")
                $("#register_error").css("opacity","0")
            }
        break;

        case "password_2":
            if (log == $("#password").val()) {
                valid_p2 = true;
                $("#register_error").text("default")
                $("#register_error").css("opacity","0")
            } 
            else {
                valid_p2 = false;
                $("#register_error").text("Passwords must match")
                $("#register_error").css("opacity","1")
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