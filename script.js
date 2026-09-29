/* =====================================================
   HALLOWEEN TREASURE HUNT
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

/*
   The countdown ends at midnight on Halloween.

   You can change this later if you want.
*/

const HALLOWEEN_DATE = "2026-10-31T00:00:00";


/* =====================================================
   YOUR CLUES
===================================================== */

/*
   This is the part you will eventually edit.

   Each clue has:

   title    = name of the clue
   text     = the actual clue
   answers  = all acceptable answers
   success  = information revealed after solving it
*/

const clues = [

    {
        title: "The Beginning",

        text:
            "Your first clue goes here. Replace this text with your actual clue.",

        answers: [
            "covered bridge",
            "the covered bridge"
        ],

        success:
            "Excellent! You solved the first clue. Your next clue awaits..."
    },


    {
        title: "The Second Clue",

        text:
            "Replace this with your second clue.",

        answers: [
            "old oak"
        ],

        success:
            "You are on the right track. Continue your hunt..."
    },


    {
        title: "The Final Clue",

        text:
            "Replace this with your final clue.",

        answers: [
            "pumpkin"
        ],

        success:
            "You've solved the final clue. Congratulations!"
    }

];


/* =====================================================
   GAME STATE
===================================================== */

const STORAGE_KEY =
    "lincolntonHalloweenHuntProgress";

let currentClue = 0;

let clueSolved = false;


/* =====================================================
   FIND PAGE ELEMENTS
===================================================== */

const clueProgress =
    document.getElementById("clueProgress");

const progressFill =
    document.getElementById("progressFill");

const currentClueNumber =
    document.getElementById("currentClueNumber");

const clueTitle =
    document.getElementById("clueTitle");

const clueText =
    document.getElementById("clueText");

const answerInput =
    document.getElementById("answerInput");

const checkAnswer =
    document.getElementById("checkAnswer");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextClueArea =
    document.getElementById("nextClueArea");

const successText =
    document.getElementById("successText");

const nextClueButton =
    document.getElementById("nextClue");

const resetButton =
    document.getElementById("resetProgress");

const music =
    document.getElementById("music");

const musicToggle =
    document.getElementById("musicToggle");


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const target =
        new Date(HALLOWEEN_DATE).getTime();

    const now =
        new Date().getTime();

    const difference =
        target - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   LOAD SAVED PROGRESS
===================================================== */

function loadProgress() {

    const saved =
        localStorage.getItem(STORAGE_KEY);


    if (saved !== null) {

        currentClue =
            parseInt(saved, 10);

    }


    if (
        Number.isNaN(currentClue) ||
        currentClue < 0 ||
        currentClue >= clues.length
    ) {

        currentClue = 0;

    }


    loadClue();
}


/* =====================================================
   SAVE PROGRESS
===================================================== */

function saveProgress() {

    localStorage.setItem(
        STORAGE_KEY,
        currentClue.toString()
    );

}


/* =====================================================
   NORMALIZE ANSWERS
===================================================== */

function normalizeAnswer(answer) {

    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


/* =====================================================
   LOAD CURRENT CLUE
===================================================== */

function loadClue() {

    const clue =
        clues[currentClue];


    clueSolved = false;


    currentClueNumber.textContent =
        currentClue + 1;


    clueProgress.textContent =
        `Clue ${currentClue + 1} of ${clues.length}`;


    const percentage =
        (currentClue / clues.length) * 100;


    progressFill.style.width =
        `${percentage}%`;


    clueTitle.textContent =
        clue.title;


    clueText.textContent =
        clue.text;


    answerInput.value = "";


    answerFeedback.textContent =
        "";


    answerFeedback.className =
        "answer-feedback";


    nextClueArea.classList.add("hidden");


    checkAnswer.disabled = false;

    answerInput.disabled = false;


    answerInput.focus();

}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkCurrentAnswer() {

    if (clueSolved) {
        return;
    }


    const userAnswer =
        normalizeAnswer(answerInput.value);


    if (!userAnswer) {

        answerFeedback.textContent =
            "Enter an answer first.";

        answerFeedback.className =
            "answer-feedback incorrect";

        return;
    }


    const acceptedAnswers =
        clues[currentClue].answers.map(
            normalizeAnswer
        );


    const correct =
        acceptedAnswers.includes(userAnswer);


    if (correct) {

        solveClue();

    } else {

        answerFeedback.textContent =
            "Not quite. Keep looking...";

        answerFeedback.className =
            "answer-feedback incorrect";

    }

}


/* =====================================================
   SOLVE CLUE
===================================================== */

function solveClue() {

    clueSolved = true;


    answerFeedback.textContent =
        "Correct!";


    answerFeedback.className =
        "answer-feedback correct";


    checkAnswer.disabled = true;

    answerInput.disabled = true;


    successText.textContent =
        clues[currentClue].success;


    nextClueArea.classList.remove("hidden");


    /*
       Save the next clue so that if the player
       closes the website, they resume here.
    */

    if (currentClue < clues.length - 1) {

        localStorage.setItem(
            STORAGE_KEY,
            (currentClue + 1).toString()
        );

    } else {

        localStorage.setItem(
            STORAGE_KEY,
            currentClue.toString()
        );

    }

}


/* =====================================================
   NEXT CLUE
===================================================== */

function goToNextClue() {

    if (
        currentClue >= clues.length - 1
    ) {

        showFinishedMessage();

        return;

    }


    currentClue++;

    saveProgress();

    loadClue();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   FINISHED
===================================================== */

function showFinishedMessage() {

    clueTitle.textContent =
        "🎃 Hunt Complete!";


    clueText.textContent =
        "You've solved every clue. Congratulations!";


    answerInput.style.display =
        "none";


    checkAnswer.style.display =
        "none";


    nextClueArea.classList.add("hidden");


    progressFill.style.width =
        "100%";


    clueProgress.textContent =
        `All ${clues.length} clues solved!`;

}


/* =====================================================
   RESET PROGRESS
===================================================== */

function resetProgress() {

    const confirmed =
        confirm(
            "Are you sure you want to reset your hunt progress?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(STORAGE_KEY);


    currentClue = 0;


    answerInput.style.display =
        "";


    checkAnswer.style.display =
        "";


    loadClue();

}


/* =====================================================
   MUSIC PLAYER
===================================================== */

musicToggle.addEventListener(
    "click",
    async function () {

        if (music.paused) {

            try {

                await music.play();

                musicToggle.textContent =
                    "⏸ Pause Music";

            } catch (error) {

                console.log(
                    "Music could not be played.",
                    error
                );

            }

        } else {

            music.pause();

            musicToggle.textContent =
                "▶ Play Music";

        }

    }
);


/* =====================================================
   BUTTONS
===================================================== */

checkAnswer.addEventListener(
    "click",
    checkCurrentAnswer
);


nextClueButton.addEventListener(
    "click",
    goToNextClue
);


resetButton.addEventListener(
    "click",
    resetProgress
);


/* =====================================================
   ENTER KEY
===================================================== */

answerInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkCurrentAnswer();

        }

    }
);


/* =====================================================
   START
===================================================== */

loadProgress();
