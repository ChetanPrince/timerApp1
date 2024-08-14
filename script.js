let timeToWaitInSeconds;
function counter(initialTime) {
    timeToWaitInSeconds = initialTime;
    function countdown() {
        const timerElement = document.querySelector(".timerElement");
        timerElement.textContent = `Timer: ${timeToWaitInSeconds}`;
        timeToWaitInSeconds -= 1;
        if (timeToWaitInSeconds >= 0) {
            setTimeout(countdown, 1000);
        } else {
            timerElement.innerHTML = `<p>Time is Up kindly restart the quiz.<p> <br><button onClick="window.location.reload()">Restart</button>`;
            const nextButtons = document.querySelectorAll(".next, .submit");
            nextButtons.forEach(nextButton => {
                nextButton.disabled = true;
            });
        }
    }
    setTimeout(countdown, 1000);
    return timeToWaitInSeconds;
}

const button = document.querySelector(".startQuiz");
button.addEventListener("click", () => {
    counter(80);
    const containers = document.querySelectorAll(".container");
    containers.forEach(container => {
        container.classList.toggle("hide");
        if (!container.classList.contains("hide")) {
            if (!container.querySelector(".next")) {
                container.innerHTML += `<button class="submit" onClick="submit()">Submit</button><button class="next" onClick="next()">Next</button>`;
            }
        }
    });
    button.classList.add("hide");
});

function next() {
    const questions = document.querySelectorAll(".questions");
    let currentQuestionIndex = -1;
    const nextButtons = document.querySelectorAll(".next, .submit");
    questions.forEach((question, index) => {
        if (!question.classList.contains("hide")) {
            currentQuestionIndex = index;
            question.classList.add("hide");
        }});
    let nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove("hide");
    } else {
 nextButtons.forEach(nextButton => {
            nextButton.classList.add("hide");
        });
        const output = document.querySelector(".output");
        output.innerHTML = `<p>${timeToWaitInSeconds}</p>`;

    }}

function submit() {
    const questions = document.querySelectorAll(".questions");
    let currentQuestionIndex = -1;

    questions.forEach((question, index) => {
        if (!question.classList.contains("hide")) {
            currentQuestionIndex = index;
            const answerElement = question.querySelector("select");
            const answerValue = answerElement.value;
            const correctAnswerElement = question.querySelector("p");
            const correctAnswer = correctAnswerElement.textContent.trim().split(": ")[1];

            const output = document.querySelector(".output");
            if (answerValue === correctAnswer) {
                output.innerHTML = `<h3>You have selected the right Answer</h3>`;
            } else {
                output.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
                timeToWaitInSeconds -= 10;
            }
            setTimeout(() => {
                output.textContent ="";
            }, 5000);
        }
        
    });
}
