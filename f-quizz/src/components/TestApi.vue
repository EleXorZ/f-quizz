<template>
  <div>
    <h1>API Test</h1>
    <button @click="callPingApi">Test API</button>
    <p v-if="response">Réponse : {{ response }}</p>
  </div>
</template>

<script>
import apiClient from '../api';

export default {
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async callPingApi() {
      try {
        const res = await apiClient.get('/ping');
        this.response = res.data;
      } catch (error) {
        console.error('Erreur API :', error);
        this.response = 'Erreur API';
      }
    },
  },
};
</script>