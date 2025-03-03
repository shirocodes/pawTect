
let presentQuizposition = 0; //current QP points
const allQuestions = 0;  //questions in the array
let watchPoints = 0; //monitoring the LP points
document.addEventListener('DOMContentLoaded', function(){
    startTest();
});

function startTest() {
    //Test array for the quiz
    const quizList = [
        {
            quiz: "The night of March 2025 witnessed a 6% rally of Bitcoin What was the cause?",
            answers: [
                {text: "Trump's statement on a US Bitcoin reserve", isCorrect: true},
                {text: "A cyberattack on the Bybit exchange", isCorrect: false},
                {text: "The decline on Ethereum's price", isCorrect: false}
            ]
        },
        {
            quiz: "Which coin was highly influeced by Trump's US reserve statement on March 2, 2025?",
            answers: [
                {text: "Doge", isCorrect: false},
                {text: "Cardano", isCorrect: true},
                {text: "Tesla", isCorrect: false}
            ]
        },
        {
            quiz: "As of March 2, 2025, what was Bitcoin's price?",
            answers: [
                {text: "$120,098", isCorrect: false},
                {text: "$93,986", isCorrect: true},
                {text: "$67,767", isCorrect: false}
            ]
        }];
    //listening on an event on quiz card
    const quizBtn = document.querySelector('.quiz-card .list-of-quizzes');
    quizBtn.addEventListener('click', () => {
        showQuiz('.quiz-card', quizList);
    });

    //listen for LP coin
    const watchArea = document.querySelector('.learn-card .watch-links');
    watchArea.addEventListener('click', () => {
        //send the user to a tutorial
        window.open('https://www.youtube.com/watch?v=G75NZPlTxmk', '_blank');
        //after clicking, user receives points
        watchPoints +=600;

        const watchResult = document.querySelector('#LP-points');
        watchResult.textContent = `${watchPoints} LP`;
    })
    //dealing with the nav bar click on leaderboard
    const leaderBoard = document.querySelector('.nav-one');
    leaderBoard.addEventListener('click', () => {
        alert('Join a crypto community to become a pawTected member!');
    });

}

     //Deal with the main section's user activity
//create element to show the quiz
function showQuiz (sectionClass, questions) {
    const section = document.querySelector(sectionClass);
    const showOutput = section.querySelector('#QP-points');
    let presentScore = parseInt(showOutput.textContent) || 0;


    //if there is another test, delete it, and create a section to hold quiz
    const activeQuizsection = section.querySelector('.quizSection');
    if (activeQuizsection) {
        activeQuizsection.remove();
    }
    const quizSection = document.createElement('div');
    quizSection.classList.add('quizSection');

    const testOfQuiz = document.createElement('p'); //holds the text
    testOfQuiz.classList.add('text-quiz');
    quizSection.appendChild(testOfQuiz);

    const optionsHolder = document.createElement('div'); //holds the answers' options
    optionsHolder.classList.add('options');
    quizSection.appendChild(optionsHolder);

    const repeatBtn = document.createElement('button');  //incase the user fails
    repeatBtn.classList.add('repeat');
    repeatBtn.textContent = 'Next';
    repeatBtn.style.display = 'none';
    quizSection.appendChild(repeatBtn);

    section.appendChild(quizSection);

     //user receives a quiz
    const quizInfo = questions[presentQuizposition];
    testOfQuiz.textContent = quizInfo.quiz;

     //checking if the quiz is over  
     if (presentQuizposition === allQuestions -1){
        repeatBtn.textContent = "You made it, bye!"
        repeatBtn.addEventListener('click', () => {
            quizSection.remove();
            const validate = document.querySelector('.quiz-card .list-of-quizzes');
            validate.disabled = true;
            validate.style.opacity = '0.8';
        });
    } else {
        repeatBtn.textContent = 'Next';
        repeatBtn.addEventListener('click', () =>{
            quizSection.remove();
            presentQuizposition++;
        }); 
    }

    quizInfo.answers.forEach(answers => {  //allow choices on the questions
        const ansOption = document.createElement('button');
        ansOption.classList.add('thisIsanOption');
        ansOption.textContent = answers.text;
        ansOption.dataset["correct"] = answers.isCorrect;
        optionsHolder.appendChild(ansOption);

        //capturing the user's choice
        ansOption.addEventListener('click', function handleAction () {
            const allChoices = optionsHolder.querySelectorAll('.thisIsanOption');
            allChoices.forEach(opt => opt.removeEventListener('click', handleAction));

            const correctChoice = answers.isCorrect === true;
            if (correctChoice) {
                ansOption.style.backgroundColor = '#0b6623'
            } else {
                ansOption.style.backgroundColor = '#441601'
            }

            const bringScore = correctChoice ? 1000 : -200;
            presentScore = Math.max(0, presentScore + bringScore);

            showOutput.textContent = presentScore;
            showOutput.classList.add('recreated');

            //allowing another choice
            repeatBtn.style.display = 'block';
        });
        optionsHolder.appendChild(ansOption);
    });
}

