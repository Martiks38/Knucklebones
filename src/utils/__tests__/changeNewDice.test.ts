import { beforeEach, describe, expect, it, vi } from 'vitest'
import { changeNewDice } from '../game/changeNewDice'

type DataDice = {
	col: 0 | 1 | 2
	value: 1 | 2 | 3 | 4 | 5 | 6
}

describe('changeNewDice', () => {
	let mockDataDice: DataDice

	beforeEach(() => {
		mockDataDice = {
			col: 1,
			value: 4
		}
		vi.clearAllMocks()
	})

	it('The current data of the die { col: 1, value: 4 } changes to { col: 2, value: 3 }', () => {
		const mockChangeNewDice = vi.fn(changeNewDice)
		const col = 2
		const value = 3

		mockChangeNewDice(mockDataDice, col, value)

		expect(mockDataDice).toEqual({ col, value })
	})

	it('The current data of the die { col: 1, value: 4 } changes to { col: 2, value: 3 }', () => {
		const mockChangeNewDice = vi.fn(changeNewDice)
		const col = 2
		const value = 3

		mockChangeNewDice(mockDataDice, col, value)

		expect(mockChangeNewDice).toHaveBeenCalledOnce()
	})
})
