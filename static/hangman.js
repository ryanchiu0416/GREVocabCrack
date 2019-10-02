var canvas2 = document.getElementById("hangmanCanvas");
var cxt = canvas2.getContext("2d");

cxt.font = "20px Turret Road";
cxt.textAlign = "center";
cxt.fillText(defi, 0.8 * window.innerWidth / 2, 20);

// draw default setup
var midPoint = window.innerWidth * 0.8 / 2;
cxt.moveTo(425, 350); //275
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
cxt.fillStyle = "#FFFFFF";
cxt.fillRect(150, 150, 150, 50);
cxt.fillRect(615, 124, 70, 220);
cxt.fillRect(205, 225, 50, 50);
cxt.fillStyle = "#000000";

var chanceLeft = 8;

var curScore = localStorage.getItem('scoreID');
if (!curScore) {
    curScore = 0;
}

cxt.font = "25px Turret Road";
cxt.fillText("You still got:", 150, 125);
cxt.fillText(chanceLeft + " chance", 225, 175);

cxt.fillText("Total Score: " + curScore, 150, 250); // display of score