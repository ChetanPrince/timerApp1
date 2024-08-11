const button = document.querySelector(".startQuiz");
button.addEventListener("click", ()=>{


    const containers = document.querySelectorAll(".container");
    containers.forEach(container=>{

        container.classList.toggle("hide");
    })
    const button = document.querySelector(".startQuiz");
    if(button.innerText === "Start Quiz"){
        button.innerText = "Next";
    }
    else{
        button.innerText = "Start Quiz";
    }
  
    
})