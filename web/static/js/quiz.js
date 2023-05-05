function indaQuiz() {
  const questions = [
    {
      question: "Would you like an anime or a manga?",
      choices: ["anime", "manga"],
    },
    {
      question: "What genres r u interested in? Select up to three, separating each by a comma",
      anime_choices: ["Gourmet", "Comedy", "Sports", "Action"],
      manga_choices: ["Mystery", "Adventure", "Drama", "Romance"],
    },
  ];

  let currentQuestionIndex = 0;
  let previousAnswers = ["", ""];
  let selectedOption = "";
  const typing = document.getElementById("typing");
  const errorMessage = document.getElementById("error-message");
  const answerInput = document.getElementById("answer");
  const backButton = document.getElementById("back");
  const nextButton = document.getElementById("next");
  const skipButton = document.getElementById("skip");

  backButton.addEventListener("click", goBack);
  nextButton.addEventListener("click", goNext);
  skipButton.addEventListener("click", goSkip);

  function displayQuestion(question) {
    typing.innerHTML = "";
    errorMessage.textContent = "";
    answerInput.value = previousAnswers[currentQuestionIndex];
    const letters = question.split("");
    addBlinkingCursor();
    for (let i = 0; i < letters.length; i++) {
      setTimeout(function () {
        removeBlinkingCursor();
        typing.textContent += letters[i];
        addBlinkingCursor();
      }, i * 100);
    }
  }
  /*typing effect*/
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
        console.log("Valid genres selected. cont.");
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
/*makes sure html loads b4 js*/
document.addEventListener("DOMContentLoaded", function () {
  indaQuiz();
});
