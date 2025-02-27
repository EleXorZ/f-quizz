<template>
  <div class="quiz-container">
    <header class="header">
      <button class="home-button" @click="$router.push('/')">🏠︎</button>
      <h1 class="title">Quiz : {{ categoryName }}</h1>
    </header>

    <div class="content">
      <div v-if="loading" class="loading">Chargement des questions...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <div v-if="!loading && !isQuizFinished">
        <h2 class="question-text">{{ currentQuestion.text }}</h2>

        <ul class="answers-list">
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

        <button
            class="validate-button"
            :disabled="selectedAnswer === null"
            v-if="!showFeedback"
            @click="validateAnswer"
        >
          Valider
        </button>

        <div v-if="showFeedback" class="feedback-section">
          <p v-if="selectedAnswer && selectedAnswer.correct" class="correct-text">
            🎉 Bonne réponse !
          </p>
          <p v-else class="incorrect-text">
            ❌ Mauvaise réponse. La bonne réponse est <strong>{{ getCorrectAnswerText(currentQuestion) }}</strong>.
          </p>

          <button class="explanation-button" @click="openExplanation">Explications</button>
          <button v-if="!isLastQuestion" class="next-button" @click="nextQuestion">Question suivante</button>
          <button v-else class="finish-button" @click="finishQuiz">Terminer</button>
        </div>
      </div>

      <div v-if="isQuizFinished" class="result-section">
        <h2>Quiz terminé 🎉</h2>
        <p>Vous avez obtenu un score de <strong>{{ score }} / {{ questions.length }}</strong>.</p>
        <button class="quit-button" @click="quitQuiz">Quitter</button>
      </div>

      <div v-if="showExplanationPopup" class="popup">
        <div class="popup-content">
          <h3>Explications</h3>
          <p>{{ currentQuestion.description }}</p>
          <button class="close-popup-button" @click="closeExplanation">Fermer</button>
        </div>
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
      if (this.selectedAnswer) {
        const correctAnswer = this.currentQuestion.answers.find(answer => answer.correct);

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

<style scoped>
.quiz-container {
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

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  color: white;
}

.loading, .error {
  font-size: 1.2rem;
  color: white;
  margin: 20px;
}

.error {
  color: red;
}

.progress-bar-container {
  width: 80%;
  height: 10px;
  background: #555;
  border-radius: 5px;
  margin: 20px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #5da5b3, #0072ce);
  transition: width 0.5s ease-in-out;
}

.question-text {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 15px;
}

.answers-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.answers-list li {
  background: #5da5b3;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.answers-list li:hover {
  background: #6dc6d1;
  transform: scale(1.05);
}

.answers-list .selected {
  background: #0072ce;
}

.answers-list .correct {
  background: #4caf50;
}

.answers-list .incorrect {
  background: #d32f2f;
}

.validate-button, .next-button, .finish-button, .quit-button, .explanation-button, .close-popup-button {
  background: linear-gradient(135deg, #5da5b3, #0072ce);
  color: white;
  font-size: 1.2rem;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 15px;
}

.explanation-button, .next-button, .finish-button {
  width: 100%;
  max-width: 200px;
}

.validate-button, .explanation-button, .next-button, .finish-button, .quit-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.validate-button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.feedback-section {
  text-align: center;
}

.correct-text {
  color: #4caf50;
}

.incorrect-text {
  color: #d32f2f;
}

.popup {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black;
}

.close-popup-button {
  background: #d32f2f;
}
</style>
