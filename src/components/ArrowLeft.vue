<script setup lang="ts">
defineProps({
	styles: String
})
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="800"
		height="800"
		fill="none"
		viewBox="0 0 24 24"
		:class="styles"
	>
		<path
			fill="#000"
			d="M9.707 13.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L6.414 8H16a5 5 0 0 1 5 5v7a1 1 0 1 1-2 0v-7a3 3 0 0 0-3-3H6.414l3.293 3.293Z"
		/>
	</svg>
</template>
