// SETTER FOR CELLS
function setCell(column, row, color) {
    column--;
    row--;
    if (color == "red") {
        $("#row" + row + "column" + column).css("background-color", "red");
        return "Cell (" + (column + 1) + "," + (row + 1) + ") set to red.";
    } else if (color == "yellow") {
        $("#row" + row + "column" + column).css("background-color", "yellow");
        return "Cell (" + (column + 1) + "," + (row + 1) + ") set to yellow.";
    } else if (color == "empty") {
        $("#row" + row + "column" + column).css("background-color", "white");
        return "Cell (" + (column + 1) + "," + (row + 1) + ") set to empty.";
    }
}

// GETTER FOR CELLS
function getCell(column, row) {
    column--;
    row--;
    var color = $("#row" + row + "column" + column).css("background-color");
    switch (color) {
        case "rgb(255, 255, 255)":
            return 'empty';
        case "rgb(255, 255, 0)":
            return 'yellow';
        case "rgb(255, 0, 0)":
            return 'red';
        default:
            return color;
    }

}

function isEmpty(column, row) { if (getCell(column, row) == 'empty') { return true } else { return false; } }

function doTurn() {
    var dropColumn = Math.floor(Math.random() * 7); // random number from 0 to 6
    var coinPlaced = false;
    for (var i = 0; i < 7; i++) {
        if (!isEmpty(dropColumn, i + 1)) {
            setCell(dropColumn, i, currentTurn);
            coinPlaced = true;
            break;
        }
    }
    if (!coinPlaced) {
        setCell(dropColumn, 7, currentTurn);
        coinPlaced = true;
    }
    if (currentTurn == 'red') {
        currentTurn = 'yellow';
    } else if (currentTurn == 'yellow') {
        currentTurn = 'red';
    }
}

var currentTurn = 'red';

for (var i = 0; i < 7; i++) {
    $("#board").append("<tr id='row" + i + "'>");
    for (var k = 0; k < 7; k++) {
        $("#row" + i).append("<td id='row" + i + "column" + k + "'>");
        $("#row" + i + "column" + k).css('background-color', 'white');
    }
}