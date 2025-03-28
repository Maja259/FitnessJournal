<script>

import Header from "@/components/Header.vue";
export default {
  name: "App1",
  components: {
    Header
  }
}
</script>

<template>
  <div id="App1">
    <Header></Header>
    <div class="component">
       <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.component {
  margin-top: 120px;
}
</style>
