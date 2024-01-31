
let rightScore = 0;
let wrongScore = 0;
const chaptersURL = "https://opentdb.com/api_category.php";
let chapterList = document.querySelector("#chapterList");
let questionContainer = document.querySelector("#questionTab");
const nextButton = document.querySelector(".btn-primary");
const rightanswer = document.querySelector("#right-Answer");
const wronganswer = document.querySelector("#wrong-Answer");
let selectedChapter;
let currentQuestionIndex = 0;
let questions = [];


const getChapters = async () => {
    try {
        let response = await fetch(chaptersURL);
        let chapterData = await response.json();
        let chapters = chapterData.trivia_categories;
        displayChapters(chapters);

        if (chapters.length > 0) {
            selectChapter(chapters[0].id);
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Data Not Found");
        } else {
            console.log(error);
        }
    }
};


const displayChapters = (chapters) => {
    chapterList.innerHTML = chapters.map(chapter => `
        <li class="nav-item">
            <a class="nav-link" 
               id="chapter${chapter.id}-tab" 
               data-bs-toggle="pill" 
               href="#chapter${chapter.id}" 
               onclick="selectChapter(${chapter.id})"
            >
                ${chapter.name}
            </a>
        </li>
    `).join('');
};

const selectChapter = (chapterId) => {
    if (selectedChapter) {
        const previousChapterTab = document.querySelector(`#chapter${selectedChapter}-tab`);
        previousChapterTab.style.backgroundColor = '#ebdada47';
    }
    selectedChapter = chapterId;
    currentQuestionIndex = 0;
    rightScore = 0; // Reset right score
    wrongScore = 0; // Reset wrong score
    rightanswer.innerHTML =`Right Answer = ${rightScore}`;
    wronganswer.innerHTML =`Wrong Answer = ${wrongScore}`;
    getNextQuestion();
    nextButton.disabled = false;
    const currentChapterTab = document.querySelector(`#chapter${selectedChapter}-tab`);
    currentChapterTab.style.backgroundColor = 'lightblue';
};

const getNextQuestion = async () => {
    if (!selectedChapter) {
        showAlert("Please select a chapter first");
        return;
    }
    try {
        let response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedChapter}&difficulty=easy&type=multiple`);

        let data = await response.json();

        if (!data.results) {
            console.log("No results found in the data");
            return;
        }

        questions = data.results.map(result => {
            let options = [...result.incorrect_answers, result.correct_answer];
            options = options.sort(() => Math.random() - 0.5);

            return {
                question: result.question,
                options: options,
                correctAnswer: result.correct_answer
            };
        });

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            showAlert("End of questions. Please select another chapter.");
            currentQuestionIndex = 0;
            nextButton.disabled = true;
        }
    } catch (error) {
        console.log("Error Fetching Data:", error);
    }
};


const displayQuestion = (ques) => {
    let quesHTML = `<p>${ques.question}</p>`;
    quesHTML += "<form>";
    ques.options.forEach((option, index) => {
        quesHTML += `<label><input type="checkbox" id="option_${index}" value="${option}" onchange="autoCheckAnswer(this)"> ${option}</label><br>`;
    });
    quesHTML += "<div id='feedback'></div>";
    quesHTML += "</form>";
    questionContainer.innerHTML = quesHTML;
};

const autoCheckAnswer = (checkbox) => {
    let selectedoptions = document.querySelectorAll("input[type='checkbox']:checked")
    let userAnswer = Array.from(selectedoptions).map(option => option.value);
    let feedback = document.getElementById("feedback");
    if (arraysEqual(userAnswer, [questions[currentQuestionIndex].correctAnswer])) {
        feedback.innerHTML = "Correct! You Choose The Right Answer.";
        selectedoptions.forEach(option => {
            rightScore++;
            rightanswer.innerHTML =`Right Answer = ${rightScore}`;
            option.parentElement.style.backgroundColor = "green";
            option.parentElement.style.color = "white";
            option.parentElement.style.padding = "5px 12px";
            option.parentElement.style.borderRadius = "5px";
        });
    } else {
        feedback.innerHTML = `Wrong! The Correct Answer is: ${questions[currentQuestionIndex].correctAnswer}`;
        selectedoptions.forEach(option => {
            wrongScore++;
            wronganswer.innerHTML =`Wrong Answer = ${wrongScore}`;
            option.parentElement.style.backgroundColor = "red";
            option.parentElement.style.color = "white";
            option.parentElement.style.padding = "5px 12px";
            option.parentElement.style.borderRadius = "5px";
        });
    }
};

const arraysEqual = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

const showAlert = (message) => {
    let modal = new bootstrap.Modal(document.getElementById('alertModal'));
    document.getElementById('alertMessage').textContent = message;
    modal.show();
}

nextButton.addEventListener("click", () => {
    let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedCheckboxes.length === 0) {
        showAlert("Please select at least one answer before clicking next button");
        return;
    }
    getNextQuestion();
});

window.addEventListener("load", getChapters);


// isro spacecraft details fetching here

const spaceCraftURL = "https://isro.vercel.app/api/spacecrafts";
let spaceCraftList = document.querySelector("#spacecraft");

const getSpaceCraftList = async () => {
    try {
        let response = await fetch(spaceCraftURL);
        let spaCecraftData = await response.json();
        // console.log("API Response:", spaCecraftData);
        let craft = spaCecraftData.spacecrafts;
        displaySpaceCraftlist(craft);
    } catch (error) {
        console.log("Error fetching or processing data:", error.message);
    }
};

const displaySpaceCraftlist = (spacecrafts) => {
    spaceCraftList.innerHTML = spacecrafts.map(spacecraft => `
        <li class="nav-item">
            <a class="nav-link"
               id="spacecraft${spacecraft.id}-tab"
               data-bs-toggle="pill"
               href="#spacecraft${spacecraft.id}"
               onclick="selectSpacecraft(${spacecraft.id})"
            >
                ${spacecraft.name}
            </a>
        </li>
    `).join('');
};

window.addEventListener("load", getSpaceCraftList);

