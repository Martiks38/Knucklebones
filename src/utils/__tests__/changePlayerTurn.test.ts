import { afterEach, describe, expect, it, vi } from 'vitest'
import { changePlayerTurn } from '../changePlayerTurn'
import type { Player } from '@/typings'

let players: [Player, Player] = [
	{ isTurn: true, score: 0 },
	{ isTurn: false, score: 0 }
]

describe('changePlayerTurn', () => {
	afterEach(() => {
		players = [
			{ isTurn: true, score: 0 },
			{ isTurn: false, score: 0 }
		]
		vi.clearAllMocks()
	})

	it('It is called once', () => {
		const mockFunction = vi.fn(changePlayerTurn)

		mockFunction(players[0], players[1])

		expect(mockFunction).toHaveBeenCalledOnce()
	})

	it('"isTurn" of each player becomes the opposite', () => {
		const mockFunction = vi.fn(changePlayerTurn)
		const nextTurns = players.map((player) => !player.isTurn)

		mockFunction(players[0], players[1])

		const turns = players.map((player) => player.isTurn)

		expect(turns).toEqual(nextTurns)
	})
})
