export type Player = {
	isTurn: boolean
	score: number
}

export type GridColumn<T> = {
	value: T
	factor: number
}

export type GameState = 'playing' | 'finished'
