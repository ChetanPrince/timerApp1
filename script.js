let timeToWaitInSeconds;
let remainingTime;
let timerInterval;

function counter(initialTime) {
    timeToWaitInSeconds = initialTime;

    function countdown() {
        const timerElement = document.querySelector(".timerElement");
        timerElement.textContent = `Timer: ${timeToWaitInSeconds}`;
        timeToWaitInSeconds -= 1;

        if (timeToWaitInSeconds >= 0) {
            timerInterval = setTimeout(countdown, 1000);
        } else {
            timerElement.innerHTML = `<p>Time is Up! Kindly restart the quiz.</p> <br><button onClick="window.location.reload()">Restart</button>`;
            const nextButtons = document.querySelectorAll(".next, .submit");
            nextButtons.forEach(nextButton => {
                nextButton.disabled = true;
            });
        }
    }

    timerInterval = setTimeout(countdown, 1000);
    return timeToWaitInSeconds;
}

const button = document.querySelector(".startQuiz");
button.addEventListener("click", () => {
    counter(80);
    const containers = document.querySelectorAll(".container");
    containers.forEach((container, index) => {
        if (index === 1) { // Show the first question
            container.classList.remove("hide");
        } else {
            container.classList.add("hide");
        }

        if (!container.classList.contains("hide") && !container.querySelector(".next")) {
            container.innerHTML += `<button class="submit" onClick="submit()">Submit</button><button class="next hide" onClick="next()">Next</button>`;
        }
    });

    button.classList.add("hide");
});

function next() {
    const questions = document.querySelectorAll(".questions");
    let currentQuestionIndex = -1;

    questions.forEach((question, index) => {
        if (!question.classList.contains("hide")) {
            currentQuestionIndex = index;
            question.classList.add("hide");
            const nextButtons = document.querySelectorAll(".next");
            nextButtons.forEach(nextButton => {
                nextButton.classList.toggle("hide");
            });
        }
    });

    let nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove("hide");
    } else {
        clearTimeout(timerInterval); // Stop the timer
        remainingTime = timeToWaitInSeconds; // Store the remaining time

        const output = document.querySelector(".output");
        output.innerHTML = `<p>Your score: ${remainingTime} seconds</p>`;

        const nextButtons = document.querySelectorAll(".next, .submit");
        nextButtons.forEach(nextButton => {
            nextButton.classList.add("hide");
        });

        const name = prompt("Enter your name to save your score:");
        if (name) {
            saveScore(name, remainingTime);
            const timerElement = document.querySelector(".timerElement");
        timerElement.textContent = `Timer:`;
        }

        output.innerHTML += `<button class="reset" onClick="window.location.reload()">Reset</button>`;
    }
}

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

            const feedbackElement = document.createElement("div");
            feedbackElement.className = "feedback";

            if (answerValue === correctAnswer) {
                feedbackElement.innerHTML = `<h3>You have selected the right answer!</h3>`;
            } else {
                feedbackElement.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
                timeToWaitInSeconds -= 10;
            }

            // Append feedback to the output, and only remove the feedback after 5 seconds
            const output = document.querySelector(".output");
            output.appendChild(feedbackElement);

            setTimeout(() => {
                feedbackElement.remove(); // Only remove the feedback, not the whole output content
            }, 5000);
        }
        const nextButtons = document.querySelectorAll(".next");
        nextButtons.forEach(nextButton=>{

            nextButton.classList.toggle("hide");
        })
    });
}

function saveScore(name, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

document.querySelector(".highScore").addEventListener("click", () => {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const sortedScores = highScores.sort((a, b) => b.score - a.score);
    const topScores = sortedScores.slice(0, 5); // Display top 5 scores

    let scoreList = "<h2>High Scores:</h2>";
    topScores.forEach(score => {
        scoreList += `<p>${score.name}: ${score.score} seconds</p>`;
    });

    const output = document.querySelector(".output");
    output.innerHTML = scoreList;
    output.innerHTML += `<button class="reset" onClick="window.location.reload()">Reset</button>`
    const timerElement = document.querySelector(".timerElement");
        timerElement.textContent = `Timer: `;
});
