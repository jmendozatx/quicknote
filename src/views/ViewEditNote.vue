<template>
    <div class="editNote">
        <AddEditNote v-model="noteContent" ref="addEditNoteRef" bgColor="link" placeholder="Edit note" label="Edit Note">
            <template #buttons>
                <button class="button is-link is-light mr-3" @click="$router.back()">Cancel</button>
                <button :disabled="!noteContent" class="button is-link has-background-link" @click="handleSave">Save
                    Note</button>
            </template>
        </AddEditNote>
    </div>
</template>

<script setup>
// Imports
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

// Router
const route = useRoute()
const router = useRouter()

// Store
const storeNotes = useStoreNotes()

// Notes
const noteContent = ref('')
noteContent.value = storeNotes.getNoteContent(route.params.id)

//Save
const handleSave = () => {
    storeNotes.updateNoteContent(route.params.id, noteContent.value)
    router.push('/')
}
</script>