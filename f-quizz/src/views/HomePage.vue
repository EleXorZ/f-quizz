<template>
  <div class="home">
    <header class="header">
      <h1 class="title">Antibioquiz</h1>
    </header>

    <main class="main">
      <div class="button-container">
        <button class="glow-btn first-btn" @click="goToCategories">Démarrer une partie</button>
        <button class="glow-btn second-btn" @click="startPeleMele">Pêle-mêle</button>
      </div>
    </main>

    <footer class="footer">
      <router-link to="/rules">Règles du jeu</router-link>
      <router-link to="/credits">Crédits</router-link>
    </footer>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  name: "HomePage",
  methods: {
    goToCategories() {
      apiClient.post('/clicks', null, {
        params: { text: 'Démarrer une partie' }
      });
      this.$router.push({name: "Categories"});
    },
    startPeleMele() {
      apiClient.post('/clicks', null, {
        params: { text: 'Pele Mele' }
      });
      this.$router.push({name: "PeleMele"});
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.home {
  background-color: #2E414D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
}

.header {
  background-color: #5DA5B3;
  box-sizing: border-box;
  clip-path: polygon(0 0, 0 calc(100% - 70px), 50% 100%, 100% calc(100% - 70px), 100% 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 75px 20px;
  position: relative;
  width: 100%;
}

.title {
  font-family: 'DynaPuff', cursive;
  font-size: 3rem;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.footer a {
  color: #0072ce;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.main {
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.glow-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 60px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background: #0072ce;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.first-btn:hover {
  background: #00ce5c;
  box-shadow: 0 0 15px #00ce5c, 0 0 30px rgba(76, 175, 80, 0.6);
  transform: scale(1.05);
}

.second-btn:hover {
  background: #1c99ff;
  box-shadow: 0 0 15px #1c99ff, 0 0 30px rgba(76, 175, 80, 0.6);
  transform: scale(1.05);
}

.glow-btn:active {
  transform: scale(0.98);
}

.first-btn {
  background-color: #00ce5c;
}

</style>