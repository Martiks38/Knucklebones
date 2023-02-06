import type { Player } from '@/typings'

export function changePlayerTurn(player1: Player, player2: Player) {
	player1.isTurn = !player1.isTurn
	player2.isTurn = !player2.isTurn
}
