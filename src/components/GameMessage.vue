<script setup lang="ts">
type Props = {
	isView: boolean
}

defineProps<Props>()
</script>

<template>
	<Transition>
		<div
			v-if="isView"
			class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl text-center font-semibold whitespace-nowrap"
		>
			<slot />
		</div>
	</Transition>
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
