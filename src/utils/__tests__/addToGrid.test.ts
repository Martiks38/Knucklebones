import { afterEach, describe, expect, it, vi } from 'vitest'
import { addToGrid } from '../addToGrid'

const gridInit = Array.from({ length: 3 }, () => {
	return {
		col: Array.from({ length: 3 }, () => {
			return { value: 0, factor: 1 }
		})
	}
})

describe('Function addToGrid', () => {
	const dataGame = {
		initialGame: {
			value: 5,
			colNumber: 2,
			grid: structuredClone(gridInit)
		},
		addToGrid
	}

	afterEach(() => {
		dataGame.initialGame.grid = structuredClone(gridInit)
		vi.restoreAllMocks()
	})

	it('It is called once', () => {
		const mock = vi.fn(addToGrid)

		mock(dataGame.initialGame)

		expect(mock).toHaveBeenCalledOnce()
	})

	it('When executing the function, only one die should be added', () => {
		const mock = vi.fn(addToGrid)

		mock(dataGame.initialGame)

		const dices = dataGame.initialGame.grid.reduce((cur, val) => {
			const cant = val.col.reduce((currentDice, diceValue) => {
				return diceValue.value !== 0 ? currentDice + 1 : currentDice
			}, 0)

			return cant !== 0 ? cur + 1 : cur
		}, 0)

		expect(dices).toEqual(1)
	})

	it('If there are two dice of the same value in the same column they will have a factor of 2', () => {
		const mock = vi.fn(addToGrid)

		mock(dataGame.initialGame)
		mock(dataGame.initialGame)

		const { colNumber, grid, value } = dataGame.initialGame
		const valuesColumn = grid[colNumber].col.map((dice) => dice.value)

		expect(mock).toBeCalledTimes(2)
		expect(valuesColumn).toEqual([value, value, 0])
	})

	it('If there are two dice of the same value in the same column they will have a factor of 3', () => {
		const mock = vi.fn(addToGrid)

		mock(dataGame.initialGame)
		mock(dataGame.initialGame)
		mock(dataGame.initialGame)

		const { colNumber, grid, value } = dataGame.initialGame
		const valuesColumn = grid[colNumber].col.map((dice) => dice.value)
		const factorsColumn = grid[colNumber].col.map((dice) => dice.factor)

		expect(mock).toBeCalledTimes(3)
		expect(valuesColumn).toEqual([value, value, value])
		expect(factorsColumn).toEqual([3, 3, 3])
	})

	it('If there are three dice of which two are equal, they will have a factor of 2 and the other 1, If there are three dice of which two are the same, they will have a factor of 2 and the other 1, regardless of the order.', () => {
		const mock = vi.fn(addToGrid)
		const otherValue = 3

		mock(dataGame.initialGame) // factor: 2
		mock({ ...dataGame.initialGame, value: otherValue }) // factor: 1
		mock(dataGame.initialGame) // factor: 2

		const { colNumber, grid, value } = dataGame.initialGame
		const factorColumn = grid[colNumber].col.map((dice) => dice.factor)
		const valuesColumn = grid[colNumber].col.map((dice) => dice.value)

		expect(valuesColumn).toEqual([value, otherValue, value])
		expect(factorColumn).toEqual([2, 1, 2])
	})

	it('When executed four times it should return false', () => {
		const mock = vi.fn(addToGrid)

		mock(dataGame.initialGame)
		mock(dataGame.initialGame)
		mock(dataGame.initialGame)
		mock(dataGame.initialGame)

		expect(mock).toHaveReturnedWith(false)
	})
})
