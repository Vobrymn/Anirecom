/*stole this off w3schools. like i modified it to be ours though, like excluding already typed in answers etc*/
function autocomplete(inp, arr) {
  let currentFocus;

  function inputEventListener(e) {
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
        b.addEventListener("click", clickEventListener);
        a.appendChild(b);
      }
    }
  }

  function keydownEventListener(e) {
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
  }

  function clickEventListener(e) {
    const tag_clicked = this.getElementsByTagName("input")[0].value;
    const input_tags = inp.value.split(',');
    input_tags[input_tags.length - 1] = tag_clicked;
    inp.value = input_tags.join(', ').trim();
    closeAllLists();
  }

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

  function documentClickListener(e) {
    closeAllLists(e.target);

    
  }

  function disableAutocomplete(input) {
    input.removeEventListener("input", inputEventListener);
    input.removeEventListener("keydown", keydownEventListener);
  }

  inp.addEventListener("input", inputEventListener);
  inp.addEventListener("keydown", keydownEventListener);
  document.addEventListener("click", documentClickListener);

  return { disableAutocomplete: disableAutocomplete }
  ;
}



  //[genre],[theme],[producer]


  const questions = [
    {
      question: "Would you like an anime or a manga?",
      choices: ["anime", "manga"]
    },
    {
        question: "Are there any genres you're interested in?",
        choices: Array.from(valid_tags[0])
      
    },
    {
        question: "Are there any themes you're interested in?",
        choices: Array.from(valid_tags[1])
      
    },
    
    {
        question: "",
        anime_question: "Are there any particular studios you'd like to look up?",
        manga_question: "Any specific authors you'd like to look up?",
        anime_choices: Array.from(valid_tags[2]),
        manga_choices: Array.from(valid_tags[3])  
    },

    {
        question: "What about a specific date range?",
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
  let input_ac;

  function displayQuestion() {

    let question;
    var validChoices

    if (currentQuestionIndex === 0){


      if (input_ac){
        input_ac.disableAutocomplete(answerInput)
      }
  
      question = questions[currentQuestionIndex].question;
      $("#suggest").hide()
      $("#back").hide()
      $("#skip").hide()
      $("#answer").attr("placeholder", "Anime | Manga")
      $(".background").attr("src", "/images/anime_manga_bg.png");
    }

    else if (currentQuestionIndex === 1){

      console.log(input_ac)
      if (input_ac){
        input_ac.disableAutocomplete(answerInput)
      }

      validChoices = questions[currentQuestionIndex].choices
      input_ac = autocomplete(answerInput, validChoices);

      question = questions[currentQuestionIndex].question;
      $("#suggest").show()
      $("#back").show()
      $("#skip").show()
      $("#next").text("next")
      $("#answer").attr("placeholder", "___, ___, ___ | choose up to 3")
      $(".background").attr("src", "/images/genre_bg.png");
    }
    else if (currentQuestionIndex === 2){

      if (input_ac){
        input_ac.disableAutocomplete(answerInput)
      }

      validChoices = questions[currentQuestionIndex].choices
      input_ac = autocomplete(answerInput, validChoices);
      
      question = questions[currentQuestionIndex].question;
      $("#back").show()
      $("#skip").show()
      $("#next").text("next")
      $("#answer").attr("placeholder", "___, ___, ___ | choose up to 3")
      $(".background").attr("src", "/images/theme_bg.png");
    }
    else if (currentQuestionIndex === 3){

      if (input_ac){
        input_ac.disableAutocomplete(answerInput)
      }

      question = selectedOption === "anime" ? questions[currentQuestionIndex].anime_question : questions[currentQuestionIndex].manga_question;
      validChoices = selectedOption === "anime" ? questions[currentQuestionIndex].anime_choices : questions[currentQuestionIndex].manga_choices;
      input_ac = autocomplete(answerInput, validChoices);
      $("#back").show()
      $("#skip").show()
      $("#next").text("next")
      $("#answer").attr("placeholder", "___, ___ | choose up to 2")
      $(".background").attr("src", "/images/author_director_bg.png");
    }
    else if (currentQuestionIndex === 4){

      if (input_ac){
        input_ac.disableAutocomplete(answerInput)
      }
      
      question = questions[currentQuestionIndex].question;
      $("#suggest").hide()
      $("#skip").hide()
      $("#next").text("submit")
      $("#answer").attr("placeholder", "YYYY-YYYY")
      $(".background").attr("src", "/images/year_bg.png");
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

      } 
      else {
        errorMessage.textContent = "Invalid answer. Please choose either 'anime' or 'manga'.";
        errorMessage.style.opacity = 1
      }
    } 
    else if (currentQuestionIndex >= 1 && currentQuestionIndex <= 3) {
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
      } 
      else {
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
    } 
    else if (currentQuestionIndex === 4) {
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

    $.ajax({
      url: '/quiz',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function() {
        var url = `/suggestions?content_type=${encodeURIComponent(answers.content_type)}&genres=${encodeURIComponent(JSON.stringify(answers.genres))}&themes=${encodeURIComponent(JSON.stringify(answers.themes))}&producers=${encodeURIComponent(JSON.stringify(answers.producers))}&dates=${encodeURIComponent(answers.dates)}`;
        window.location.href = url;
      },
      error: function(xhr, textStatus, error) {
      }
    });
  }

$(document).ready(function () {
    $("#question_container").css("display", "flex")
    $("#question_container").hide()
    $("#question_container").fadeIn(500)
    setTimeout(() => {
      displayQuestion(questions[currentQuestionIndex].question);  
    }, 500);   
})
  
