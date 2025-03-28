<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <button class="close-btn" @click="closePopup">✖</button>
      <h2>Add Workout</h2>

      <input type="date" v-model="newWorkout.date" />
      <select v-model="newWorkout.type">
        <option>🏋️ Strength</option>
        <option>🏃 Cardio</option>
        <option>🧘 Yoga</option>
      </select>
      <input type="number" v-model="newWorkout.duration" placeholder="Minutes" />

      <button @click="saveWorkout">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newWorkout: {
        date: "",
        type: "",
        duration: "",
      }
    };
  },
  methods: {
    saveWorkout() {
      this.$emit("save", this.newWorkout);
      this.closePopup();
    },
    closePopup() {
      this.$emit("close");
    }
  }
};
</script>

<style>
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
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
