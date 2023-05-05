let valid_u = false
let valid_p = false
let valid_p2 = false

function check_uname(e) {
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (alphanumericRegex.test(log)) {
        valid_u = true;
        $("#register_error").text("")
    } 
    else {
        valid_u = false;
        $("#register_error").text("Username must contain only characters and numbers")
    }
}

function check_pwd(e) {
    const log = $(this).val();
    if (log.length < 8) {
        valid_p = false;
        $("#register_error").text("Password must be at least 8 characters")
    } 
    else {
        valid_p = true;
        $("#register_error").text("")
    }
    
}

function check_pwd2(e) {
    const log = $(this).val();
    if (log == $("#password").val()) {
        valid_p2 = true;
        $("#register_error").text("")
    } 
    else {
        valid_p2 = false;
        $("#register_error").text("Passwords must match")
    }
    
}


$("#username").on("input", check_uname)
$("#password").on("input", check_pwd)
$("#password_2").on("input", check_pwd2)

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