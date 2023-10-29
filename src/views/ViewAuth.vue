<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }" @click.prevent="toggleTab"><a>Login</a></li>
        <li :class="{ 'is-active': register }" @click.prevent="toggleTab"><a>Register</a></li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="credentials.email" class="input" type="email" autocomplete="email"
                  placeholder="e.g. alexsmith@gmail.com">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="credentials.password" class="input" type="password" autocomplete="current-password"
                  placeholder="Enter a password">
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-primary">{{ formTitle }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref, computed, reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'

//Store
const storeAuth = useStoreAuth()

// Login / Register
const register = ref(false)

const toggleTab = () => {
  register.value = !register.value
}

// Form Titles
const formTitle = computed(() => register.value ? 'Register' : 'Login')

// Credentials
const credentials = reactive({
  email: '',
  password: ''
})

// Submit
const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter an email and password')
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials)
    } else {
      storeAuth.loginUser(credentials)
    }
  }
}
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>