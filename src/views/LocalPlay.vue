<script lang="ts" setup>
import { onBeforeMount, onMounted, provide, reactive, ref } from 'vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import GenericButton from '@/components/GenericButton.vue'
import type { Player } from '@/typings/index'

type GameState = 'playing' | 'finished'

const initAnimation = ref(false)
const informationNewDice = reactive({ col: 0, value: 0 })
const players = reactive<[Player, Player]>([
	{ isTurn: false, score: 0 },
	{ isTurn: false, score: 0 }
])

const gameState = ref<GameState>('playing')

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
	Math.random() > 0.5 ? (players[0].isTurn = true) : (players[1].isTurn = true)
})

onMounted(() => {
	setTimeout(() => {
		initAnimation.value = true
		setTimeout(() => (initAnimation.value = false), 2000)
	}, 300)
})
</script>

<template>
	<main class="flex flex-col-reverse justify-between w-[1024px] mx-auto h-screen py-4 text-white">
		<PlayerPanel
			:player="1"
			:players="players"
			:gameState="gameState"
			@finished-game="() => (gameState = 'finished')"
			@change-score="(score: number) => (players[0].score = score)"
		/>
		<PlayerPanel
			:player="2"
			:players="players"
			:gameState="gameState"
			class="flex-row-reverse items-start"
			@finished-game="() => (gameState = 'finished')"
			@change-score="(score: number) => (players[1].score = score)"
		/>
		<Transition>
			<div
				v-if="gameState === 'finished'"
				class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl text-center font-semibold whitespace-nowrap"
			>
				<p>VICTORIA PARA: {{ players[0].score > players[1].score ? 'Jugador 1' : 'Jugador 2' }}</p>
				<p>{{ players[0].score }} - {{ players[1].score }}</p>
			</div>
		</Transition>
		<GenericButton
			href="/"
			styles="active"
			:animation="false"
			class="!w-fit !fixed bottom-12 right-12"
		>
			Salir
		</GenericButton>
		<Transition>
			<div
				v-if="initAnimation"
				class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl text-center font-semibold whitespace-nowrap"
			>
				EMPIEZA: {{ players[0].isTurn ? 'Jugador 1' : 'Jugador 2' }}
			</div>
		</Transition>
	</main>
</template>

<style>
.v-enter-active,
.v-leave-active {
	transition-property: opacity, left, transform;
	transition-duration: 0.8s;
	transition-timing-function: ease;
}

.v-enter-active {
	opacity: 0;
	left: 75%;
	transform: translateX(-75%) translateY(-50%);
}

.v-enter-from {
	opacity: 0;
	left: 75%;
	transform: translateX(-75%) translateY(-50%);
}

.v-enter-to,
.v-leave-from {
	opacity: 1;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.v-leave-to {
	opacity: 0;
	left: 35%;
	transform: translateX(-35%) translateY(-50%);
}
</style>
