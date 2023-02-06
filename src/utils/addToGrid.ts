export function addToGrid<T>({
	value,
	event,
	grid
}: {
	value: T
	event: MouseEvent
	grid: {
		col: {
			value: T
			id: string
		}[]
		id: string
	}[]
}): void {
	const column = (event.target as HTMLElement).closest('[data-row]') as HTMLElement
	const colId = column.dataset.row as string

	const colNumber = Number(colId.split('')[1])
	const slotDice = grid[colNumber].col.find((cell) => cell?.value === 0)

	if (slotDice) slotDice.value = value
}
