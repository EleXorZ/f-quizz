<template>
  <div class="home">
    <header class="header">
      <button class="home-button" @click="$router.push('/')">🏠︎</button>
      <h1 class="title">Crédits</h1>
    </header>

    <div class="credits">
      <p class="dev-name">Cette application a été développée par <strong>Dilys Kevin</strong>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Credits",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff&display=swap');

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

.credits {
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  color: white;
}

.dev-name {
  font-size: 18px;
  font-weight: 600;
}
</style>
