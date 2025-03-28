<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <button class="close-btn" @click="closePopup">✖</button>
      <h2>Enter Calories</h2>

      <input
          type="number"
          v-model="caloriesInput"
          placeholder="Enter kcal"
          class="calorie-input"
      />

      <p v-if="caloriesInput !== ''">{{ caloriesInput }} kcal - {{ computedMessage }}</p>

      <button class="save-btn" @click="saveCalories">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      caloriesInput: "",
    };
  },
  computed: {
    computedMessage() {
      return this.getStatusMessage(this.caloriesInput);
    }
  },
  methods: {
    getStatusMessage(value) {
      if (!value || isNaN(value)) return "";
      if (value >= 1200 && value <= 1500) return "You are on the right track!";
      if (value > 1500 && value <= 2500) return "Keep going!";
      if (value > 2500) return "Good job for the day!";
      return "";
    },
    saveCalories() {
      if (!isNaN(this.caloriesInput) && this.caloriesInput !== "") {
        this.$emit("save", parseInt(this.caloriesInput));
        this.closePopup();
      }
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
  background: #200030;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  width: 300px;
  color: white;
  position: relative;
}
.calorie-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 18px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: white;
}
.save-btn {
  background: #ff7676;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}
.save-btn:hover {
  background: #ff5050;
}
</style>
