import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import { changeNewDice } from '@/utils/game/changeNewDice'
import clsx from 'clsx'
import type { RenderResult } from '@testing-library/vue'

const mockChangeNewDice = vi.fn(changeNewDice)

describe('<PlayerPanel />', () => {
	let Panel: RenderResult

	beforeEach(() => {
		Panel = render(PlayerPanel, {
			global: {
				plugins: [clsx],
				provide: {
					newDice: {
						informationNewDice: { col: 0, value: 4 },
						changeNewDice: mockChangeNewDice
					}
				}
			},
			props: {
				player: 1,
				isTurn: true,
				gameState: 'playing'
			}
		})
	})

	it('Correctly render', () => {
		const { getByAltText } = Panel

		expect(getByAltText(/Jugador/i)).toBeDefined()
	})

	it('Only one column should be highlighted', () => {
		const { container } = Panel
		const highlightColumn = container.querySelectorAll('.highlight')

		expect(highlightColumn).toHaveLength(1)
	})

	it('The highlighted column is always at index zero', async () => {
		const { container } = Panel

		const diceGrid = container.querySelector('.highlight')?.parentElement
		const newHighlightColumn = diceGrid?.children.item(1)

		expect(newHighlightColumn).toBeDefined()

		await fireEvent.mouseEnter(diceGrid?.children.item(1) as HTMLElement)

		expect(newHighlightColumn?.getAttribute('class')).toContain('highlight')
		expect(container.querySelectorAll('.highlight')).toHaveLength(1)
	})

	it("At the start of the game, only the player's zero score should be on the screen. The zero score of the dice columns must not appear.", () => {
		const { queryAllByText } = Panel

		expect(queryAllByText(/0/g)).toHaveLength(1)
	})

	it('Adding a new die to a column displays the total score for the column', async () => {
		const { container } = Panel

		const highlightCol = container.querySelector('.highlight') as HTMLElement

		await fireEvent.click(highlightCol)

		expect(Panel.queryByText(/[1-6]/g)).toBeDefined()
	})
})
