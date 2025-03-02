<template>
  <div>
    <h2>Statistiques</h2>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="(data, category) in clicksData" :key="category">
          {{ category }} : Total {{ data.total }} | Aujourd'hui {{ data.today }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  name: "Stats",
  data() {
    return {
      categories: [],
      clicksData: {},
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await apiClient.get("/categories");
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des catégories");
        }

        this.categories = [...response.data, { name: "Démarrer une partie" }, { name: "Pele Mele" }];

        await this.fetchClicksData();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchClicksData() {
      try {
        const requests = this.categories.map(async (category) => {
          const [totalRes, todayRes] = await Promise.all([
            apiClient.get("/clicks/all", { params: { text: category.name } }),
            apiClient.get("/clicks/today", { params: { text: category.name } })
          ]);

          return {
            [category.name]: {
              total: totalRes.data,
              today: todayRes.data
            }
          };
        });

        const results = await Promise.all(requests);
        this.clicksData = Object.assign({}, ...results);
      } catch (err) {
        this.error = "Erreur lors de la récupération des clics";
      }
    },
  },
  async mounted() {
    await this.fetchCategories();
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
