<script setup lang="ts">
const props = defineProps({
	state: String
})

let bgDice: string
let outlineColor: string

const compareState = () => {
	if (!props.state) {
		bgDice = '#f3ebcd'
		outlineColor = 'outline-[#d4ceb2]'

		return
	}

	if (props.state === 'multiply') {
		bgDice = '#e0d591'
		outlineColor = 'outline-[#d1ce8a]'

		return
	}

	bgDice = '#f3b39d'
	outlineColor = 'outline-[#d89b8b]'
}

compareState()
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="800"
		height="800"
		viewBox="0 0 16 16"
		:class="outlineColor"
	>
		<rect :fill="bgDice" x="0" y="0" width="20" height="20" />
		<path
			d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"
		/>
		<path
			d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
		/>
	</svg>
</template>
