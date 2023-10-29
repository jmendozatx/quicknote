<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">QuickNotes</div>

                <a role="button" :class="{ 'is-active': showMobileMenu }" class="navbar-burger" aria-label="menu"
                    aria-expanded="false" data-target="navbarBasicExample" @click.prevent="showMobileMenu = !showMobileMenu"
                    ref="navBarBurgerRef">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div v-if="storeAuth.user.id" id="navbarBasicExample" class="navbar-menu"
                :class="{ 'is-active': showMobileMenu }" ref="navBarMenuRef">
                <div class="navbar-end">
                    <RouterLink @click="showMobileMenu = false" class="navbar-item" to="/" active-class="is-active">
                        Notes
                    </RouterLink>
                    <RouterLink @click="showMobileMenu = false" class="navbar-item" to="/stats" active-class="is-active">
                        Stats
                    </RouterLink>
                    <button @click="logout" class="button is-small is-info mt-3 ml-3">Log
                        Out, {{ storeAuth.user.email }}</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
// Imports
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

//Store
const storeAuth = useStoreAuth()

// Mobile Nav
const showMobileMenu = ref(false)
const navBarMenuRef = ref(null)
const navBarBurgerRef = ref(null)

onClickOutside(navBarMenuRef, () => {
    showMobileMenu.value = false

}, {
    ignore: [navBarBurgerRef]
})

// Logout
const logout = () => {
    storeAuth.logoutUser()
    showMobileMenu.value = false
}

</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>