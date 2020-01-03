var canvas = document.getElementById("mainCanvas");
var c = canvas.getContext("2d");


// Calculate pixel length of the answer
var pixLength = 20; //read first letter
var countToCorrect = 1;
for (i = 1; i < answer.length; i++) {
    var letter = answer.charAt(i);
    if (letter != " " && letter != "-") {
        countToCorrect++;
    }
    pixLength += (20 + 28); //one word (20 px) and one space (28 px)
}
var startP = canvas.width / 2 - pixLength / 2;

// Display underlines properly 
var pointer = startP;
c.beginPath();
for (i = 0; i < answer.length; i++) {
    var letter = answer.charAt(i);
    if (letter !== " " && letter !== "-") {
        c.moveTo(pointer, 50);
        c.lineTo(pointer + 20, 50);
        c.stroke();
    } else {
        c.font = "40px Courier new";
        c.fillText(letter, pointer, 50);
    }
    pointer += 48; //total px (word 20px + small space 28px)
}

// Handles inputs via key pressing. Passes to executeInput()
function keypressButton(key) {
    event.preventDefault(); //prevent browser from refreshing page when button is clicked
    document.getElementById(key).disabled = true;
    keypressClickHelper(key);
}

// Handles inputs via button clicking. Passes to executeInput()
function clickButton() {
    event.preventDefault(); //prevent browser from refreshing page when button is clicked
    document.getElementById(this.id).disabled = true;
    // document.getElementById(this.id).style.background = "#d3d3d3";
    keypressClickHelper(this.id);
}

// Helper method for keypressButton(key) and clickButton()
function keypressClickHelper(tmp) {
    var diff = tmp.charCodeAt(0) - "A".charCodeAt(0);
    if (isKeyPressed[diff] === false) {
        isKeyPressed[diff] = true;
        document.getElementById(tmp).style.background = "#6bcbdf";
        document.getElementById(tmp).style.color = "#ffffff";
        executeInput(tmp);
    }
}

// Handles inputs from keypressButton(key) or clickButton(). Processes letters and show correct guesses.
// Keeps counts of chances. Handles both cases if user guesses the word correctly or not.
// Passes to updateChance().
function executeInput(letterInput) {
    var scanPoint = startP;
    c.font = "40px Courier new";
    
    var isCorrectNum = 0;
    for (i = 0; i < answer.length; i++) {
        var letter = answer.charAt(i);
        
        if (letter === letterInput) {
            c.fillText(letter, scanPoint, 40);
            countToCorrect--;
            isCorrectNum++;
        }
        scanPoint += 48;
    }

    if (isCorrectNum === 0) {
        chanceLeft--;
    } else if (countToCorrect === 0) {
        // WIN CONDITION
        changeScore(true);
        document.getElementById("answerLine").innerHTML = "You got it! The answer was ";
        addWordLink();
        for (i = 0; i < 26; i++) {
            isKeyPressed[i] = true;
        }
        modal.style.display = "block";
    }
    updateChance();
}

function addWordLink() {
    var anchor = document.createElement("A");
    anchor.setAttribute("href", "http://www.google.com/search?q=" + answer.toLowerCase() + "+meaning");
    anchor.setAttribute("target", "_blank");
    anchor.innerHTML = answer;
    anchor.style.color = "black";
    document.getElementById("answerLine").appendChild(anchor);
}

function getScore() {
    var curScore = localStorage.getItem('scoreID');
    if (!curScore) {
        curScore = 0;
    }
    return curScore;
}

// method that keeps track of score counting
function changeScore(isAdd) {
    curScore = +curScore;
    if (isAdd) {
        curScore += 10;
    } else if (!isAdd) {
        curScore -= 10;
    }
    localStorage.setItem('scoreID', curScore);
}

//  Update chances, changes visuals, and deals with drawing hangman based on chances count.
function updateChance() {
    cxt.clearRect(150, 150, 150, 50);
    if (chanceLeft > 0) {
        cxt.fillText(chanceLeft + " chance", 225, 175);
    } else if (chanceLeft === 0) {
        // LOSE CONDITION
        changeScore(false);
        // document.getElementById("answerLine").innerHTML = "You lost! The word was " + answer;
        // document.getElementById("link").href = "www.google.com/search?q=" + answer + "+meaning";
        document.getElementById("answerLine").innerHTML = "You lost! The word was ";
        addWordLink();
        for (i = 0; i < 26; i++) {
            isKeyPressed[i] = true;
        }
        modal.style.display = "block";
        
    }

    cxt.beginPath();
    if (chanceLeft === 7) {
        cxt.arc(650, 155, 30, 0, 2 * Math.PI);
    } else if (chanceLeft === 6) {
        cxt.moveTo(650, 185); //+75
        cxt.lineTo(650, 275);
    } else if (chanceLeft === 5) {
        cxt.moveTo(650, 205);
        cxt.lineTo(620, 235);
        cxt.lineTo(620, 265);
    } else if (chanceLeft === 4) {
        cxt.moveTo(650, 205);
        cxt.lineTo(680, 235);
        cxt.lineTo(680, 265);
    } else if (chanceLeft === 3) {
        cxt.moveTo(650, 275);
        cxt.lineTo(630, 335);
        cxt.lineTo(615, 333);
    } else if (chanceLeft === 2) {
        cxt.moveTo(650, 275);
        cxt.lineTo(670, 335);
        cxt.lineTo(685, 333);
    } else if (chanceLeft === 1) {
        cxt.arc(640, 148, 2, 0, 2 * Math.PI);
        cxt.moveTo(660, 148);
        cxt.arc(660, 148, 2, 0, 2 * Math.PI);
    } else if (chanceLeft === 0) {
        cxt.arc(650, 180, 10, 5 / 4 * Math.PI, 7 / 4 * Math.PI);
    }
    cxt.stroke();

    if (chanceLeft === 0 || countToCorrect === 0) {
        cxt.clearRect(205, 225, 50, 50);
        cxt.clearRect(615, 124, 70, 220); // clear hangman
    }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    location.reload(true);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload(true);
    }
}