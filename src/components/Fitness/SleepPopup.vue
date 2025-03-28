<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <button class="close-btn" @click="closePopup">✖</button>
        <h2>Select Sleep Duration</h2>

        <div class="sleep-circle">
          <span class="hours-display">{{ sleepHours }} hr</span>
          <input
              type="range"
              min="1"
              max="12"
              v-model="sleepHours"
              class="sleep-slider"
          />
        </div>

        <button class="save-btn" @click="saveSleepHours">Save</button>
      </div>
    </div>
  </Teleport>
</template>

<script>
import {doc,setDoc} from "firebase/firestore"
import {db,auth} from "@/firebase"
export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      sleepHours: 6,
    };
  },
  emits: ["close", "save"],
  methods: {
    closePopup() {
      this.$emit("close");
    },
    async saveSleepHours() {
      try{
        const userId=auth.currentUser.uid;
        await setDoc(doc(db,"users",userId),{
          sleep: this.sleepHours,
        }, {merge:true});
        this.$emit("save",this.sleepHours);
        this.closePopup();
      }catch (error){
        console.error("Error saving sleep hours error:", error);
      }
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #4D1431;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  width: 300px;
  color: white;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
}

.sleep-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #ff7676, #FF8484);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  position: relative;
}

.hours-display {
  font-size: 24px;
  font-weight: bold;
}

.sleep-slider {
  position: absolute;
  bottom: -10px;
  width: 100%;
}

.save-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #ff7676;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
</style>
