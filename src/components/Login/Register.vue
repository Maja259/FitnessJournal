<template>
  <div class="register">
    <h2>Register</h2>
    <input v-model="fullName" type="text" placeholder="Full Name" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="workoutGoal" type="number" placeholder="How many times you want to workout weekly?" />
    <input v-model="weight" type="number" placeholder="Weight (kg)" />
    <input v-model="height" type="number" placeholder="Height (cm)" />
    <button @click="register">Register</button>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    const workoutGoal = ref("");
    const weight = ref("");
    const height = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Чување на податоците во Firestore
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName.value,
          email: email.value,
          workoutGoal: workoutGoal.value,
          weight: weight.value,
          height: height.value,
          registeredAt: new Date().toISOString(), // Датум кога се регистрирал
        });

        router.push("/"); // Пренасочи по успешна регистрација
      } catch (error) {
        alert(error.message);
      }
    };

    return { fullName, email, password, workoutGoal, weight, height, register };
  },
};
</script>

<style scoped>
.register {
  text-align: center;
  margin-top: 50px;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 250px;
}
button {
  padding: 10px;
  cursor: pointer;
}

</style>
