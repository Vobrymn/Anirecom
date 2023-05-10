var logged_in = false
var username = null
var colour_1 = "rgba(14, 112, 47, 0.9)"
var colour_2 = "rgba(203, 119, 174, 0.9)"


function parse_cookie(){

    var cookies = document.cookie.split(';');  // Get all cookies as an array of strings
    var sessionVars = {};  // Object to store session variables

    // Iterate over cookies and parse key-value pairs
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();  // Remove whitespace
        var separatorIndex = cookie.indexOf('=');  // Find the index of the = separator
        if (separatorIndex >= 0) {
            var key = cookie.substring(0, separatorIndex);  // Extract the key
            var value = decodeURIComponent(cookie.substring(separatorIndex + 1));  // Extract the value
            sessionVars[key] = value;  // Store key-value pair in object
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
        // `colour_2` exists, so we can access its value
        colour_2 = sessionVars['colour_2']
    }

    let root = document.documentElement;

    // Set the value of --primary-colour to colour_1
    root.style.setProperty('--primary_colour', colour_1);

    // Set the value of --secondary-colour to colour_2
    root.style.setProperty('--secondary_colour', colour_2);

}

parse_cookie()