const button = document.querySelector(".startQuiz");
button.addEventListener("click", ()=>{
    const containers = document.querySelectorAll(".container");
    containers.forEach(container=>{
        container.classList.toggle("hide");
        if(container.classList != "hide"){
            if (!container.querySelector(".next")) {
                container.innerHTML += `<button class="submit" onClick="submit()">Submit</button><button class="next" onClick="next()">Next</button>`;
            } } });
   button.classList.add("hide");
});

function next() {
    const questions = document.querySelectorAll(".questions"); 
    let currentQuestionIndex = -1;
    // Find the currently visible question
    questions.forEach((question, index) => {
        if (!question.classList.contains("hide")) {
            currentQuestionIndex = index;
            question.classList.add("hide");
        } });
    // Determine the index of the next question
    let nextQuestionIndex = currentQuestionIndex + 1;
    // If we are at the last question, hide the .next button and stop
    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove("hide");
    } else {
        const nextButtons = document.querySelectorAll(".next, .submit");
        nextButtons.forEach(nextButton => {
            nextButton.classList.add("hide");
        }); }}

function submit() {
    const questions = document.querySelectorAll(".questions");
    let currentQuestionIndex = -1;

    questions.forEach((question, index)=>{
        if(!question.classList.contains("hide")){
            currentQuestionIndex = index;
            const answerElement = question.querySelector("select");
            const answerValue = answerElement.value;
            console.log(answerValue);

            const correctAnswerElement = question.querySelector("p");
            const correctAnswer = correctAnswerElement.textContent.trim().split(": ")[1];
            console.log(correctAnswer);
            // const main = document.querySelector(".main");
            const output = document.querySelector(".output");
            if(answerValue === correctAnswer){
                output.innerHTML = `<h3>You have selected the right Answer</h3>`;
            }else{
                // const output = document.querySelector(".output");
                output.textContent = `${correctAnswerElement.textContent}`;
            }
        }
    });
}