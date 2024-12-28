<template>
  <v-footer class="footer">
    <v-row justify="center" no-gutters>
      <v-col v-for="link in links" :key="link" class="mx-2" cols="auto" sm="auto" md="auto">
        <v-btn
          class="mx-2"
          color="white"
          variant="text"
        >
          {{ link }}
        </v-btn>
      </v-col>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Uel Quiz</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Règle du jeu',
      'Crédits'
    ],
  }),
}
</script>

<style>
.footer {
  background-color: #394054;
}
</style>
