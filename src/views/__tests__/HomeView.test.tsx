import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, type RenderResult } from '@testing-library/vue'

import HomeView from '../HomeView.vue'

describe('<HomeView />', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(HomeView)
	})

	afterEach(() => {
		cleanup()
	})

	it('Correctly render', () => {
		expect(screen.getByText('Matatena')).toBeDefined()
	})

	it('A only button have the active class', () => {
		const { container } = renderResult

		const bgButtons = container.querySelectorAll('.styleButton')

		const cantActive = Array.from(bgButtons).reduce((cur, val) => {
			return val.classList.contains('active') ? cur + 1 : cur
		}, 0)

		expect(cantActive).toEqual(1)
	})

	it('Hovering the mouse over a button adds the active class.', async () => {
		const { container } = renderResult

		const buttons = container.querySelectorAll('[data-option]')

		await fireEvent.mouseEnter(buttons[1])

		const bgButtons = container.querySelectorAll('.styleButton')

		const listClasses = Array.from(bgButtons[1].classList)

		expect(listClasses).toContain('active')
	})

	it('When hovering over a button, there should only be one active class.', async () => {
		const { container } = renderResult

		const buttons = container.querySelectorAll('[data-option]')

		await fireEvent.mouseEnter(buttons[1])

		const bgButtons = Array.from(container.querySelectorAll('.styleButton'))

		const cantActiveClass = bgButtons.reduce((cur, val) => {
			return val.classList.contains('active') ? cur + 1 : cur
		}, 0)

		expect(cantActiveClass).toEqual(1)
	})
})
