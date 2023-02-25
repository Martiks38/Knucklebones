<script setup lang="ts">
import clsx from 'clsx'

const props = defineProps({
	href: { type: String, required: true },
	optionNumber: Number,
	styles: String,
	animationMove: { type: Boolean, default: true },
	animationHover: { type: Boolean, defaul: false }
})

const activeHover = (ev: MouseEvent) => {
	if (!props.animationHover) return

	const optionsButtons = Array.from(document.querySelectorAll('.styleButton'))
	const buttonTarget = (ev.currentTarget as HTMLElement).dataset.option as string

	optionsButtons.forEach((button, index) => {
		if (index === parseInt(buttonTarget)) {
			button.classList.add('active')
		} else {
			button.classList.remove('active')
		}
	})
}
</script>

<template>
	<div class="relative w-fit mx-auto">
		<div
			class="absolute top-0 left-0 h-full w-full outline outline-2 outline-black outline-offset-[-8px] styleButton"
			:class="clsx([props.styles, { animateNone: !props.animationMove }])"
		></div>
		<router-link
			@mouseenter="activeHover"
			:to="props.href"
			class="relative block px-16 py-4 text-center font-bold"
			:data-option="props.optionNumber"
		>
			<slot />
		</router-link>
	</div>
</template>

<style>
.active {
	background-color: var(--bg-button);
}

.styleButton {
	clip-path: polygon(0 0, 100% 0, 84% 50%, 100% 100%, 0 100%, 16% 50%);
}

.styleButton.active {
	animation: moveBackground 800ms linear 0s alternate infinite none;
}

.styleButton.active.animateNone {
	animation-name: none;
}

@keyframes moveBackground {
	0% {
		top: 0px;
		left: 0px;
	}
	100% {
		top: 2px;
		left: 2px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.styleButton {
		animation-name: none;
	}
}
</style>
