# Auto-Connect-4
Plays Connect 4.

The computer decides for each turn what column to drop the coin into. This decision is completetly random and is accomplished by having the computer pick a number from 1 to 7. I don't know why I made this program, but it was a fun and challenging project anyway.

## Utilities
### Drop Coin
The **Drop Coin** button simply executes the coin dropping function once, and drops one coin on the board.

### Autofill
The **Autofill** button fills in the entire board at once.

### Pulse Fill
The **Pulse Fill** feature can be toggled using the "Turn Off Pulse Fill" or "Turn On Pulse Fill" buttons. Pulse fill will drop 1 coin on the board every specified amount of time. The default time is 1.2 seconds. When pulse fill is active, a number input will appear below the buttons. The number in this input controls how often coins will drop, in seconds. After you change the number and take focus off of the input, the pulse fill will immedietly change to the new time input.

## Dev Functions
There are many commands that can be typed into the console to change the backend. These commands are used internally by the game, so things may break if you use them.

The backend code relies heavily on a coordinate system. The `x` and `y` parameters in most functions refer to the coordinate position of the cell, with (`1`,`1`) being the top left cell, and (`7`,`6`) being the bottom right cell.

### `setCell(x,y,color)`
Using this command will set a cell at the coorindate location of (`x`,`y`) on the board to the specifed color.  The acceptable parameters for the `color` argument are `red`, `yellow`, or `empty`.

### `getCell(x,y)`
Using this command will get the current state of the cell at the coordinate location (`x`,`y`) on the board. The possible return states are `red`, `yellow`, or `empty`.

### `setWin(x,y)`
This command will trigger the win animation for a coin at the coordinate position (`x`,`y`). This function is used in the backend to trigger the animation for the coins that won, that is, that were 4 in a row. To be clear, this function *does not* trigger the end of the game, it only triggers the animation for the given coin.

### `declareLoss()`
This function will stop the game and put a message in the console explaining that you lost the game. This function is intended for if the entire board is filled with coins, and four in a row has not been achieved. However, this function has not yet been properly implemented, as during test, a loss never occured.

### `declareWin()`
This function will stop the game, hide the utility buttons, and show the win text. It will update the team name with the current turn color, and adds the number of turns to the win text. This function is run when four in a row is found, and will trigger a win. However, it does not trigger any animations: `setWin(x,y)` does that.

### `doTurn()`
This is the function that is run when the **Drop Coin** button is pressed. This function is run as many times as possible, until a solution is found, when the **Autofill** button is pressed. This function is run repeatedly when **Pulse Drop** is enabled.

### `checkWin(x,y)`
This function checks to see if the coin placed, represented by (`x`,`y`), is part of a four in a row sequence. The logic and functions behind this are very complicated, and should only be operated by the backend. If you are curious however, you can see the full function in the sources menu of inspecter. This function returns a list of cell positions, represented as `[x,y]`, that represent cells that are part of a four in a row sequence. If there is no four in a row found, then an empty list is returned. This function is used in the backend every time a coin is placed to see if it has made a line of four and won the game.

### `onTimerSpeedChange()`
This function is run whenever the value of the pulse fill speed input is updated. This can be manually run as well to forcefully get the value of the input and update the pulse fill. Running this function will start the pulse fill, as during normal use, the pulse fill would have to be started for the function to be run.

### `autofill()`
This functoin is run by the **Autofill** button. It is basically a `while` loop that runs `doTurn()` until `gameRunning` becomes `false`. This results in an almost instantanious filling of the board.

### `toggleTimedFill()`
This function is run whenever "Turn On Pulse Fill" or "Turn Off Pulse Fill" is clicked.

### `reset()`
This function is run when the "Go Again" button is pressed. It clears the board, starts the game clock, and sets variables to their default values.

## Dev Variables
These variables control various aspects of the game. Changing them will likely break the game, but feel free to play around with them and see what they do.

### `currentTurn`
This variable is used to store what color coin should be placed, and if a coin is placed and it wins, what color team has won. Every time a coin is placed, specifically, during the `doTurn()` function, this variable alternates between `red` and `yellow`. The default starting state is `red`.

### `gameRunning`
This variable is used by internal functions to decide whether or not to run when triggered. The default value for this variable is `true`, and it is set to `false` by the `declareWin()` and `declareLoss()` functions. Setting this variable to `false` manually will render the onscreen buttons useless, as the `doTurn()` function will not run unless this variable is set to `true`. On the other hand, setting this variable to `true` after the game is over will allow you to use functions like `doTurn()` in the console.

### `redCoinTexture` and `yellowCoinTexture`
These two variables are used to store the url of the textures for the red and yellow coins. Changing these variables to say, a web address, will cause any new coins to have a different texture.

### `turns`
This variable keeps track of how many times a coin has been placed on the board. It is incremented every time `doTurn()` finishes successfully. The variable is only really used for the win screen, where the number of turns in the game are displayed. It's starting value is `0`.

### `timerRunning`
This variable is used to keep track of the state of the timer. This variable is consulted when `toggleTimedFill()` is run, deciding what buttons to hide and show, and whether to start or clear the timer. Changing this variable does not effect the timer until it is updated using `toggleTimedFill()`. It's default value is `false`.

### `currentClock`
This variable is used to store how fast the pulse fill should be in milleseconds. Changing this variable will not affect anything, as it will be overwritten by anything that would cause the timer to update.