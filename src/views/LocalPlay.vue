<script lang="ts" setup>
import { provide, reactive, ref } from 'vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import GenericButton from '@/components/GenericButton.vue'
import GameMessage from '@/components/GameMessage.vue'
import { changeNewDice } from '@/utils/game/changeNewDice'
import { usePlayers } from '@/hooks/usePlayers'
import { useAnimationInitGame } from '@/hooks/useAnimationInitGame'
import type { GameState } from '@/typings/index'

const players = usePlayers()
const initAnimation = useAnimationInitGame()

const gameState = ref<GameState>('playing')
const informationNewDice = reactive({ col: 0, value: 0 })

provide('newDice', { informationNewDice, changeNewDice })
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
		<GameMessage :isView="initAnimation">
			EMPIEZA: {{ players[0].isTurn ? 'Jugador 1' : 'Jugador 2' }}
		</GameMessage>
		<GameMessage :isView="gameState === 'finished'">
			<p>VICTORIA PARA: {{ players[0].score > players[1].score ? 'Jugador 1' : 'Jugador 2' }}</p>
			<p>{{ players[0].score }} - {{ players[1].score }}</p>
		</GameMessage>
		<GenericButton
			href="/"
			styles="active"
			:animation="false"
			class="!w-fit !fixed bottom-12 right-12"
		>
			Salir
		</GenericButton>
	</main>
</template>
