<template>
  <div class="home">
    <header class="header">
      <button class="home-button" @click="$router.push('/')">🏠</button>
      <h1 class="title">Sélectionnez une semaine</h1>
    </header>

    <div class="content">
      <div v-if="loading" class="loading">Chargement des semaines...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="categories.length > 0" class="categories-list">
        <button
            v-for="category in categories"
            :key="category.id"
            @click="startQuiz(category.id, category.name)"
            :disabled="isLocked(category.unlockDate)"
            :class="{ locked: isLocked(category.unlockDate) }"
            class="category-button"
            :title="isLocked(category.unlockDate) ? `Disponible le ${formatDate(category.unlockDate)}` : ''"
        >
          {{ category.name }}
          <span v-if="isLocked(category.unlockDate)" class="lock-icon">🔒</span>
          <span v-if="isLocked(category.unlockDate)" class="tooltip">
            Disponible le {{ formatDate(category.unlockDate) }}
          </span>
        </button>
      </div>
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
  computed: {
    todayDate() {
      return new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await apiClient.get("/categories");
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        this.categories = response.data;
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
    isLocked(unlockDate) {
      return unlockDate && !(unlockDate <= this.todayDate);
    },
    formatDate(date) {
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options);
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
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

.home-button {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
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

@media (max-width: 600px) {
  .home-button {
    left: 10px;
    font-size: 1.5rem;
  }
  .title {
    font-size: 2rem;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  color: white;
}

.loading,
.error {
  font-size: 1.2rem;
  color: white;
  margin: 20px;
}

.error {
  color: red;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  max-width: 600px;
  margin-top: 20px;
}

.category-button {
  background: linear-gradient(135deg, #5da5b3, #0072ce);
  color: white;
  font-size: 1.2rem;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.category-button:hover {
  background: linear-gradient(135deg, #6dc6d1, #005bb5);
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.category-button:active {
  transform: scale(0.95);
}

.category-button.locked {
  background: #aaa;
  cursor: not-allowed;
  opacity: 0.6;
}

/* 🔹 Tooltip pour afficher la date au hover */
.category-button.locked:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.lock-icon {
  margin-left: 10px;
}
</style>
