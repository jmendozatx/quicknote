import { defineStore } from 'pinia'
import {
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy
} from 'firebase/firestore';
import { db } from '@/js/firebase.js'
import { useStoreAuth } from '@/stores/storeAuth.js'
import { get } from '@vueuse/core';

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshop = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
      ],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      getNotesSnapshop = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log("error", error)
      })

    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshop) getNotesSnapshop() // Unsubscribe from previous snapshot
    },
    async addNote(newNoteContent) {
      let date = new Date().getTime()

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updateNoteContent(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content: content
      });
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        const note = state.notes.find(note => note.id === id)
        return note ? note.content : ''
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})