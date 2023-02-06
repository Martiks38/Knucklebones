import type { GridColumn } from '@/typings'

export const DICE_GRID = Array.from({ length: 3 }, (_, col) => {
	return {
		col: Array.from({ length: 3 }, (_, cell): GridColumn => {
			return { value: 0, multiply: null, id: `${cell}` }
		}),
		id: `C${col}`
	}
})
