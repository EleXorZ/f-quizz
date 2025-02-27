<template>
  <div class="home">
    <header class="header">
      <button class="home-button" @click="$router.push('/')">🏠︎</button>
      <h1 class="title">Règles du jeu</h1>
    </header>

    <div class="rules-container">
      <p class="intro">Bienvenue dans <strong>UEL Quiz</strong> ! Voici comment jouer :</p>
      <ul class="rules-list">
        <li>📝 Choisissez une catégorie ou le mode pêle-mêle</li>
        <li>⏳ Répondez aux questions</li>
        <li>🏆 Chaque bonne réponse vous rapporte un point !</li>
      </ul>
      <p class="good-luck">Bonne chance ! 🎉</p>
    </div>

    <button class="start-btn" @click="goToCategories">Commencer</button>

  </div>
</template>

<script>
export default {
  name: "Rules",
  methods: {
    goToCategories() {
      this.$router.push({name: "Categories"});
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Pacifico&display=swap');

.home {
  background-color: #2E414D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
}

.home-button {
  position: absolute;
  left: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

@media (max-width: 600px) {
  .home-button {
    display: none;
  }
}

.home-button:hover {
  opacity: 0.7;
}

.title {
  font-family: 'DynaPuff', cursive;
  font-size: 3rem;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.rules-container {
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  color: white;
}

.intro {
  font-size: 18px;
  font-weight: 600;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.rules-list li {
  font-size: 18px;
  padding: 10px 0;
}

.rules-list li {
  all: unset;
  display: block;
  font-size: 18px;
  padding: 10px 0;
  color: white;
}

.good-luck {
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
}

.start-btn {
  text-align: center;
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: #4CAF50;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.start-btn:hover {
  background: #5DD167;
  box-shadow: 0 0 15px #5DD167, 0 0 30px rgba(93, 209, 103, 0.6);
  transform: scale(1.05);
}

.start-btn:active {
  transform: scale(0.98);
}
</style>
