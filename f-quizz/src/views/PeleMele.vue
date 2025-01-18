<template>
  <div class="pele-mele">
    <h1>Choisissez le nombre de questions</h1>
    <div v-if="loading">Chargement du nombre de question total...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <input
        v-model="numberOfQuestions"
        type="number"
        min="1"
        :max="numberAllQuestion"
        placeholder="Entrez le nombre de questions"
        class="input"
    />
    <button @click="startQuiz" class="btn">Commencer le quiz</button>
  </div>
</template>


<script>

import apiClient from "@/api";

export default {
  name: "PeleMele",
  data() {
    return {
      numberAllQuestion: null,
      numberOfQuestions: 5,
      loading: true,
      error: null,
    };
  },
  watch: {
    numberOfQuestions(newValue) {
      if (newValue > this.numberAllQuestion) {
        this.numberOfQuestions = this.numberAllQuestion;
        this.error = `Vous ne pouvez pas demander plus de ${this.numberAllQuestion} questions.`;
      } else {
        this.error = null;
      }
    },
  },
  methods: {
    async fetchNumberOfQuestions() {
      try {
        const response = await apiClient.get('/questions/numberOfQuestions');
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération du nombre de question");
        }
        console.log(response.data)
        this.numberAllQuestion = await response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    startQuiz() {
      if (this.numberOfQuestions > this.numberAllQuestion) {
        this.error = `Vous ne pouvez pas demander plus de ${this.numberAllQuestion} questions.`;
        return;
      }
      this.$router.push({
        name: "RandomQuiz",
        params: {numberOfQuestions: this.numberOfQuestions},
      });
    },
  },
  mounted() {
    this.fetchNumberOfQuestions()
  },
};
</script>

<style scoped>
.pele-mele {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.input {
  padding: 8px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50%;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #00a2ff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

.btn:hover {
  background-color: #007acc;
}
</style>
