export type Player = {
	number: string
	isTurn: boolean
}

export type GridColumn = {
	value: number
	multiply: 'Double' | 'Triple' | null
	id: string
}
