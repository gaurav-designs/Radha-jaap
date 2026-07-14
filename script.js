let count = Number(localStorage.getItem("jaapCount")) || 0;
let mala = Number(localStorage.getItem("malaCount")) || 0;
let goal = Number(localStorage.getItem("dailyGoal")) || 108;

let today = new Date().toDateString();

let history = JSON.parse(localStorage.getItem("history")) || {};


// Elements

const countDisplay = document.getElementById("count");
const malaDisplay = document.getElementById("malaCount");
const dailyGoal = document.getElementById("dailyGoal");
const lifetimeDisplay = document.getElementById("lifetime");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const todayDate = document.getElementById("todayDate");
const todayJaap = document.getElementById("todayJaap");


if(!history[today]){
    history[today] = 0;
}


// Update Screen

function updateScreen(){

    countDisplay.innerHTML = count;

    malaDisplay.innerHTML = mala + " / 108";

    dailyGoal.innerHTML = count + " / " + goal;

    lifetimeDisplay.innerHTML = count;

    todayDate.innerHTML = today;

    todayJaap.innerHTML = "Aaj ka Jaap: " + history[today];


    let percent = Math.floor((count / goal) * 100);


    if(percent > 100){
        percent = 100;
    }


    progressBar.style.width = percent + "%";

    progressText.innerHTML = percent + "%";

}


updateScreen();



// Jaap Button

document.getElementById("jaapBtn").addEventListener("click", function () {

    const music = document.getElementById("bgMusic");

    if (music && music.paused) {
        music.play().catch(() => {});
    }

    count++;
    mala++;

    if (mala >= 108) {
        mala = 0;
    }

    history[today]++;

    localStorage.setItem("jaapCount", count);
    localStorage.setItem("malaCount", mala);
    localStorage.setItem("history", JSON.stringify(history));

    updateScreen();

    if (navigator.vibrate) {
        navigator.vibrate(40);
    }

});




// Goal Button

document.getElementById("setGoal").addEventListener("click",function(){


    let input = document.getElementById("goalInput").value;


    if(input > 0){

        goal = Number(input);

        localStorage.setItem("dailyGoal",goal);

        updateScreen();

    }


});




// Notes

let notes = document.getElementById("notes");

let saveNotes = document.getElementById("saveNotes");


notes.value = localStorage.getItem("myNotes") || "";


saveNotes.addEventListener("click",function(){


    localStorage.setItem("myNotes",notes.value);


    alert("📝 Notes Saved");


});




// Reset

function resetApp(){

    localStorage.clear();

    location.reload();

}
