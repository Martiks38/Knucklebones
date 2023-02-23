<script lang="ts" setup>
import { computed, inject, onBeforeUpdate, reactive, ref } from 'vue'
import { clsx } from 'clsx'
import DiceModel from '@/components/DiceModel.vue'
import { addToGrid } from '@/utils/addToGrid'
import { generateRandomNum } from '@/utils/game/generateRandomNum'
import type { GridColumn } from '@/typings'

type Props = {
	player: number
	isTurn: boolean
	gameState: 'playing' | 'finished'
}

const props = defineProps<Props>()

const emits = defineEmits(['changeScore', 'changeTurn', 'finishedGame'])

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
	Array.from({ length: 3 }, () => {
		return {
			col: Array.from({ length: 3 }, (): GridColumn<number> => {
				return { value: 0, factor: 1 }
			})
		}
	})
)

const playerDices = reactive(DICE_GRID.value)

const score = computed(() =>
	playerDices.reduce((total, dicesCol) => {
		return (
			total +
			dicesCol.col.reduce((rowValue, dice) => {
				return rowValue + dice.value * dice.factor
			}, 0)
		)
	}, 0)
)

/*
 *  Clear the other player's dice.
 *  Issues the player's score and if the game is over.
 */
onBeforeUpdate(() => {
	if (informationNewDice.value && props.isTurn) {
		let modifiedColumn = playerDices[informationNewDice.col].col.map((dice) => {
			return dice.value !== informationNewDice.value ? dice : { value: 0, factor: 1 }
		})

		let remainingDices = modifiedColumn.filter((dice) => dice.value !== 0)

		if (remainingDices.length !== 0) {
			let numberElement = remainingDices.length
			remainingDices.length = 3
			remainingDices.fill({ value: 0, factor: 1 }, numberElement)
			modifiedColumn = [...remainingDices]
		}

		modifiedColumn.forEach((dice, ind) => {
			if (ind === 2) return
			if (dice.value === 0) {
				modifiedColumn[ind] = { ...modifiedColumn[ind], ...modifiedColumn[ind + 1] }
				modifiedColumn[ind + 1] = { value: 0, factor: 1 }
			}
		})

		playerDices[informationNewDice.col].col = modifiedColumn
	}

	let isFullDiceTable = playerDices
		.map(({ col }) => col)
		.flat(2)
		.every((dice) => dice.value !== 0)

	emits('changeScore', score)

	if (isFullDiceTable) emits('finishedGame')
})

const highlightColumn = (ev: MouseEvent) => {
	const targetCol = ev.currentTarget as HTMLElement

	targetCol.classList.add('highlight')

	const gridColumns = targetCol.parentElement?.querySelectorAll('*')

	// eslint-disable-next-line no-undef
	;(gridColumns as NodeListOf<Element>).forEach((col) => {
		if (col !== targetCol) col.classList.remove('highlight')
	})
}

const handlerTurn = (event: MouseEvent) => {
	const target = event.target as HTMLElement
	const column = target.closest('[data-col]') as HTMLElement
	const colId = column.dataset.col as string

	const colNumber = Number(colId.split('').at(-1))
	const isFullColumn = playerDices[colNumber].col.every((dice) => dice.value !== 0)

	if (isFullColumn) return

	addToGrid<number>({ colNumber, value: diceValue.value, grid: playerDices })
	changeNewDice(informationNewDice, colNumber, diceValue.value)

	diceValue.value = generateRandomNum(1, 6)

	target
		.closest('.diceGrid')
		?.querySelectorAll('[data-col]')
		.forEach((col) => col.classList.remove('highlight'))

	emits('changeTurn')
}
</script>

<template>
	<div class="relative flex w-full items-center">
		<div
			class="flex flex-col items-center gap-2.5 w-1/3 px-4"
			:class="clsx(player === 1 && 'justify-end')"
		>
			<div
				class="absolute h-auto"
				:class="clsx({ 'order-1 top-[90%]': player === 2, 'bottom-[88%]': player === 1 })"
			>
				<div class="relative movingAnimation" :class="clsx({ delayAnimation: player === 2 })">
					<img
						class="w-full h-auto"
						:class="clsx({ 'face-to-right': player === 1, grayscale: !isTurn })"
						:src="`src/assets/avatar-${player}.png`"
						:alt="`Jugador ${player}`"
					/>
				</div>
				<p class="mb-2 text-3xl text-center">{{ `Jugador ${player}` }}</p>
				<p class="text-2xl text-center">{{ score }}</p>
			</div>
			<div class="diceBox">
				<div
					v-show="isTurn && diceValue && gameState === 'playing'"
					class="flex items-center justify-center h-full"
				>
					<DiceModel :value="diceValue" class="w-[88px] h-auto" />
				</div>
			</div>
		</div>
		<div class="w-1/3 diceGrid" :class="clsx({ disabledGrid: !isTurn, turnGrid: player === 2 })">
			<div
				v-for="(diceCol, indCol) in playerDices"
				:key="`C${indCol}`"
				class="grid gap-2 p-2 grid-rows-3"
				:class="clsx({ highlight: isTurn && indCol === 0 && gameState === 'playing' })"
				@mouseenter="highlightColumn"
				@click="handlerTurn"
				:data-col="`R${indCol}`"
			>
				<div v-for="(dice, indCell) in diceCol.col" :key="`C${indCell}`" class="bg-[#17150f]">
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
