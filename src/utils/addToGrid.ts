export function addToGrid<T>({
	colNumber,
	grid,
	value
}: {
	value: T
	colNumber: number
	grid: {
		col: {
			value: T
			id: string
		}[]
		id: string
	}[]
}): void {
	const slotDice = grid[colNumber].col.find((cell) => cell?.value === 0)

	if (slotDice) slotDice.value = value
}
