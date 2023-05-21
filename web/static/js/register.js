$("#sb").remove();

let valid_u = false
let valid_p = false

// checks for valid user name and password

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
                $("#register_error").text("default")
                $("#register_error").css("opacity","0")
            } 
            else {
                $("#register_error").text("Passwords must match")
                $("#register_error").css("opacity","1")
            }
        break;

            default:
    }
}


// input listeners

$("#username").on("input", check_input)
$("#password").on("input", check_input)
$("#password_2").on("input", check_input)



// register form submission

$("#register_form").submit(function(event) {
    event.preventDefault();

    if (!valid_u){
        $("#register_error").text("Username must contain only characters and numbers")
        $("#register_error").css("opacity","1")
        return
    }
    else if (!valid_p){
        $("#register_error").text("Password must be at least 8 characters")
        $("#register_error").css("opacity","1")
        return
    }
    else if (!($("#password").val() == $("#password_2").val())){
        $("#register_error").text("Passwords must match")
        $("#register_error").css("opacity","1")
        return
    }

    if (valid_u && valid_p && $("#password").val() == $("#password_2").val()) {
      const formData = new FormData(event.target);
  
      $.ajax({
        url: '/register',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function() {
          window.location.href = "/";
        },
        error: function(xhr, textStatus, error) {
          $("#register_error").text(xhr.responseText);
          $("#register_error").css("opacity","1")
        }
      });
    }
});