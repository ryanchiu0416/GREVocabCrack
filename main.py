from flask import Flask, render_template
from random import *

app = Flask(__name__)

@app.route("/")
def index():
    input = open("greWordList.txt", "r")
    wordList = input.readlines()

    randNum = randrange(805)
    lineChosen = wordList[randNum]

    line = lineChosen.split(" - ")
    answer = line[0]
    defi = line[1][:-1]
    
    return render_template("index.html", answer = answer, defi = defi)


if __name__ == "__main__":
    app.run(debug=True)