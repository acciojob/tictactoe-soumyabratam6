//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function () {
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    startGame(player1, player2);
});

function startGame(player1, player2) {
     let currentPlayer = capitalizeFirstLetter(player1);
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    const messageDiv = document.querySelector(".message");
    messageDiv.textContent = `${currentPlayer}, you're up!`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", function () {
            if (!gameActive || this.textContent !== "") return;

            const cellIndex = parseInt(this.id) - 1;
            board[cellIndex] = currentSymbol;
            this.textContent = currentSymbol;

            if (checkWinner(board, currentSymbol)) {
                messageDiv.textContent = `${currentPlayer} congratulations you won!`;
                gameActive = false;
                return;
            }

            if (!board.includes("")) {
                messageDiv.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === player1 ? capitalizeFirstLetter(player2) : capitalizeFirstLetter(player1);
            currentSymbol = currentSymbol === "X" ? "O" : "X";
            messageDiv.textContent = `${currentPlayer}, you're up!`;
        });
    });

    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("setup").classList.remove("hidden");
        document.getElementById("game").classList.add("hidden");
    });
}

function checkWinner(board, symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    return winningCombinations.some(combination => 
        combination.every(index => board[index] === symbol)
    );
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
