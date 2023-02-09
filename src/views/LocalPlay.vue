<script lang="ts" setup>
import { onBeforeMount, provide, reactive } from 'vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import type { Player } from '@/typings/index'

const player1: Player = reactive({
	number: '1',
	isTurn: false
})

const player2: Player = reactive({
	number: '2',
	isTurn: false
})

const informationNewDice = reactive({ col: 0, value: 0 })
const players: [Player, Player] = [player1, player2]

const changeNewDice = (
	currentDice: { col: number; value: number },
	newCol: number,
	newValue: number
) => {
	currentDice.col = newCol
	currentDice.value = newValue
}

provide('newDice', { informationNewDice, changeNewDice })

onBeforeMount(() => {
	Math.random() > 0.5 ? (player1.isTurn = true) : (player2.isTurn = true)
})
</script>

<template>
	<main class="flex flex-col-reverse justify-between w-[1024px] mx-auto h-screen py-4 text-white">
		<PlayerPanel :player="player1" :players="players" />
		<PlayerPanel :player="player2" :players="players" :class="'flex-row-reverse items-start'" />
	</main>
</template>
