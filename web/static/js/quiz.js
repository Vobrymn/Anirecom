
/*stole this off w3schools. like i modified it to be ours though, like excluding already typed in answers etc*/
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

    let displayedItems = 0;
    for (i = 0; i < arr.length; i++) {
      //check if the ans is already in the input
      const alreadyInInput = inp.value.split(",").map((s) => s.trim().toLowerCase()).includes(arr[i].toLowerCase());

      if (!alreadyInInput && arr[i].substr(0, lastGenre.length).toLowerCase() === lastGenre.toLowerCase()) {
        if (displayedItems >= 5) {
          break;
        }
        displayedItems++;

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


  //[genre],[theme],[producer]
  const anime_choices =[[],[],[]]; 
  const manga_choices =[[],[],[]]; 

  const questions = [
    {
      question: "Would you like an anime or a manga?",
      choices: ["anime", "manga"],
    },
    {
        question: "What genres r u interested in? Select up to three, separating each by a comma",
        anime_choices: ["test 1","test2","test3","tst4","doodoo1","dod","do"],
        manga_choices: ["test","test6","tehe","DOOO","door","tss"],
        /*
        anime_choices: anime_choices[0],
        manga_choices: manga_choices[0],*/
      
    },
    {
        question: "Any themes you're interested in? Select up to three, separating each by a comma",
        anime_choices: ["test11", "test21", "test31", "tst41", "doodoo11", "dod1", "do1"],
        manga_choices: ["test1", "test61", "tehe1", "DOOO1", "door1", "tss1"],
        /*
        anime_choices: anime_choices[1],
        manga_choices: manga_choices[1],*/
    },
    
    {
        question: "",
        anime_question: "Are there any particular studios you'd like to look up? Select up to two, separating them by a comma!",
        manga_question: "Are there any particular authors you'd like to look up? Select up to two, separating them by a comma!",
        anime_choices: ["studio1", "studio2", "studio3", "studio4", "studio5", "studio6"],
        manga_choices: ["author1", "author2", "author3", "author4", "author5", "author6"],
        /*
        anime_choices: anime_choices[2],
        manga_choices: manga_choices[2],*/
    },

    {
        question: "Any year preferences? Use a dash to indicate the year period you'd like",
    }
    
  ];

  let currentQuestionIndex = 0;
  let previousAnswers = ["", "", "", "", ""];
  let selectedOption = "";
  const typing = document.getElementById("typing");
  const errorMessage = document.getElementById("error_message");
  const answerInput = document.getElementById("answer");
  const backButton = document.getElementById("back");
  const nextButton = document.getElementById("next");
  const skipButton = document.getElementById("skip");
  //answers thing
  let answers = {
    type: "",
    genres: [],
    themes: [],
    producers: [],
    date: ""
  };

  backButton.addEventListener("click", goBack);
  nextButton.addEventListener("click", goNext);
  skipButton.addEventListener("click", goSkip);

  let timeoutIds = []; 

  function displayQuestion() {
    let question;
    if (currentQuestionIndex === 3) {
      question = selectedOption === "anime" ? questions[currentQuestionIndex].anime_question : questions[currentQuestionIndex].manga_question;
    } else {
      question = questions[currentQuestionIndex].question;
    }
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
  
    //initialize autocomplete for questions 2 3 4
    if (currentQuestionIndex >= 1 && currentQuestionIndex <= 3) {
      const validChoices = selectedOption === "anime" ? questions[currentQuestionIndex].anime_choices : questions[currentQuestionIndex].manga_choices;
      autocomplete(answerInput, validChoices);
    }

    if (currentQuestionIndex === 0) {
      backButton.disabled = true;
      backButton.style.opacity = "0.9";
    } else {
      backButton.disabled = false;
      backButton.style.opacity = "1";
    }
  }
  
  //typing effect
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

  function goNext() { //deep breath
    if (currentQuestionIndex === 0) {
      const answer = answerInput.value.trim().toLowerCase();
      if (questions[0].choices.includes(answer)) {
        const shouldResetAnswers = selectedOption !== answer;
        selectedOption = answer;
        //reset answers if the selected option has changed (anime/manga)
        if (shouldResetAnswers) {
          previousAnswers = ["", "", "", "", ""];
          answers = { //reset answers too
            type: "",
            genres: [],
            themes: [],
            producers: [],
            date: ""
          };
        }
        
        previousAnswers[currentQuestionIndex] = answer;
        answers.type = answer;
        currentQuestionIndex++;
        displayQuestion();

      //autocomplete
      if (currentQuestionIndex === 1) {
        const validGenres = selectedOption === "anime" ? questions[1].anime_choices : questions[1].manga_choices;
        autocomplete(answerInput, validGenres);
      }
    } else {
      errorMessage.textContent = "Invalid answer. Please choose either 'anime' or 'manga'.";
    }
  } else if (currentQuestionIndex >= 1 && currentQuestionIndex <= 3) {
    const choices = answerInput.value.split(",").map((choice) => choice.trim().toLowerCase());
    const validChoices = selectedOption === "anime" ? questions[currentQuestionIndex].anime_choices : questions[currentQuestionIndex].manga_choices;
    const areAllChoicesValid = choices.every((choice) => validChoices.map(c => c.toLowerCase()).includes(choice) && choice !== "");

    let maxChoicesAllowed = 3;
    if (currentQuestionIndex === 3) {
      maxChoicesAllowed = 2; //limit to 2 choices for authors/studios question
    }

    if (choices.length >= 1 && choices.length <= maxChoicesAllowed && areAllChoicesValid) {
      previousAnswers[currentQuestionIndex] = answerInput.value;
      //modified this for the answers thing
      if (currentQuestionIndex === 1) {
        answers.genres = choices;
      } else if (currentQuestionIndex === 2) {
        answers.themes = choices;
      } else if (currentQuestionIndex === 3) {
        answers.producers = choices;
      }
      currentQuestionIndex++;
      displayQuestion();
    } else {
      let errorMsg = "";
      const invalidChoiceIndexes = choices.reduce((acc, choice, index) => {
        if (!validChoices.map(c => c.toLowerCase()).includes(choice) || choice === "") {
          acc.push(index + 1);
        }
        return acc;
      }, []);

      if (invalidChoiceIndexes.length > 0) {
        errorMsg = `Input${invalidChoiceIndexes.length > 1 ? "s" : ""} #${invalidChoiceIndexes.join(", ")} ${
          invalidChoiceIndexes.length > 1 ? "are" : "is"
        } invalid.`;
      } else if (choices.length > maxChoicesAllowed) {
        errorMsg = `Please select up to ${maxChoicesAllowed} choices only.`;
      }
      errorMessage.textContent = errorMsg;
    }
  } else if (currentQuestionIndex === 4) {
    const answer = answerInput.value.trim();
    const yearPattern = /^(\d{4})-(\d{4})$/;
    const match = answer.match(yearPattern);

    if (match) {
      const startYear = parseInt(match[1]);
      const endYear = parseInt(match[2]);

      if (startYear <= endYear && startYear > 1900 && endYear <= new Date().getFullYear()) {
        previousAnswers[currentQuestionIndex] = answer;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          console.log(answers);
        }
        console.log('Years are valid, nice!');
      } else {
        errorMessage.textContent = "Invalid year range. Please enter a valid year range (e.g., 2008-2010).";
      }
    } else {
      errorMessage.textContent = "Invalid input. Please use the format YYYY-YYYY (e.g. 2008-2010).";
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