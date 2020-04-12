<template>
  <div>
    {{ board.name }}
    <div v-if="!user">
      <input type="text" v-model="email" />
      <input type="text" v-model="name" />
      <button @click="submit">Submit</button>
    </div>
    <div v-else>
      {{ user }}
      <div>
        Create card
        type:
        <input type="text" v-model="card.type" />
        content:
        <input type="text" v-model="card.content" />

        <button @click="createCard">Submit</button>
      </div>
    </div>
    <Cards :cards="cards" />
  </div>
</template>

<script>
import axios from "axios";

import Cards from "./Cards";

export default {
  components: {
    Cards
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      email: null,
      name: null,
      cards: [],
      user: null,
      card: {
        type: null,
        content: null,
        board: this.$route.params.id,
        user: null
      }
    };
  },
  created: function() {
    this.fetchCards();
  },
  methods: {
    fetchCards: async function() {
      const response = await axios.get(
        `http://localhost:8080/api/boards/${this.$route.params.id}/cards`
      );

      this.cards = response.data;
    },
    submit: async function() {
      const response = await axios.post(
        `http://localhost:8080/api/boards/${this.$route.params.id}/createUser`,
        {
          email: this.email,
          name: this.name
        }
      );

      this.user = response.data;
    },
    createCard: async function() {
      const response = await axios.post(
        `http://localhost:8080/api/boards/${this.$route.params.id}/createCard`,
        {
          type: this.card.type,
          content: this.card.content,
          user: this.user.id,
          board: this.board
        }
      );

      this.cards.push(response.data);
    }
  }
};
</script>

<style>
</style>