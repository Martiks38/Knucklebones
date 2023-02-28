import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
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
		component: () => import('@/views/LocalPlay.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
