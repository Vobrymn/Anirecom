
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


  const questions = [
    {
      question: "Would you like an anime or a manga?",
      choices: ["anime", "manga"]
    },
    {
        question: "Are there any genres you're interested in? (Select up to three)",
        choices: ["Action","Adventure","Drama","Comedy"]
      
    },
    {
        question: "Are there any themes you're interested in? (Select up to three)",
        choices: ["test11", "test21", "test31", "tst41", "doodoo11", "dod1", "do1"]
    },
    
    {
        question: "",
        anime_question: "Are there any particular studios you'd like to look up?",
        manga_question: "Any particular authors you'd like to look up?",
        anime_choices: ["studio1", "studio2", "studio3", "studio4", "studio5", "studio6"],
        manga_choices: ["author1", "author2", "author3", "author4", "author5", "author6"]
    },

    {
        question: "Are there any year preferences? (YYYY-YYYY)",
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
    content_type: "",
    genres: [],
    themes: [],
    producers: [],
    dates: ""
  };

  backButton.addEventListener("click", goBack);
  nextButton.addEventListener("click", goNext);
  skipButton.addEventListener("click", goSkip);

  let timeoutIds = []; 

  function displayQuestion() {
    let question;
    var validChoices

    if (currentQuestionIndex === 0){
        question = questions[currentQuestionIndex].question;
        backButton.disabled = true;
        backButton.style.display = "none";
        backButton.style.cursor = "default"
  
        skipButton.disabled = true;
        skipButton.style.display = "block";
        skipButton.style.cursor = "default"
    }
    else{
      backButton.disabled = false;
      backButton.style.display = "block";
      backButton.style.cursor = "pointer"

      skipButton.disabled = false;
      skipButton.style.display = "none";
      skipButton.style.cursor = "pointer"
    }

    if (currentQuestionIndex === 1){
      validChoices = questions[currentQuestionIndex].choices
      autocomplete(answerInput, validChoices);
      question = questions[currentQuestionIndex].question;
    }
    else if (currentQuestionIndex === 2){
      validChoices = questions[currentQuestionIndex].choices
      autocomplete(answerInput, validChoices);
      question = questions[currentQuestionIndex].question;
    }
    else if (currentQuestionIndex === 3){
      question = selectedOption === "anime" ? questions[currentQuestionIndex].anime_question : questions[currentQuestionIndex].manga_question;
      validChoices = selectedOption === "anime" ? questions[currentQuestionIndex].anime_choices : questions[currentQuestionIndex].manga_choices;
      autocomplete(answerInput, validChoices);
    }
    if (currentQuestionIndex === 4){
      question = questions[currentQuestionIndex].question;
      skipButton.style.display = "none"
      nextButton.innerHTML = "Submit"
    }
    else{
      skipButton.style.display = "block"
      nextButton.innerHTML = "Next"
    }
    
    typing.innerHTML = "";
    errorMessage.textContent = "default";
    errorMessage.style.opacity = 0
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
            content_type: "",
            genres: [],
            themes: [],
            producers: [],
            dates: ""
          };
        }
        
        previousAnswers[currentQuestionIndex] = answer;
        answers.content_type = answer;
        currentQuestionIndex++;
        displayQuestion();

      //autocomplete
      if (currentQuestionIndex === 1) {
        const validGenres = questions[1].choices
        autocomplete(answerInput, validGenres);
      }
    } else {
      errorMessage.textContent = "Invalid answer. Please choose either 'anime' or 'manga'.";
      errorMessage.style.opacity = 1
    }
  } else if (currentQuestionIndex >= 1 && currentQuestionIndex <= 3) {
      const choices = answerInput.value.split(",").map((choice) => choice.trim().toLowerCase());
      var validChoices
      if (currentQuestionIndex === 3){
        validChoices = selectedOption === "anime" ? questions[currentQuestionIndex].anime_choices : questions[currentQuestionIndex].manga_choices;
      }
      else{
        validChoices = questions[currentQuestionIndex].choices
      }
      
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
        errorMessage.style.opacity = 1
      }
  } else if (currentQuestionIndex === 4) {
    const answer = answerInput.value.trim();
    const yearPattern = /^(\d{4})-(\d{4})$/;
    const match = answer.match(yearPattern);

      if (!answer){

          submit()
      }
      else if (match) {
        const startYear = parseInt(match[1]);
        const endYear = parseInt(match[2]);

        if (startYear <= endYear && startYear > 1900 && endYear <= new Date().getFullYear()) {

          answers.dates = [startYear,endYear]

          submit()
          
        } 
        else {
          errorMessage.textContent = "Invalid year range. Please enter a valid year range (e.g., 2008-2010).";
          errorMessage.style.opacity = 1
        }
      } 
      else {
        
          errorMessage.textContent = "Invalid input. Please use the format YYYY-YYYY (e.g. 2008-2010).";
          errorMessage.style.opacity = 1
      }
  }
}

  function goSkip() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(questions[currentQuestionIndex].question);
    }

  }

  async function submit(){

    const formData = new FormData();
    formData.append('query', JSON.stringify(answers));

    const response = await fetch('/quiz', {
      method: 'POST',
      body: formData
    });

    var url = `/suggestions?content_type=${encodeURIComponent(answers.content_type)}&genres=${encodeURIComponent(JSON.stringify(answers.genres))}&themes=${encodeURIComponent(JSON.stringify(answers.themes))}&producers=${encodeURIComponent(JSON.stringify(answers.producers))}&dates=${encodeURIComponent(answers.dates)}`;

    window.location.href = url;
  }
  

  displayQuestion(questions[currentQuestionIndex].question);