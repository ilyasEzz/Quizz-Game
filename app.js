// DOM Elements
const questionTitle = document.querySelector("#question-title");
const answersList = document.querySelector("#answers-list");
const answerBtn = document.querySelector("#answer-btn");
const nextBtn = document.querySelector("#next-btn");


// Variables
let questions, currentQuestion, questionsCount;
let score = 0;

// Event Listeners
answerBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);

// Functions
const init = async () => {
    const res = await fetch('questions.json');
    const data = await res.json();
    questions = data.questions;
    currentQuestion = 0
    questionsCount = questions.length;
    displayQestions(questions[currentQuestion]);

}

function displayQestions(q) {
    questionTitle.textContent = q.title;

    q.answers.forEach(el => {
        let li = createHTML("li", "list-group-item custom-control custom-radio");
        let input = createHTML("input", "custom-control-input answer");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "answer");
        input.setAttribute("value", el.id);
        input.setAttribute("id", `customRadio${el.id}`)


        let label = createHTML("label", "custom-control-label");
        label.setAttribute("for", `customRadio${el.id}`)
        label.appendChild(document.createTextNode(el.answer));
        li.appendChild(input);
        li.appendChild(label);
        answersList.appendChild(li);
    });

    document.querySelector('.answer').checked = true;
}


function createHTML(el, className) {
    let element = document.createElement(el);
    element.className = className;
    return element;
}

function submitAnswer() {
    const correctAnswer = questions[currentQuestion].correct;
    const answers = document.querySelectorAll('.answer');

    for (const answer of answers) {
        if (answer.checked && answer.value == correctAnswer) {
            answer.parentNode.classList.add("bg-success");
            score++;
        }
        else if (answer.checked && answer.value != correctAnswer) {
            answer.parentNode.classList.add("bg-danger");
        }
        answer.disabled = true;
    }
    currentQuestion++;

    nextBtn.classList.remove("hide");
    this.classList.add("hide");
}

function nextQuestion() {
    answersList.innerHTML = '';

    const answers = document.querySelectorAll('.answer');
    for (const answer of answers) {
        answer.disabled = false
    }

    answerBtn.classList.remove("hide");
    this.classList.add("hide");

    if (currentQuestion === questionsCount) {
        finishedTest()
        return;
    }

    displayQestions(questions[currentQuestion]);
    return questions[currentQuestion];
}

function finishedTest() {
    answerBtn.classList.add("hide");
    questionTitle.remove();
    const scorePercent = ((score / questionsCount) * 100).toFixed(2)

    answersList.innerHTML = `<strong>Final Score ${scorePercent} % <strong>`;
    return scorePercent;
}

init();