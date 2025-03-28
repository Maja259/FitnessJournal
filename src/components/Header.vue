<script setup>
import logo from '../assets/F (1).png';
</script>

<template>
  <header class="header">
    <div class="logo">
      <img :src="logo" alt="logo">
    </div>

    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/fitness">Fitness</router-link></li>
        <li><router-link to="/workout">Workout</router-link></li>
        <li><router-link to="/login">Log in</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 110px;
  background-color: #4D1431;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
}

.logo img {
  width: 80px;
  height: auto;
  padding-left: 20px;
}

.navbar {
  flex-grow: 1;
  text-align: center;
}

.navbar ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar li {
  margin: 0 10px;
  font-size: 16px;
  padding: 10px;
  color: #FFCABD;
  white-space: nowrap;
}
.navbar a {
  color: #FFCABD;
  text-decoration: none;
}
.navbar li a:hover {
  background-color: #FFCABD;
  color: #4D1431;
  transition: all 0.3s ease;
  border-radius: 10px;
}
.navbar li:hover {
  background-color: #FFCABD;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 0 0;
  }

  .navbar ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .navbar li {
    font-size: 14px;
    padding: 8px;
    margin: 5px;
  }
}
</style>
