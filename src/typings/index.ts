export type Player = {
	number: string
	isTurn: boolean
}

export type GridColumn<T> = {
	value: T
	factor: number
	id: string
}
