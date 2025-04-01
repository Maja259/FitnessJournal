<template>
  <div class="tracker">
    <h2>How well have you eaten today?</h2>
    <p v-if="calories !== null">{{ calories }} kcal - {{ statusMessage }}</p>
    <button @click="popupOpen = true" class="calories-button"></button>

    <CaloriePopup
        :isOpen="popupOpen"
        @save="updateCalories"
        @close="popupOpen = false"
    />
  </div>
</template>

<script>
import CaloriePopup from "@/components/Fitness/CaloriePopup.vue";

export default {
  components: {
    CaloriePopup
  },
  data() {
    return {
      calories: null,
      popupOpen: false
    };
  },
  computed: {
    statusMessage() {
      return this.getStatusMessage(this.calories);
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
    updateCalories(value) {
      this.calories = value;
      this.popupOpen = false;
    }
  }
};
</script>

<style>
.tracker {
  margin: 20px;
  text-align: center;
}
h2 {
  color: #ff7676;
}
p {
  color: #ff7676;
}
.calories-button {
  width: 50px;
  height: 50px;
  background-image: url("../../assets/icons8-healthy-food-60.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}
</style>
