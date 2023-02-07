import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/vue'
import type { RenderResult } from '@testing-library/vue'
import LocalPlayVue from '../LocalPlay.vue'

describe('<LocalPlay />', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(LocalPlayVue)
	})

	afterEach(() => {
		cleanup()
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

	it('Only one column should be highlighted', () => {
		const { container } = renderResult
		const highlightColumn = container.querySelectorAll('.highlight')

		expect(highlightColumn).toHaveLength(1)
	})

	it('The highlighted column is always at index zero', () => {
		const { container } = renderResult

		const diceGrid = container.querySelector('.highlight')?.parentElement
		const newHighlightColumn = diceGrid?.children.item(1)

		expect(newHighlightColumn).toBeDefined()

		fireEvent.mouseEnter(diceGrid?.children.item(1) as HTMLElement)

		expect(newHighlightColumn?.getAttribute('class')).toContain('highlight')

		expect(container.querySelectorAll('.highlight')).toHaveLength(1)
	})
})
