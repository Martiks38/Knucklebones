import type { GridColumn } from '@/typings'

export function addToGrid<T>({
	colNumber,
	grid,
	value
}: {
	value: number
	colNumber: number
	grid: {
		col: GridColumn<number>[]
	}[]
}): void | false {
	const diceCol = grid[colNumber].col.slice()
	const diceSlot = diceCol.find((cell) => cell?.value === 0)

	if (!diceSlot) return false

	diceSlot.value = value

	const dices = diceCol.map((dice) => dice.value).filter((value) => value !== 0)
	const cantDices = dices.length
	const numberNonReatingValues = new Set(dices).size

	if (cantDices === numberNonReatingValues) return
	if (cantDices - numberNonReatingValues === 2) {
		diceCol.forEach((dice) => (dice.factor = 3))

		grid[colNumber].col = diceCol
		return
	}

	dices.forEach((value, ind) => {
		const otherPosition = dices.lastIndexOf(value)

		if (otherPosition !== ind) {
			diceCol[ind].factor = 2
			diceCol[otherPosition].factor = 2
		}
	})

	grid[colNumber].col = diceCol
}
