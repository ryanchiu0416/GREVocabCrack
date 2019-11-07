var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D",
"F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var isKeyPressed = new Array(26).fill(false); // track whether keys are being clicked
var controlForm = document.getElementById("controlForm");

for (i = 0; i < 26; i++) {
    var btn = document.createElement("BUTTON");
    btn.id = letters[i]; //give id
    btn.addEventListener("click", clickButton); //link to 'clickButton' function
    btn.innerHTML = letters[i];
    btn.style.fontFamily = "Turret Road";
    // btn.style.background = "#6bcbdf";
    btn.style.color = "#6bcbdf";
    btn.style.border = "thin solid #6bcbdf";

    if (i === 10 || i === 19) {
        document.write("<br/>");
    }
    controlForm.appendChild(btn);
}

document.addEventListener("keypress", function(e) {
    var code = e.which || e.keyCode;
    var isVisible = document.getElementById("myModal").style.display === "block";

    if ( isVisible && code === 13) {
        modal.style.display = "none";
        location.reload(true);
    } else {
        var key  = String.fromCharCode(code).toUpperCase();
        keypressButton(key);
    }
});


