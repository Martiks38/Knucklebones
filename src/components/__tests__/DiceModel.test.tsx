import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import DiceModel from '../DiceModel.vue'

describe('<DiceModel />', () => {
	it('Correctly render 1', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 1
			}
		})

		expect(dice).toBeDefined()
	})

	it('Correctly render 2', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 2
			}
		})

		expect(dice).toBeDefined()
	})

	it('Correctly render 3', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 3
			}
		})

		expect(dice).toBeDefined()
	})

	it('Correctly render 4', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 4
			}
		})

		expect(dice).toBeDefined()
	})

	it('Correctly render 5', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 5
			}
		})

		expect(dice).toBeDefined()
	})

	it('Correctly render', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 6
			}
		})

		expect(dice).toBeDefined()
	})

	it('If the factor is two it has the class outline-[#d4ceb2] and fill #f3ebcd', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 1,
				value: 2
			}
		})

		const classList = Array.from(dice.container.firstElementChild?.classList as DOMTokenList)
		const fill = dice.container.querySelector('rect')?.getAttribute('fill')

		expect(classList).toContain('outline-[#d4ceb2]')
		expect(fill).toEqual('#f3ebcd')
	})

	it('If the factor is two it has the class outline-[#cabe6b] and fill #ebd77a', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 2,
				value: 2
			}
		})

		const classList = Array.from(dice.container.firstElementChild?.classList as DOMTokenList)
		const fill = dice.container.querySelector('rect')?.getAttribute('fill')

		expect(classList).toContain('outline-[#cabe6b]')
		expect(fill).toEqual('#ebd77a')
	})

	it('If the factor is two it has the class outline-[#5285a1] and fill #69a0bc', () => {
		const dice = render(DiceModel, {
			props: {
				factor: 3,
				value: 2
			}
		})

		const classList = Array.from(dice.container.firstElementChild?.classList as DOMTokenList)
		const fill = dice.container.querySelector('rect')?.getAttribute('fill')

		expect(classList).toContain('outline-[#5285a1]')
		expect(fill).toEqual('#69a0bc')
	})
})
