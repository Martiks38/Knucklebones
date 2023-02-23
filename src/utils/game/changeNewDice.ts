export function changeNewDice(
	currentDice: { col: 0 | 1 | 2; value: 1 | 2 | 3 | 4 | 5 | 6 },
	newCol: 0 | 1 | 2,
	newValue: 1 | 2 | 3 | 4 | 5 | 6
) {
	currentDice.col = newCol
	currentDice.value = newValue
}
