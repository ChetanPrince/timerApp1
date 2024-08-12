const button = document.querySelector(".startQuiz");
button.addEventListener("click", ()=>{


    const containers = document.querySelectorAll(".container");
    containers.forEach(container=>{

        container.classList.toggle("hide");
        if(container.classList != "hide"){

            if (!container.querySelector(".next")) {
                container.innerHTML += `<button class="next" onClick="next()">Next</button>`;
            }
        }
    });
   button.classList.add("hide");

});

function next() {
    const questions = document.querySelectorAll(".questions");
    
    let currentQuestionIndex = -1;

    // Find the currently visible question
    questions.forEach((question, index) => {
        if (!question.classList.contains("hide")) {
            currentQuestionIndex = index;
            question.classList.add("hide"); // Hide the current question
        }
    });

    // Determine the index of the next question
    let nextQuestionIndex = currentQuestionIndex + 1;

    // If we are at the last question, hide the .next button and stop
    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove("hide");
    } else {
        const nextButtons = document.querySelectorAll(".next");
        nextButtons.forEach(nextButton => {
            nextButton.classList.add("hide");
        });
}}
