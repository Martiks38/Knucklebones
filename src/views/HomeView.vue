<script setup lang="ts">
import FireAnimation from '@/components/FireAnimation.vue'
import GenericButton from '@/components/GenericButton.vue'
import clsx from 'clsx'

const linkButtons = [
	['Jugar Local', '/local_play'],
	// ['Jugar Multijugador', '/multiplayer'],
	['Cómo jugar', '/how_to_play']
]
</script>

<template>
	<main class="relative grid place-content-center w-full h-screen overflow-hidden">
		<FireAnimation />
		<div class="w-[860px]">
			<div class="mb-12 text-white">
				<div></div>
				<h1 class="mb-4 text-7xl text-center">Matatena</h1>
				<img src="../assets/bones.png" alt="" class="mx-auto mb-4 w-24" />
				<span class="block text-2xl text-center"
					>Un juego de dados en el que hay que arriesgar para ganar</span
				>
			</div>
			<div class="flex flex-col items-center gap-4 mx-auto max-w-max text-white">
				<GenericButton
					v-for="(link, index) in linkButtons"
					:key="index"
					:href="link[1]"
					:option-number="index"
					:styles="clsx({ active: index === 0 })"
					:animation-hover="true"
				>
					{{ link[0] }}
				</GenericButton>
			</div>
		</div>
	</main>
</template>
