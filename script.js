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

const MAP_REVEAL_DATE = "2026-10-24T00:00:00-04:00";
const HUNT_START_DATE = "2026-10-31T00:00:00-04:00";
const FIRST_LIGHT_DATE = "2026-10-31T07:19:00-04:00";


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

/* =====================================================
   HUNT TIMING
===================================================== */

const mapRevealTime =
    new Date(MAP_REVEAL_DATE).getTime();

const huntStartTime =
    new Date(HUNT_START_DATE).getTime();

const firstLightTime =
    new Date(FIRST_LIGHT_DATE).getTime();


/* Page elements */

const mapCard =
    document.querySelector(".map-card");

const huntStatus =
    document.getElementById("huntStatus");

const preHuntMessage =
    document.getElementById("preHuntMessage");

const preHuntText =
    document.getElementById("preHuntText");

const preHuntCountdown =
    document.getElementById("preHuntCountdown");

const firstLightMessage =
    document.getElementById("firstLightMessage");

const clueCard =
    document.getElementById("clueCard");

const progressSection =
    document.querySelector(".progress-section");


/* Hide things initially */

mapCard.classList.add("hidden");

clueCard.classList.add("hidden");

progressSection.classList.add("hidden");

firstLightMessage.classList.add("hidden");


/* =====================================================
   FORMAT COUNTDOWN
===================================================== */

function updateNumber(element, value) {

    element.textContent =
        String(Math.max(0, value)).padStart(2, "0");

}


/* =====================================================
   PRE-HUNT COUNTDOWN
===================================================== */

function updateHuntTiming() {

    const now =
        new Date().getTime();


    /* ---------------------------------------------
       STAGE 1
       Before October 24
    --------------------------------------------- */

    if (now < mapRevealTime) {

        mapCard.classList.add("hidden");

        clueCard.classList.add("hidden");

        progressSection.classList.add("hidden");

        preHuntMessage.classList.remove("hidden");

        firstLightMessage.classList.add("hidden");


        const difference =
            huntStartTime - now;


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) % 24
            );


        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        updateNumber(
            document.getElementById("statusDays"),
            days
        );

        updateNumber(
            document.getElementById("statusHours"),
            hours
        );

        updateNumber(
            document.getElementById("statusMinutes"),
            minutes
        );

        updateNumber(
            document.getElementById("statusSeconds"),
            seconds
        );


        preHuntText.textContent =
            "The hunt area will be revealed on October 24.";

        return;
    }


    /* ---------------------------------------------
       STAGE 2
       October 24 through October 30
    --------------------------------------------- */

    if (now < huntStartTime) {

        mapCard.classList.remove("hidden");

        clueCard.classList.add("hidden");

        progressSection.classList.add("hidden");

        preHuntMessage.classList.remove("hidden");

        firstLightMessage.classList.add("hidden");


        preHuntText.textContent =
            "The hunt area is now revealed. The clues will appear at midnight on Halloween.";


        const difference =
            huntStartTime - now;


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) % 24
            );


        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        updateNumber(
            document.getElementById("statusDays"),
            days
        );

        updateNumber(
            document.getElementById("statusHours"),
            hours
        );

        updateNumber(
            document.getElementById("statusMinutes"),
            minutes
        );

        updateNumber(
            document.getElementById("statusSeconds"),
            seconds
        );


        return;
    }


    /* ---------------------------------------------
       STAGE 3
       Midnight October 31 until first light
    --------------------------------------------- */

    if (now < firstLightTime) {

        mapCard.classList.remove("hidden");

        clueCard.classList.remove("hidden");

        progressSection.classList.remove("hidden");

        preHuntMessage.classList.add("hidden");

        firstLightMessage.classList.remove("hidden");

       answerInput.disabled = true;

checkAnswer.disabled = true;

answerInput.placeholder =
    "The hunt begins at first light...";


        const difference =
            firstLightTime - now;


        const hours =
            Math.floor(
                difference /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        updateNumber(
            document.getElementById("lightHours"),
            hours
        );

        updateNumber(
            document.getElementById("lightMinutes"),
            minutes
        );

        updateNumber(
            document.getElementById("lightSeconds"),
            seconds
        );


        return;
    }


    /* ---------------------------------------------
       STAGE 4
       First light — hunt is active
    --------------------------------------------- */

    mapCard.classList.remove("hidden");

    clueCard.classList.remove("hidden");

    progressSection.classList.remove("hidden");

   answerInput.disabled = false;

checkAnswer.disabled = false;

answerInput.placeholder =
    "Enter your answer...";
   
    huntStatus.classList.add("hidden");

}


/* Start timing */

updateHuntTiming();

setInterval(updateHuntTiming, 1000);

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

const now = new Date().getTime();

if (now >= firstLightTime) {

    checkAnswer.disabled = false;
    answerInput.disabled = false;

    answerInput.placeholder =
        "Enter your answer...";

    answerInput.focus();

} else {

    checkAnswer.disabled = true;
    answerInput.disabled = true;

    answerInput.placeholder =
        "The hunt begins at first light...";

}
    

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
