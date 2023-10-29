<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                {{ note.content }}
            </div>
            <div class="columns is-mobile has-text-grey-light mt-2">
                <small class="column">{{ dateFormat }}</small>
                <small class="column has-text-right">{{ characterLength }}</small>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">Edit</RouterLink>
            <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
        </footer>
        <ModalDeleteNote v-model="modals.deleteNote" v-if="modals.deleteNote" :noteId="note.id" />
    </div>
</template>

<script setup>
// Imports
import { reactive, computed } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes';
import ModalDeleteNote from './ModalDeleteNote.vue';
import { useDateFormat } from '@vueuse/core'

// Props
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

// Store
const storeNotes = useStoreNotes()

// Date Format
const dateFormat = computed(() => {
    return useDateFormat(props.note.date, 'MMM D, YYYY').value
})

// Character Length
const characterLength = computed(() => {
    let length = props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return `${length} ${description}`
})

// Modals
const modals = reactive({
    deleteNote: false
})
</script>