var canvas2 = document.getElementById("hangmanCanvas");
var cxt = canvas2.getContext("2d");

cxt.font = "20px Turret Road";
cxt.textAlign = "center";
cxt.fillText(defi, canvas2.width / 2, 20);

// draw default setup
var midPoint = window.innerWidth * 0.8 / 2;
cxt.moveTo(425, 350);
cxt.lineTo(525, 350);
cxt.lineTo(525, 375);
cxt.lineTo(425, 375);
cxt.lineTo(425, 350);
cxt.moveTo(460, 350);
cxt.lineTo(460, 75);
cxt.moveTo(480, 350);
cxt.lineTo(480, 95);
cxt.lineTo(650, 95);
cxt.moveTo(460, 75);
cxt.lineTo(650, 75);
cxt.lineTo(650, 125); // where the hook is
cxt.moveTo(460, 135);
cxt.lineTo(520, 75);
cxt.lineTo(530, 85);
cxt.lineTo(470, 145);
cxt.lineTo(460, 135);
cxt.stroke();

cxt.fillStyle = "#000000";
var chanceLeft = 8;
var curScore = getScore();

cxt.font = "25px Turret Road";
cxt.fillText("You still got:", 150, 125);
cxt.fillText(chanceLeft + " chance", 225, 175);
cxt.fillText("Total Score: " + curScore, 150, 250); // display of score

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function() {
    localStorage.clear();
    cxt.clearRect(40, 225, 250, 50);
    curScore = 0;
    cxt.fillText("Total Score: " + curScore, 150, 250);
}