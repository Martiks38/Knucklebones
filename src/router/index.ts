import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocalPlay from '../views/LocalPlay.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/how_to_play',
			name: 'howToPlay',
			component: () => import('@/views/HowToPlayView.vue')
		},
		{
			path: '/local_play',
			name: 'playLocal',
			component: LocalPlay
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound
		}
	]
})

export default router
