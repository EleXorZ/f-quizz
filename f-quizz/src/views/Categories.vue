<template>
  <div>
    <h1>Sélectionnez une catégorie</h1>
    <div v-if="loading">Chargement des catégories...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="categories.length > 0">
      <button
          v-for="category in categories"
          :key="category.id"
          @click="startQuiz(category.id, category.name)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  name: "Categories",
  data() {
    return {
      categories: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await apiClient.get('/categories');
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        this.categories = await response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    startQuiz(categoryId, categoryName) {
      this.$router.push({
        name: "Quiz",
        params: { categoryId, categoryName },
      });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.error {
  color: red;
}
button {
  margin: 5px;
  padding: 10px;
  background-color: #0072ce;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #005bb5;
}
</style>
