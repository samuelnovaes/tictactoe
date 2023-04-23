const cells = document.getElementsByTagName('td');
const line = document.getElementById('line');
const restartButton = document.getElementById('restart');
const tie = document.getElementById('tie');

let activePlayer = 'X';
let canPlay = true;

const indexes = {
	X: [],
	O: []
};

const waysToWin = [
	{
		indexes: [1, 2, 3],
		className: 'horizontal h1'
	},
	{
		indexes: [4, 5, 6],
		className: 'horizontal h2'
	},
	{
		indexes: [7, 8, 9],
		className: 'horizontal h3'
	},
	{
		indexes: [1, 4, 7],
		className: 'vertical v1'
	},
	{
		indexes: [2, 5, 8],
		className: 'vertical v2'
	},
	{
		indexes: [3, 6, 9],
		className: 'vertical v3'
	},
	{
		indexes: [1, 5, 9],
		className: 'diagonal primary'
	},
	{
		indexes: [3, 5, 7],
		className: 'diagonal secondary'
	}
];

const checkWinner = (player) => {
	for (const wayToWin of waysToWin) {
		let isWinner = true;
		for (const index of wayToWin.indexes) {
			if (!indexes[player].includes(index)) {
				isWinner = false;
			}
		}
		if (isWinner) {
			return {
				isWinner: true,
				className: wayToWin.className
			};
		}
	}
	return { isWinner: false };
};

for (const cell of cells) {
	cell.addEventListener('click', (event) => {
		if (canPlay) {
			const index = parseInt(event.target.getAttribute('aria-index'));
			if (cell.innerText === '') {
				cell.innerText = activePlayer;
				indexes[activePlayer].push(index);
				const { isWinner, className } = checkWinner(activePlayer);
				if (isWinner) {
					line.className = className;
					canPlay = false;
					restartButton.disabled = false;
				}
				else if(indexes.X.length + indexes.O.length === 9) {
					tie.style.display = 'block';
					canPlay = false;
					restartButton.disabled = false;
				}
				activePlayer = activePlayer === 'X' ? 'O' : 'X';
			}
		}
	});
}

restartButton.addEventListener('click', () => {
	indexes.X = [];
	indexes.O = [];
	line.className = '';
	tie.style.display = 'none';
	for (const cell of cells) {
		cell.innerText = '';
	}
	canPlay = true;
	restartButton.disabled = true;
});