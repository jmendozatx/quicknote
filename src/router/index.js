import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { useStoreAuth } from '@/stores/storeAuth'

const routes = [
    {
        path: '/',
        name: 'notes',
        component: ViewNotes
    },
    {
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    {
        path: '/editNote/:id',
        name: 'editNote',
        component: ViewEditNote
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Navigation Guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    if (!storeAuth.user.id && to.name !== 'auth') {
        return { name: 'auth' }
    }
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
})

export default router