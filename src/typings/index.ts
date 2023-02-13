export type Player = {
	isTurn: boolean
	score: number
}

export type GridColumn<T> = {
	value: T
	factor: number
}
