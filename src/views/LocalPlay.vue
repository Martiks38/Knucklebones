<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue'
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

onBeforeMount(() => {
	Math.random() > 0.5 ? (player1.isTurn = true) : (player2.isTurn = true)
})
</script>

<template>
	<main class="flex flex-col-reverse justify-between w-[1024px] mx-auto h-screen py-4 text-white">
		<PlayerPanel :player="player1" />
		<PlayerPanel :player="player2" :class="'flex-row-reverse items-start'" />
	</main>
</template>
