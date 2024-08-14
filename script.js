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
            container.innerHTML += `<button class="submit" onClick="submit()">Submit</button><button class="next" onClick="next()">Next</button>`;
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
        }
    });

    let nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove("hide");
    } else {
        const nextButtons = document.querySelectorAll(".next, .submit");
        nextButtons.forEach(nextButton => {
            nextButton.classList.add("hide");
        });

        const output = document.querySelector(".output");
        output.innerHTML = `<p>Your remaining time: ${remainingTime} seconds</p>`;
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

            const output = document.querySelector(".output");

            if (answerValue === correctAnswer) {
                output.innerHTML = `<h3>You have selected the right answer!</h3>`;
            } else {
                output.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
                timeToWaitInSeconds -= 10;
            }

            setTimeout(() => {
                output.textContent = "";
            }, 5000);

            // If it's the last question, stop the timer
            if (currentQuestionIndex === questions.length - 1) {
                clearTimeout(timerInterval); // Stop the timer
                remainingTime = timeToWaitInSeconds; // Store the remaining time
                const nextButtons = document.querySelectorAll(".next, .submit");
                nextButtons.forEach(nextButton => {
                    nextButton.classList.add("hide");
                });

                const output = document.querySelector(".output");
                output.innerHTML = `<p>Your remaining time: ${remainingTime} seconds</p>`;
            }
        }
    });
}
