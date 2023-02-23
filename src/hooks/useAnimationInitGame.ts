import { onMounted, ref } from 'vue'

export function useAnimationInitGame() {
	const initAnimation = ref(false)

	onMounted(() => {
		setTimeout(() => {
			initAnimation.value = true
			setTimeout(() => (initAnimation.value = false), 2000)
		}, 300)
	})

	return initAnimation
}
