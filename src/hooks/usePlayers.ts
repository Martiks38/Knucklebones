import { onBeforeMount, reactive } from 'vue'
import type { Player } from '@/typings/index'

export function usePlayers() {
	const players = reactive<[Player, Player]>([
		{ isTurn: false, score: 0 },
		{ isTurn: false, score: 0 }
	])

	onBeforeMount(() => {
		Math.random() > 0.5 ? (players[0].isTurn = true) : (players[1].isTurn = true)
	})

	return players
}
