import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import GameMessage from '../GameMessage.vue'

describe('<ModalMessage />', () => {
	it('Correctly render', () => {
		const { getByText } = render(GameMessage, {
			props: {
				isView: true
			},
			slots: {
				default: '<p>Contenido del slot</p>'
			}
		})

		expect(getByText(/Contenido del slot/i)).toBeDefined()
	})

	it('The modal should not be rendered', () => {
		const { queryByText } = render(GameMessage, {
			props: {
				isView: false
			},
			slots: {
				default: '<p>Contenido del slot</p>'
			}
		})

		expect(queryByText(/Contenido del slot/i)).toBeNull()
	})
})
