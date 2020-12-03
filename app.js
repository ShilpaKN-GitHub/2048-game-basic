document.addEventListener("DOMContentLoaded", () =>
{
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("result");
    const width = 4;

    let squares = [];
    let score = 0;

    // Create a playing board.
    function createBoard()
    {
        for(let i = 0; i < (width * width); i++)
        {
            let square = document.createElement("div");
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // Generate a number randomly.
    function generate()
    {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML === "0")
        {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        }
        else
        {
            generate();
        }
    }

    // Swipe the number right.
    function swipeRight()
    {
        for(let i = 0; i < (width * width); i++)
        {
            if( i % width === 0 )
            {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(number => number);
                let missing = width - filteredRow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = zeroes.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe the number left.
    function swipeLeft()
    {
        for(let i = 0; i < (width * width); i++)
        {
            if( i % width === 0 )
            {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(number => number);
                let missing = width - filteredRow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeroes);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe the number down.
    function swipeDown()
    {
        for (var i = 0; i < width; i++)
        {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(number => number);
            let missing = width - filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = zeroes.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    // Swipe the number up.
    function swipeUp()
    {
        for (var i = 0; i < width; i++)
        {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(number => number);
            let missing = width - filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeroes);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    // Combine same numbers in a row together.
    function combineRow()
    {
        for(let i = 0; i < (width * width) - 1; i++)
        {
            if(squares[i].innerHTML === squares[i + 1].innerHTML)
            {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Combine same numbers in a column together.
    function combineColumn()
    {
        for(let i = 0; i < (width * 3); i++)
        {
            if(squares[i].innerHTML === squares[i + width].innerHTML)
            {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Assign the key-codes.
    function control(e)
    {
        // Move right.
        if(e.keyCode === 39)
        {
            keyRight();
        }

        // Move left.
        if(e.keyCode === 37)
        {
            keyLeft();
        }

        // Move down.
        if(e.keyCode === 40)
        {
            keyDown();
        }

        // Move up.
        if(e.keyCode === 38)
        {
            keyUp();
        }
    }

    document.addEventListener("keyup", control);

    // Press Right Arrow.
    function keyRight()
    {
        swipeRight();
        combineRow();
        swipeRight();
        generate();
    }

    // Press Left Arrow.
    function keyLeft()
    {
        swipeLeft();
        combineRow();
        swipeLeft();
        generate();
    }

    // Press Down Arrow.
    function keyDown()
    {
        swipeDown();
        combineColumn();
        swipeDown();
        generate();
    }

    // Press Up Arrow.
    function keyUp()
    {
        swipeUp();
        combineColumn();
        swipeUp();
        generate();
    }

    // Check for number 2048 in the squares to win.
    function checkForWin()
    {
        for (var i = 0; i < squares.length; i++)
        {
            if(squares[i].innerHTML === "2048")
            {
                resultDisplay.innerHTML = "You Win!";
                document.removeEventListener("keyup", control);
            }
        }
    }

    // Check if there are no zeroes on the board to lose.
    function checkForGameOver()
    {
        let zeroes = 0;
        for (var i = 0; i < squares.length; i++)
        {
            if(squares[i].innerHTML === "0")
            {
                zeroes++;
            }
        }
        if(zeroes === 0)
        {
            resultDisplay.innerHTML = "You Lose!";
            document.removeEventListener("keyup", control);
        }
    }
});