var canvas = document.getElementById("mainCanvas");
var c = canvas.getContext("2d");


// Calculate pixel length of the answer
var pixLength = 20; //read first letter
var countToCorrect = 1;
for (i = 1; i < answer.length; i++) {
    var letter = answer.charAt(i);
    
    pixLength += (20 + 28); //one word (20 px) and one space (28 px)
    countToCorrect++;
}
var startP = canvas.width / 2 - pixLength / 2;

// Display underlines properly 
var pointer = startP;
c.beginPath();
for (i = 0; i < answer.length; i++) {
    var letter = answer.charAt(i);

    c.moveTo(pointer, 50);
    c.lineTo(pointer + 20, 50);
    c.stroke();
    pointer += 48; //total px (word + small space)
}


function keypressButton(key) {
    event.preventDefault(); //prevent browser from refreshing page when button is clicked
    document.getElementById(key).disabled = true;


    // have to figure out how to lock down keys, not just the buttons shown on the screen!
    executeInput(key);
}

function clickButton() {
    event.preventDefault(); //prevent browser from refreshing page when button is clicked
    document.getElementById(this.id).disabled = true;
    executeInput(this.id);
}

function executeInput(letterInput) {
    var scanPoint = startP;
    c.font = "40px Courier new";
    
    var isCorrectNum = 0;
    for (i = 0; i < answer.length; i++) {
        var letter = answer.charAt(i);
        
        if (letter == letterInput) {
            c.fillText(letter, scanPoint, 40);
            countToCorrect--;
            isCorrectNum++;
        }
        scanPoint += 48;
    }

    if (isCorrectNum == 0) {
        chanceLeft--;
    } else if (countToCorrect == 0) {
        changeScore(true);
        
        alert("Congrats! Answer is "+ answer);
    }
    updateChance();
}


function changeScore(isAdd) {
    curScore = +curScore;
    if (isAdd) {
        curScore += 10;
    } else if (!isAdd) {
        curScore-=10;
    }
    localStorage.setItem('scoreID', curScore);
}


function updateChance() {
    cxt.clearRect(150, 150, 150, 50);
    if (chanceLeft > 0) {
        cxt.fillText(chanceLeft + " chance", 225, 175);
    } else if (chanceLeft == 0) {
        changeScore(false);
        alert("You lost! The answer is " + answer);
    }


    cxt.beginPath();
    if (chanceLeft == 7) {
        cxt.arc(650, 155, 30, 0, 2 * Math.PI);
    } else if (chanceLeft == 6) {
        cxt.moveTo(650, 185); //+75
        cxt.lineTo(650, 275);
    } else if (chanceLeft == 5) {
        cxt.moveTo(650, 205);
        cxt.lineTo(620, 235);
        cxt.lineTo(620, 265);
    } else if (chanceLeft == 4) {
        cxt.moveTo(650, 205);
        cxt.lineTo(680, 235);
        cxt.lineTo(680, 265);
    } else if (chanceLeft == 3) {
        cxt.moveTo(650, 275);
        cxt.lineTo(630, 335);
        cxt.lineTo(615, 333);
    } else if (chanceLeft == 2) {
        cxt.moveTo(650, 275);
        cxt.lineTo(670, 335);
        cxt.lineTo(685, 333);
    } else if (chanceLeft == 1) {
        cxt.arc(640, 148, 2, 0, 2 * Math.PI);
        cxt.moveTo(660, 148);
        cxt.arc(660, 148, 2, 0, 2 * Math.PI);
    } else if (chanceLeft == 0) {
        cxt.arc(650, 180, 10, 5 / 4 * Math.PI, 7 / 4 * Math.PI);
    }
    cxt.stroke();

    if (chanceLeft == 0 || countToCorrect == 0) {
        cxt.clearRect(205, 225, 50, 50);
        cxt.fillText('Total Score: ' + curScore, 150, 250);

        cxt.clearRect(615, 124, 70, 220);
        location.reload(true);
    }
}