import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePlayers } from '../usePlayers'

describe('usePlayers', () => {
	let mockUsePlayers: typeof usePlayers

	beforeEach(() => {
		mockUsePlayers = vi.fn(usePlayers)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('Turns are the opposite of calling changeTurn', () => {
		const { players, changeTurn } = mockUsePlayers()
		const currentTurns = players.map(({ isTurn }) => isTurn)

		changeTurn()

		const newTurns = players.map(({ isTurn }) => isTurn)

		expect(newTurns).not.toEqual(currentTurns)
	})

	it('', () => {
		const { players, handlerScore } = mockUsePlayers()
		const player = 1
		const score = 47

		handlerScore({ score, player })

		expect(players[player - 1].score).toEqual(score)
	})
})
