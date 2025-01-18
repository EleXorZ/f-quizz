<template>
  <div class="rules">
    <h1>Règles du jeu</h1>
    <p>
      Bienvenue dans UEL Quiz ! Voici comment jouer :
      <ul>
        <li>Choisissez une catégorie ou le mode pêle-mêle.</li>
        <li>Répondez aux questions avant la fin du temps imparti.</li>
        <li>Chaque bonne réponse vous rapporte un point !</li>
      </ul>
      Bonne chance et amusez-vous bien !
    </p>
  </div>
</template>

<script>
export default {
  name: "Rules",
};
</script>

<style scoped>
.rules {
  padding: 20px;
  text-align: center;
}
h1 {
  color: #0072ce;
}
p {
  font-size: 16px;
}
</style>
