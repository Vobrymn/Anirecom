let valid = false

function check_pwd(e) {
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (log.length < 8) {
        valid = false;
        $("#register_error").text("Password must be at least 8 characters")
    } 
    else {
        valid = true;
        $("#register_error").text("")
    }
    
}
function check_uname(e) {
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (alphanumericRegex.test(log)) {
        valid = true;
        $("#register_error").text("")
    } 
    else {
        valid = false;
        $("#register_error").text("Username must contain only characters and numbers")
    }
}

$("#username").on("input", check_uname)
$("#password").on("input", check_pwd)

$("#register_form").submit(async function(event){
    event.preventDefault();

    if (valid){
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