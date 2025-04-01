<template>
  <div class="workout-page">
    <h2>Workout Progress</h2>

    <div class="progress-container">
      <p>Week {{ registrationWeek }} - {{ workoutsThisWeek }}/{{ weeklyGoal }} workouts completed</p>
      <progress :value="workoutsThisWeek" :max="weeklyGoal"></progress>
    </div>

    <h3>Workout History</h3>
    <ul>
      <li v-for="workout in workoutHistory" :key="workout.id">
        📅 Week {{ workout.week }} - {{ workout.type }} ({{ workout.duration }} min)
      </li>
    </ul>

    <button @click="showPopup = true">➕ Add Workout</button>

    <WorkoutPopup
        v-if="showPopup"
        @save="addWorkout"
        @close="showPopup = false"
    />
  </div>
</template>

<script>
import WorkoutPopup from "@/components/Workout/WorkoutPopup.vue";

export default {
  components: { WorkoutPopup },
  data() {
    return {
      weeklyGoal: 4,
      workoutsThisWeek: 0,
      workoutHistory: [],
      registrationDate: this.getRegistrationDate(),
      registrationWeek: this.getWeeksSinceRegistration(),
      showPopup: false,
    };
  },
  methods: {
    getRegistrationDate() {

      return localStorage.getItem("registrationDate") || new Date().toISOString().split("T")[0];
    },
    getWeeksSinceRegistration() {
      const registration = new Date(this.registrationDate);
      const today = new Date();
      const differenceInDays = Math.floor((today - registration) / (1000 * 60 * 60 * 24));
      return Math.ceil(differenceInDays / 7);
    },
    addWorkout(workout) {
      workout.week = this.registrationWeek;
      this.workoutHistory.push(workout);
      this.workoutsThisWeek++;

      if (this.getWeeksSinceRegistration() !== this.registrationWeek) {
        this.registrationWeek = this.getWeeksSinceRegistration();
        this.workoutsThisWeek = 0;
      }

      this.showPopup = false;
    }
  }
};
</script>

<style>
.workout-page {
  text-align: center;
  padding-top: 30px;
}
.progress-container progress {
  width: 100%;
  height: 10px;
}
</style>
