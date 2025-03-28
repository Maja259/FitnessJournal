<template>
  <div class="tracker">
    <h2>How many glasses of water have you drunk today?</h2>
    <p>{{ waterCount }} glasses</p>
    <button @click="increaseWater">➕</button>
    <button class="water-image"></button>
    <button @click="decreaseWater">➖</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waterCount: 0,
    };
  },
  methods: {
    increaseWater() {
      this.waterCount++;
    },
    decreaseWater() {
      if (this.waterCount > 0) this.waterCount--;
    },
  },
};
</script>

<style>
.tracker {
  margin: 20px;
}
.water-image{
  width: 40px;
  height: 40px;
  background-image: url("../../assets/icons8-sparkling-water-50.png");
  background-size: cover;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
