<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">KPT Online</h1>
      <p class="lead">Board: {{ board.name }}</p>
      <hr class="my-4" />
      <p v-if="user">Hello: {{ user.name }}</p>
      <div v-else>
        <input type="text" v-model="email" />
        <input type="text" v-model="name" />
        <button @click="submit">Submit</button>
      </div>

      <div class="input-group mb-3" v-if="user">
        <select class="form-control" v-model="card.type">
          <option value="null">Choose...</option>
          <option value="1">Keep</option>
          <option value="2">Problem</option>
          <option value="3">Try</option>
        </select>
        <input type="text" class="form-control" placeholder="Content" v-model="card.content" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="createCard">Create</button>
        </div>
      </div>
    </div>

    <Cards :cards="cards" />
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

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
      card: {
        type: null,
        content: null,
        board: this.$route.params.id,
        user: null
      },
      socket: io("localhost:8080"),
      user: null
    };
  },
  mounted: function() {
    this.socket.on("ON_USER_JOIN", data => {
      this.$toasted.show(data);
    });

    this.socket.on("ON_CREATE_CARD", data => {
      const card = data.card;
      this.cards.push(card);
      this.card = {
        type: null,
        content: null,
        board: this.$route.params.id,
        user: this.user.id
      };
      this.$toasted.show(`Card: type: ${card.type}, content: ${card.content}`);
    });
  },
  created: function() {
    this.fetchCards();

    if (this.$store.state.user) {
      this.user = this.$store.state.user;

      this.socket.emit("USER_JOIN", {
        name: this.user.name
      });
    }
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
      this.$store.dispatch("setUser", this.user);
      this.socket.emit("USER_JOIN", {
        name: this.user.name
      });
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

      this.socket.emit("CREATE_CARD", {
        card: response.data
      });
    }
  }
};
</script>

<style>
</style>