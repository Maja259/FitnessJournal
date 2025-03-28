<script setup>
import {computed, ref,onMounted} from "vue";
import {useRouter} from "vue-router";
import {db,auth} from "@/firebase";
import {doc, getDoc} from "firebase/firestore";

const today=computed(() => {
  const day=new Date();
  return day.toLocaleDateString("mk-MK");
})

const router = useRouter();

const fitnessData = ref([
  { label: "Sleep", value: null, route: "/fitness" },
  { label: "Water", value: null, route: "/fitness" },
  { label: "Gym", value: null, route: "/workout" },
  { label: "Calories", value: null, route: "/fitness" },
]);

onMounted(async () => {
  const userId=auth.currentUser.uid;
  const userDocRef=doc(db,"users",userId);
  const docSnap=await getDoc(userDocRef);

  if(docSnap.exists()){
    fitnessData.value[0].value=docSnap.data().sleep || "Nothing is added yet";
  }else{
    console.log("No such document");
  }
})

const navigate = (route) => {
  router.push(route);
};
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Hello Anastasija</h1>
      <p class="date">{{today}}</p>
    </header>

    <h2 class="overview-title">Fitness Overview</h2>

    <div class="grid">
      <div
          v-for="(item, index) in fitnessData"
          :key="index"
          class="fitness-card"
      >
        <p class="label">{{ item.label }}</p>
        <p class="value">
          {{ item.value ? `${item.value} hours` : `Nothing is added yet` }}
        </p>
        <button
            @click="navigate(item.route)"
            class="edit-button"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.app {
  background-color: white;
  min-height: 100vh;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #ddd;
  color: #FFCABD;
}

.header h1 {
  font-size: 28px;
  font-weight: bold;
}

.date {
  font-size: 24px;
}

.overview-title {
  font-size: 16px;
  font-weight: bold;
  color: #FFCABD;
  text-align: center;
  margin-top: 15px;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.fitness-card {
  background-color: #f6f1f1;
  border: 1px solid #FFCABD;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fitness-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.label {
  font-size: 17px;
  font-family: Arial, Helvetica, sans-serif;
  color: #FF8484;
}

.value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}


.edit-button {
  margin-top: 8px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #FF8484;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #ff7676;
}

@media (min-width: 600px) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .fitness-card {
    width: 45%;
  }
}
</style>