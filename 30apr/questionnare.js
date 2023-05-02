const sentence = "this is a test sentence";
const letters = sentence.split("");
const typing = document.getElementById("typing");

function addBlinkingCursor() {
    const cursor = document.createElement("span");
    cursor.classList.add("blinking-cursor");
    cursor.textContent = "|";
    typing.appendChild(cursor);
  }
  
  function removeBlinkingCursor() {
    const cursor = typing.querySelector(".blinking-cursor");
    if (cursor) {
      cursor.remove();
    }
  }
  
  for (let i = 0; i < letters.length; i++) {
    setTimeout(function() {
      removeBlinkingCursor();
      typing.innerHTML += letters[i];
      addBlinkingCursor();
    }, i * 100); // Change the 100 value to control the typing speed
  }
  
  setInterval(function() {
    const cursor = typing.querySelector(".blinking-cursor");
    if (cursor) {
      cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
    }
  }, 500);
  