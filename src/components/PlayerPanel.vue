<script lang="ts" setup>
import { computed, inject, onBeforeUpdate, reactive, ref } from 'vue'
import { clsx } from 'clsx'
import DiceModel from '@/components/DiceModel.vue'
import { addToGrid } from '@/utils/addToGrid'
import { generateRandomNum } from '@/utils/game/generateRandomNum'
import { changePlayerTurn } from '@/utils/changePlayerTurn'
import type { GridColumn, Player } from '@/typings'

type Props = {
	player: Player
	players: [Player, Player]
}
const props = defineProps<Props>()

const isPlayer1 = ref(props.player.number === '1')
const isPlayer2 = ref(props.player.number === '2')
const diceValue = ref<number>(generateRandomNum(1, 6))

const { informationNewDice, changeNewDice } = inject('newDice') as {
	informationNewDice: { col: number; value: number }
	changeNewDice: (
		currentDice: { col: number; value: number },
		newCol: number,
		newValue: number
	) => void
}

const DICE_GRID = computed(() =>
	Array.from({ length: 3 }, (_, col) => {
		return {
			col: Array.from({ length: 3 }, (_, cell): GridColumn<number> => {
				return { value: 0, factor: 1, id: `${cell}` }
			}),
			id: `C${col}`
		}
	})
)

const playerDices = reactive(DICE_GRID.value)

const score = computed(() =>
	playerDices.reduce((total, dicesCol) => {
		return (
			total +
			dicesCol.col.reduce((rowValue, dice) => {
				return rowValue + dice.value
			}, 0)
		)
	}, 0)
)

onBeforeUpdate(() => {
	let col = playerDices[informationNewDice.col].col

	if (informationNewDice.value && props.player.isTurn) {
		let modCol = col.map((dice) => {
			return dice.value === informationNewDice.value ? { ...dice, value: 0 } : dice
		})

		modCol.forEach((dice, ind) => {
			if (ind === 2) return

			if (dice.value === 0) {
				modCol[ind] = modCol[ind + 1]
				modCol[ind + 1] = { ...modCol[ind + 1], value: 0, factor: 1 }
			}
		})

		playerDices[informationNewDice.col].col = modCol
	}
})

const src = `src/assets/avatar-${props.player.number}.png`

const highlightColumn = (ev: MouseEvent) => {
	const targetCol = ev.currentTarget as HTMLElement

	targetCol.classList.add('highlight')

	const gridColumns = [...(targetCol.parentNode?.children as HTMLCollection)]

	gridColumns.forEach((col) => {
		if (col !== targetCol) col.classList.remove('highlight')
	})
}

const handlerTurn = (event: MouseEvent) => {
	const target = event.target as HTMLElement
	const column = target.closest('[data-col]') as HTMLElement
	const colId = column.dataset.col as string

	const colNumber = Number(colId.split('')[1])
	const isFullColumn = playerDices[colNumber].col.every((dice) => dice.value !== 0)

	if (isFullColumn) return

	addToGrid<number>({ colNumber, value: diceValue.value, grid: playerDices })
	changePlayerTurn(props.players[0], props.players[1])
	changeNewDice(informationNewDice, colNumber, diceValue.value)

	diceValue.value = generateRandomNum(1, 6)

	target
		.closest('.diceGrid')
		?.querySelectorAll('[data-col]')
		.forEach((col) => col.classList.remove('highlight'))
}
</script>

<template>
	<div class="relative flex w-full items-center">
		<div
			class="flex flex-col items-center gap-2.5 w-1/3 px-4"
			:class="clsx(isPlayer1 && 'justify-end')"
		>
			<div
				class="absolute h-auto"
				:class="clsx({ 'order-1 top-[90%]': isPlayer2, 'bottom-[88%]': isPlayer1 })"
			>
				<div class="relative movingAnimation" :class="clsx(isPlayer2 && 'delayAnimation')">
					<img
						class="w-full h-auto"
						:class="clsx({ 'face-to-right': isPlayer1, grayscale: !player.isTurn })"
						:src="src"
						:alt="`Jugador ${props.player.number}`"
					/>
				</div>
				<p class="mb-2 text-3xl text-center">{{ `Jugador ${player.number}` }}</p>
				<p class="text-2xl text-center">{{ score }}</p>
			</div>
			<div class="diceBox">
				<div v-if="player.isTurn && diceValue" class="flex items-center justify-center h-full">
					<DiceModel :value="diceValue" class="w-[88px] h-auto" />
				</div>
			</div>
		</div>
		<div
			class="w-1/3 diceGrid"
			:class="clsx({ disabledGrid: !player.isTurn, turnGrid: isPlayer2 })"
		>
			<div
				v-for="(diceCol, index) in playerDices"
				:key="diceCol.id"
				class="grid gap-2 p-2 grid-rows-3"
				:class="clsx({ highlight: player.isTurn && index === 0 })"
				@mouseenter="highlightColumn"
				@click="handlerTurn"
				:data-col="diceCol.id"
			>
				<div v-for="dice of diceCol.col" :key="dice.id" class="bg-[#17150f]">
					<div v-show="dice.value" class="flex items-center justify-center h-full">
						<DiceModel :factor="dice.factor" :value="dice.value" class="w-[74px] h-auto" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.diceBox {
	width: 90%;
	height: 180px;
	background-color: #212826;
	border: solid 20px #39433e;
	box-shadow: 0 17px #1c2420;
}

.turnGrid {
	transform: rotateX(180deg);
}

.face-to-right {
	transform: rotateY(180deg);
}

.movingAnimation {
	position: relative;
	transform-origin: 50% bottom;
	animation: moveFace 2.5s linear 0s infinite normal both running;
}

.delayAnimation {
	animation-delay: 300ms;
}

.diceGrid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: 280px;
	background-color: antiquewhite;
}

.disabledGrid {
	pointer-events: none;
}

.highlight {
	background-color: var(--bg-button);
}

@keyframes moveFace {
	0%,
	50%,
	100% {
		top: 0;
		transform: rotateZ(0);
	}

	20% {
		top: 1px;
	}

	25% {
		top: 3px;
		transform: rotateZ(-6deg);
	}

	48% {
		top: 1px;
		transform: rotateZ(-2deg);
	}

	70% {
		top: 2px;
	}

	75% {
		top: 3px;
		transform: rotateZ(6deg);
	}

	98% {
		top: 1px;
		transform: rotateZ(2deg);
	}
}
</style>
