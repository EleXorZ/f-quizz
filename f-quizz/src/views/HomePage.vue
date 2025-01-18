<template>
  <div class="home">
    <header class="header">
      <h1>Antibioquiz</h1>
    </header>

    <main class="main">
      <button class="btn" @click="goToCategories">Démarrer une session</button>
      <button class="btn" @click="startPeleMele">Questions aléatoires</button>
    </main>

    <footer class="footer">
      <router-link to="/rules">Règles du jeu</router-link>
      <router-link to="/credits">Crédits</router-link>
    </footer>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  components: {
  },
  methods: {
    goToCategories() {
      this.$router.push({name:"Categories"})
    },
    startPeleMele() {
      this.$router.push({name:"PeleMele"});
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background: #f5f9ff;
  color: #333;
  text-align: center;
}

.header {
  margin-top: 20px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #00a2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn:hover {
  background-color: #007acc;
}

footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}
router-link {
  color: #0072ce;
  text-decoration: none;
}
router-link:hover {
  text-decoration: underline;
}
</style>
