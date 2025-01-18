<template>
  <div>
    <h1>Quiz : {{ categoryName }}</h1>
    <h2 v-if="loading">Chargement des questions...</h2>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Barre de progression -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <!-- Affichage de la question -->
    <div v-if="!loading && !isQuizFinished">
      <h2>{{ currentQuestion.text }}</h2>

      <!-- Liste des réponses -->
      <ul>
        <li
            v-for="(answer) in currentQuestion.answers"
            :key="answer.id"
            :class="{
              selected: selectedAnswer?.id === answer.id,
              correct: showFeedback && answer.correct,
              incorrect: showFeedback && selectedAnswer?.id === answer.id && !answer.correct,
            }"
            @click="selectAnswer(answer)"
        >
          {{ answer.text }}
        </li>
      </ul>


      <!-- Bouton Valider -->
      <button
          :disabled="selectedAnswer === null"
          v-if="!showFeedback"
          @click="validateAnswer"
      >
        Valider
      </button>

      <!-- Feedback et actions après validation -->
      <div v-if="showFeedback">
        <p v-if="selectedAnswer && selectedAnswer.correct">
          🎉 Bonne réponse !
        </p>
        <p v-else>
          ❌ Mauvaise réponse. La bonne réponse est
          <strong>{{ getCorrectAnswerText(currentQuestion) }}</strong>.
        </p>

        <!-- Bouton Explication -->
        <button @click="openExplanation">Explication</button>

        <!-- Bouton Question suivante ou Terminer -->
        <button v-if="!isLastQuestion" @click="nextQuestion">Question suivante</button>
        <button v-else @click="finishQuiz">Terminer</button>
      </div>
    </div>

    <!-- Résultat final -->
    <div v-else>
      <h2>Quiz terminé 🎉</h2>
      <p>Vous avez obtenu un score de {{ score }} / {{ questions.length }}.</p>
      <button @click="quitQuiz">Quitter</button>
    </div>

    <!-- Popup Explication -->
    <div v-if="showExplanationPopup" class="popup">
      <div class="popup-content">
        <h3>Explication</h3>
        <p>{{ currentQuestion.description }}</p>
        <button @click="closeExplanation">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";
import apiClient from "@/api";

export default {
  name: "Quiz",
  data() {
    return {
      selectedAnswer: null,
      showFeedback: false,
      showExplanationPopup: false,
      currentIndex: 0,
      score: 0,
      isQuizFinished: false,
      isConfettiRunning: false,
      categoryName: "",
      questions: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
    isLastQuestion() {
      return this.currentIndex === this.questions.length - 1;
    },
    progressPercentage() {
      return ((this.currentIndex + 1) / this.questions.length) * 100;
    },
  },
  methods: {
    async fetchQuestions(categoryId) {
      try {
        const response = await apiClient.get('/questions', {
          params: {
            categoryId: categoryId,
          },
        });
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des questions");
        }
        this.questions = await response.data;
        this.categoryName = this.$route.params.categoryName || "Quiz";
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchRandomQuestions(numberOfQuestions) {
      try {
        const response = await apiClient.get('/questions/random', {
          params: { numberOfQuestions: numberOfQuestions },
        });
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des questions");
        }
        this.questions = await response.data;
        this.categoryName = this.$route.params.categoryName || "Quiz";
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    selectAnswer(answer) {
      if (!this.showFeedback) {
        this.selectedAnswer = answer;
      }
    },
    validateAnswer() {
      // Vérifier si une réponse a été sélectionnée
      if (this.selectedAnswer) {
        // Chercher la réponse correcte dans le tableau 'answers'
        const correctAnswer = this.currentQuestion.answers.find(answer => answer.correct);

        // Comparer l'ID de la réponse sélectionnée avec l'ID de la bonne réponse
        if (this.selectedAnswer.id === correctAnswer.id) {
          this.score++;
        }
      }
      this.showFeedback = true;
    },
    getCorrectAnswerText(question) {
      const correctAnswer = question.answers.find(answer => answer.correct);
      return correctAnswer ? correctAnswer.text : 'Aucune réponse correcte';
    },
    openExplanation() {
      this.showExplanationPopup = true;
    },
    closeExplanation() {
      this.showExplanationPopup = false;
    },
    nextQuestion() {
      this.selectedAnswer = null;
      this.showFeedback = false;
      this.currentIndex++;
    },
    finishQuiz() {
      this.isQuizFinished = true;
      if (this.score === this.questions.length) {
        this.triggerConfetti();
      }
    },
    quitQuiz() {
      this.isConfettiRunning = false;
      this.$router.push({ name: "Home" });
    },
    triggerConfetti() {
      this.isConfettiRunning = true;
      const colors = ["#bb0000", "#ffffff"];
      const shoot = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
      };

      const interval = setInterval(() => {
        if (!this.isConfettiRunning) {
          clearInterval(interval);
        } else {
          shoot();
        }
      }, 100);
    },
  },
  mounted() {
    const categoryId = this.$route.params.categoryId;
    const numberOfQuestions = this.$route.params.numberOfQuestions;
    if (categoryId) {
      this.fetchQuestions(categoryId);
    } else if (numberOfQuestions) {
      this.fetchRandomQuestions(numberOfQuestions);
    } else {
      this.error = "ID manquant!";
      this.loading = false;
    }
  },
};
</script>


<style>
.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 20px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}

/* Styles des réponses */
li {
  list-style: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}

li.selected {
  background-color: #f0f0f0;
}

li.correct {
  background-color: #4caf50;
  color: white;
}

li.incorrect {
  background-color: #f44336;
  color: white;
}

button {
  margin: 10px 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Styles pour la popup */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 400px;
}
</style>
