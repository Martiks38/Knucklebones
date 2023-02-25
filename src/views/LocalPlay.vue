<script lang="ts" setup>
import { computed, provide, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import PlayerPanel from '@/components/PlayerPanel.vue'
import GenericButton from '@/components/GenericButton.vue'
import GameMessage from '@/components/GameMessage.vue'
import { changeNewDice } from '@/utils/game/changeNewDice'
import { usePlayers } from '@/hooks/usePlayers'
import { useAnimationInitGame } from '@/hooks/useAnimationInitGame'
import type { GameState } from '@/typings/index'

const router = useRouter()
const { players, changeTurn, handlerScore } = usePlayers()
const initAnimation = useAnimationInitGame()

const gameState = ref<GameState>('playing')
const informationNewDice = reactive({ col: 0, value: 0 })

const startMessage = computed(() => `EMPIEZA: ${players[0].isTurn ? 'Jugador 1' : 'Jugador 2'}`)
const endMessage = computed(
	() => `VICTORIA PARA: ${players[0].score > players[1].score ? 'Jugador 1' : 'Jugador 2'}`
)

provide('newDice', { informationNewDice, changeNewDice })

const reset = () => router.go(0)
</script>

<template>
	<main class="flex flex-col-reverse justify-between w-[1024px] mx-auto h-screen py-4 text-white">
		<PlayerPanel
			:player="1"
			:is-turn="players[0].isTurn"
			:gameState="gameState"
			@change-turn="changeTurn"
			@change-score="(score: number) => handlerScore({score, player: 1})"
			@finished-game="() => (gameState = 'finished')"
		/>
		<PlayerPanel
			:player="2"
			:is-turn="players[1].isTurn"
			:gameState="gameState"
			class="flex-row-reverse items-start"
			@change-turn="changeTurn"
			@change-score="(score: number) => handlerScore({score, player: 2})"
			@finished-game="() => (gameState = 'finished')"
		/>
		<GameMessage :isView="initAnimation">
			{{ startMessage }}
		</GameMessage>
		<GameMessage :isView="gameState === 'finished'">
			<p>{{ endMessage }}</p>
			<p>{{ players[0].score }} - {{ players[1].score }}</p>
		</GameMessage>
		<div class="flex flex-col gap-6 !w-fit !fixed bottom-12 right-12">
			<button v-show="gameState === 'finished'" class="relative w-full" @click="reset">
				<div
					class="absolute top-0 left-0 h-full w-full outline outline-2 outline-black outline-offset-[-8px] styleButton active animateNone"
				></div>
				<span class="relative block px-16 py-4 text-center font-bold"> Volver a jugar </span>
			</button>
			<GenericButton href="/" styles="active" :animation-move="false">Salir</GenericButton>
		</div>
	</main>
</template>
