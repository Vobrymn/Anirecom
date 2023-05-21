var logged_in = false
var username = null
var colour_1 = "rgba(14, 112, 47, 0.9)"
var colour_2 = "rgba(203, 119, 174, 0.9)"


// gets cookies and assigns variables pre-render

function parse_cookie(){

    var cookies = document.cookie.split(';');
    var sessionVars = {};


    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var separatorIndex = cookie.indexOf('=');
        if (separatorIndex >= 0) {
            var key = cookie.substring(0, separatorIndex);
            var value = decodeURIComponent(cookie.substring(separatorIndex + 1)); 
            sessionVars[key] = value;
        }
    }

    // Access individual session variables
    if ('logged_in' in sessionVars) {
        logged_in = sessionVars['logged_in']
    }
    if ('username' in sessionVars) {
        username = sessionVars['username']
    }
    if ('colour_1' in sessionVars) {
        colour_1 = sessionVars['colour_1']
    }
    if ('colour_2' in sessionVars) {
        colour_2 = sessionVars['colour_2']
    }

    let root = document.documentElement;

    // Set the value of --primary-colour to colour_1
    root.style.setProperty('--primary_colour', colour_1);

    // Set the value of --secondary-colour to colour_2
    root.style.setProperty('--secondary_colour', colour_2);

}

parse_cookie()