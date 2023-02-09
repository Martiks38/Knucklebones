<script setup lang="ts">
import FireAnimation from '@/components/FireAnimation.vue'
import GenericButton from '@/components/GenericButton.vue'
import DiceModel from '@/components/DiceModel.vue'
import ArrowLeft from '@/components/ArrowLeft.vue'
</script>

<template>
	<main class="relative grid place-content-center w-full h-screen text-white overflow-hidden">
		<FireAnimation />
		<div class="w-[860px]">
			<h1 class="mb-8 text-6xl text-center">Cómo jugar</h1>
			<p class="text-xl text-center">Tu puntuación es la suma del valor de todos los dados.</p>
			<div class="flex items-center justify-between gap-20 mt-10 mb-16">
				<div class="relative mx-16 w-40 h-40 rounded-xl bg-[#423f36]">
					<ArrowLeft styles="absolute top-2 right-2 w-20 h-auto " />
					<ArrowLeft styles="absolute bottom-2 left-2 w-20 h-auto rotate-180" />
					<div class="absolute -top-4 -left-4">
						<div class="line line__horizontal"></div>
						<div class="line line__50"></div>
						<div class="line line__105"></div>
						<DiceModel class="w-16 h-16" state="multiply" :value="6" />
					</div>
					<div class="absolute -bottom-4 -right-4 rotate-180">
						<div class="line line__horizontal"></div>
						<div class="line line__50"></div>
						<div class="line line__105"></div>
						<DiceModel class="w-16 h-16" state="multiply" :value="6" />
					</div>
				</div>
				<div class="w-20">
					<img src="src/assets/bones.png" alt="" class="" />
				</div>
				<div class="relative mx-16 w-40 h-40 rounded-xl bg-[#423f36]">
					<div
						class="absolute -top-6 left-1/2 -translate-x-1/2 p-6 pt-0 rounded-xl border-4 border-black"
					>
						<div class="absolute bottom-6 left-6 w-16 h-16">
							<img src="/src/assets/cross.svg" alt="" />
						</div>
						<DiceModel class="w-16 h-16 deleteDice" :value="6" />
					</div>
					<div
						class="absolute -bottom-6 left-1/2 -translate-x-1/2 p-6 pb-0 rounded-xl border-4 border-black"
					>
						<div class="absolute top-6 left-6 w-16 h-16">
							<img src="/src/assets/cross.svg" alt="" />
						</div>
						<DiceModel class="w-16 h-16 deleteDice" :value="6" />
					</div>
				</div>
			</div>

			<div class="flex justify-between">
				<div class="w-72">
					<h2 class="mb-3.5 text-redGame text-2xl text-center">IGUALA LOS DADOS</h2>
					<p class="text-center">
						Si sale el mismo número en dos dados consecutivos, multiplica su valor.
					</p>
				</div>
				<div class="w-72">
					<h2 class="mb-3.5 text-redGame text-2xl text-center">DESTRUYE AL OPONENTE</h2>
					<p class="text-center">
						Destruye los dados de tus oponentes igualando tus dados a los suyos.
					</p>
				</div>
			</div>
			<div class="max-w-min mx-auto mt-20">
				<GenericButton href="/" styles="active" :animation="false"> Entendido </GenericButton>
			</div>
		</div>
	</main>
</template>

<style scoped>
.line {
	--height-line: 0.375rem;

	position: absolute;
	width: calc(3.5 * var(--height-line));
	height: var(--height-line);
	border-radius: calc(var(--height-line) / 2);
	background-color: var(--bg-button);
}

.line__horizontal {
	top: calc(3 * var(--height-line));
	left: calc(-6 * var(--height-line));
}

.line__50 {
	top: calc(-2.5 * var(--height-line));
	left: calc(-3.5 * var(--height-line));
	transform: rotate(50deg);
}

.line__105 {
	top: calc(-4 * var(--height-line));
	left: calc(2.7 * var(--height-line));
	transform: rotate(100deg);
}
</style>
