<script lang="ts" setup>
import GenericButton from '@/components/GenericButton.vue'
</script>
<template>
	<main class="relative grid place-content-center w-full h-screen oneWhoWaits">
		<div
			class="absolute left-0 right-0 bottom-12 flex gap-16 w-fit mx-auto p-8 bg-[#000d] rounded-lg font-specialElite"
		>
			<div class="w-[40ch] text-3xl text-white">
				<h1 class="mb-6 text-3xl text-center">Error 404 - Not Found</h1>
				<p class="mb-1">No temas.</p>
				<p class="mb-1">No te dejaré perderte.</p>
				<p class="mb-1">No lo permitiré.</p>
				<p class="mb-4">Cada vez que caigas aquí abajo, volverás a alzarte.</p>
				<GenericButton href="/" styles="active">Inicio</GenericButton>
			</div>
		</div>
	</main>
</template>

<style>
.oneWhoWaits {
	background-image: url('src/assets/404.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: top;
}
</style>
