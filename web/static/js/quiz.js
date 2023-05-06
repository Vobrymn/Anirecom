/*makes sure html loads b4 js*/
document.addEventListener("DOMContentLoaded", function () {
  indaQuiz();
});

/*the stuff*/
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function(e) {
    let a, b, i, val = this.value;

    closeAllLists();

    const lastGenre = val.split(',').pop().trim();
    if (!lastGenre) {
      return false;
    }

    a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete_items");
    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, lastGenre.length).toLowerCase() === lastGenre.toLowerCase()) {
        b = document.createElement("div");
        b.innerHTML = "<strong>" + arr[i].substr(0, lastGenre.length) + "</strong>";
        b.innerHTML += arr[i].substr(lastGenre.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e) {
          const genreClicked = this.getElementsByTagName("input")[0].value;
          const inputGenres = inp.value.split(',');
          inputGenres[inputGenres.length - 1] = genreClicked;
          inp.value = inputGenres.join(', ').trim();
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete_items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*actual quiz stuff*/
function indaQuiz() {
  const questions = [
    {
      question: "Would you like an anime or a manga?",
      choices: ["anime", "manga"],
    },
    {
        question: "What genres r u interested in? Select up to three, separating each by a comma",
        anime_choices: ["test1","test2","test3","tst4","doodoo1","dod","do"],
        manga_choices: ["test","test6","tehe","DOOO","door","tss"],
      
    },
  ];

  let currentQuestionIndex = 0;
  let previousAnswers = ["", ""];
  let selectedOption = "";
  const typing = document.getElementById("typing");
  const errorMessage = document.getElementById("error_message");
  const answerInput = document.getElementById("answer");
  const backButton = document.getElementById("back");
  const nextButton = document.getElementById("next");
  const skipButton = document.getElementById("skip");

  backButton.addEventListener("click", goBack);
  nextButton.addEventListener("click", goNext);
  skipButton.addEventListener("click", goSkip);

  let timeoutIds = []; 

  function displayQuestion(question) {
    typing.innerHTML = "";
    errorMessage.textContent = "";
    answerInput.value = previousAnswers[currentQuestionIndex];
    const letters = question.split("");
    addBlinkingCursor();
  
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIds = [];
  
    for (let i = 0; i < letters.length; i++) {
      const timeoutId = setTimeout(function () {
        removeBlinkingCursor();
        typing.textContent += letters[i];
        addBlinkingCursor();
      }, i * 100);
      timeoutIds.push(timeoutId);
    }
  
    //initialize autocomplete for q
    if (currentQuestionIndex === 1) {
      const validGenres = selectedOption === "anime" ? questions[1].anime_choices : questions[1].manga_choices;
      autocomplete(answerInput, validGenres);
    }
  }
  
  /*typing effect*/
  function addBlinkingCursor() {
    const cursor = document.createElement("span");
    cursor.classList.add("blinking_cursor");
    cursor.textContent = "|";
    typing.appendChild(cursor);
  }

  function removeBlinkingCursor() {
    const cursor = typing.querySelector(".blinking_cursor");
    if (cursor) {
      cursor.remove();
    }
  }

  function goBack() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion(questions[currentQuestionIndex].question);
    }
  }

  function goNext() {
    if (currentQuestionIndex === 0) {
      const answer = answerInput.value.trim().toLowerCase();
      if (questions[0].choices.includes(answer)) {
        selectedOption = answer;
        previousAnswers[currentQuestionIndex] = answer;
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex].question);
  
        //autocomplete
        if (currentQuestionIndex === 1) {
          const validGenres = selectedOption === "anime" ? questions[1].anime_choices : questions[1].manga_choices;
          autocomplete(answerInput, validGenres);
        }
      } else {
        errorMessage.textContent = "Invalid answer. Please choose either 'anime' or 'manga'.";
      }
    } else {
      const genres = answerInput.value.split(",").map((genre) => genre.trim().toLowerCase());
      const validGenres = selectedOption === "anime" ? questions[1].anime_choices : questions[1].manga_choices;
      const validAnswers = genres.filter((genre) => validGenres.map(g => g.toLowerCase()).includes(genre) && genre !== "");

      if (validAnswers.length >= 1 && validAnswers.length <= 3) {
        previousAnswers[currentQuestionIndex] = answerInput.value;
        currentQuestionIndex++;
        //more q
        console.log("Genres r valid nice.");
      } else {
        let errorMsg = "";
        if (validAnswers.length === 0) {
          errorMsg = "None of your genres are valid.";
        } else if (validAnswers.length > 3) {
          errorMsg = "Please select up to three genres only.";
        }
        errorMessage.textContent = errorMsg;
      }
    }
  }

  function goSkip() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(questions[currentQuestionIndex].question);
    }
  }

  displayQuestion(questions[currentQuestionIndex].question);
}