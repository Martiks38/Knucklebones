import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import type { RenderResult } from '@testing-library/vue'

import LocalPlay from '../LocalPlay.vue'

const user = userEvent.setup()

describe('<LocalPlay />', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		vi.useFakeTimers()
		renderResult = render(LocalPlay)
	})

	afterEach(() => {
		vi.clearAllTimers()
		vi.restoreAllMocks()
	})

	it('Correctly render', () => {
		expect(renderResult).toBeDefined()
	})

	it('It must render two icons, two dice grids and two boxes where the dice to be played appear.', () => {
		const { container } = renderResult
		const icons = screen.getAllByAltText(/Jugador (1|2)/i)
		const diceGrids = container.querySelectorAll('.diceGrid')
		const diceBoxes = container.querySelectorAll('.diceBox')

		expect(icons).toHaveLength(2)
		expect(diceGrids).toHaveLength(2)
		expect(diceBoxes).toHaveLength(2)
	})

	it('After 300ms, show the name of the starting player', async () => {
		vi.advanceTimersByTime(300)

		const initMessage = await screen.findByText(/EMPIEZA/i)

		expect(initMessage).toBeDefined()
	})

	it('After 2300 ms, the conditional rendering of the initial player name is false', async () => {
		vi.advanceTimersByTime(300)

		const initMessage = await screen.findByText(/EMPIEZA/i)

		expect(initMessage).toBeDefined()

		vi.advanceTimersByTime(2000)

		const { queryByText } = renderResult

		await waitForElementToBeRemoved(() => queryByText(/EMPIEZA/i))
	})

	it('The victory message does not appear on the screen at the start of the game.', () => {
		const victoryMessage = renderResult.queryByText(/victoria para:/i)

		expect(victoryMessage).toBeNull()
	})

	it('The Exit button redirects to Home "/"', () => {
		const exitButton = renderResult.getByText('Salir')

		user.click(exitButton)

		expect(location.pathname).toEqual('/')
	})
})
