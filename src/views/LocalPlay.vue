<script lang="ts" setup>
import { provide, reactive, ref } from 'vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import GenericButton from '@/components/GenericButton.vue'
import GameMessage from '@/components/GameMessage.vue'
import { changeNewDice } from '@/utils/game/changeNewDice'
import { usePlayers } from '@/hooks/usePlayers'
import { useAnimationInitGame } from '@/hooks/useAnimationInitGame'
import type { GameState } from '@/typings/index'

const { players, changeTurn, handlerScore } = usePlayers()
const initAnimation = useAnimationInitGame()

const gameState = ref<GameState>('playing')
const informationNewDice = reactive({ col: 0, value: 0 })

provide('newDice', { informationNewDice, changeNewDice })
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
			EMPIEZA: {{ players[0].isTurn ? 'Jugador 1' : 'Jugador 2' }}
		</GameMessage>
		<GameMessage :isView="gameState === 'finished'">
			<p>VICTORIA PARA: {{ players[0].score > players[1].score ? 'Jugador 1' : 'Jugador 2' }}</p>
			<p>{{ players[0].score }} - {{ players[1].score }}</p>
		</GameMessage>
		<div class="flex flex-col gap-6 !w-fit !fixed bottom-12 right-12">
			<GenericButton v-show="gameState === 'finished'" href="/" styles="active" :animation="false">
				Volver a jugar
			</GenericButton>
			<GenericButton href="/" styles="active" :animation="false">Salir</GenericButton>
		</div>
	</main>
</template>
