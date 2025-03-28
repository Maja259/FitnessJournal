<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    };

    return { email, password, login };
  },
};
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 50px;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 200px;
}
button {
  padding: 10px;
  cursor: pointer;
}
</style>
