<template>
  <div class="pele-mele">
    <header class="header">
      <button class="home-button" @click="$router.push('/')">🏠︎</button>
      <h1 class="title">Pele mele</h1>
    </header>

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

.pele-mele {
  background-color: #2E414D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-align: center;
  width: 100%;
}

.input {
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #00a2ff;
  width: 60%;
  max-width: 300px;
  text-align: center;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

.input:focus {
  border-color: #007acc;
}

.btn {
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #00a2ff, #007acc);
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background: linear-gradient(135deg, #007acc, #005f99);
  transform: scale(1.05);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.loading {
  font-size: 16px;
  font-weight: bold;
  color: #666;
}

</style>
