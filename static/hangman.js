var canvas2 = document.getElementById("hangmanCanvas");
var cxt = canvas2.getContext("2d");

cxt.font = "20px Turret Road";
cxt.textAlign = "center";
cxt.fillText(defi, canvas2.width / 2, 20);

// draw default setup
var midPoint = window.innerWidth * 0.8 / 2;
cxt.moveTo(650, 75);
cxt.lineTo(650, 125); // where the hook is
cxt.stroke();

cxt.fillStyle = "#765c48";
cxt.fillRect(460, 75, 20, 275);
cxt.fillRect(460, 75, 190, 20);
cxt.fillStyle = "#5e4a3a";
cxt.fillRect(425, 350, 100 ,25);
cxt.rotate(-0.8);
cxt.fillRect(225, 420, 80, 15);
cxt.rotate(0.8);

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