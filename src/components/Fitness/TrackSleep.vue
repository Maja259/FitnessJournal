<template>
  <div class="tracker" id="sleepTracker">
    <h2>Track your sleep</h2>
    <p v-if="sleepHours !== null">You slept for {{ sleepHours }} hours</p>
    <button @click="openPopup" class="sleep-button"></button>

    <SleepPopup
        :isOpen="popupOpen"
        @close="popupOpen = false"
        @save="setSleepHours"
    />
  </div>
</template>

<script>
import SleepPopup from "@/components/Fitness/SleepPopup.vue";
import {auth, db} from "@/firebase"
import {getDoc, doc, setDoc} from "firebase/firestore"
import {ref, onMounted} from "vue";

export default {
  components: { SleepPopup },
  data() {
    return {
      sleepHours: null,
      popupOpen: false,
    };
  },
  methods: {
    openPopup() {
      this.popupOpen = true;
    },
    setSleepHours(hours) {
      this.sleepHours = hours;
      this.saveSleepHoursToFirestore(hours);
    },
    async saveSleepHoursToFirestore(hours) {
      try{
        const user=auth.currentUser;
        if(user){
          const userId=user.uid;
          await setDoc(doc(db,"users",userId),{
            sleep: hours,
        },{merge:true});
      }else{
        console.log("User is not logged in");
        }
      }catch (error) {
        console.error("Error saving sleep hours error:", error);
      }
    },
    async loadSleepHoursFromFirestore(hours) {
      try{
        const user=auth.currentUser;
        if(user){
          const userId=user.uid;
          const docRef=doc(db,"users",userId);
          const docSnap=await getDoc(docRef);

          if(docSnap.exists()){
            this.sleepHours = docSnap.data().sleep || null ;
          }else {
            console.log("No such document");
          }
        }else {
          console.log("User is not logged in");
        }
      }catch (error) {
        console.error("Error getting document", error);
      }
    }
  },
  onMounted() {
    this.loadSleepHoursFromFirestore();
  }
};
</script>

<style>
#sleepTracker {
  padding-top: 30px;
}
.tracker {
  margin: 20px;
  text-align: center;
  padding: 5px;
}
h2 {
  color: #ff7676;
}
p {
  color: #ff7676;
}
.sleep-button {
  width: 50px;
  height: 50px;
  background-image: url("../../assets/icons8-sleep-50.png");
  background-size: cover;
  border: none;
  cursor: pointer;
}
</style>
