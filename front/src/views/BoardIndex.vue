<template>
  <div>
    <Board :board="board" v-if="board" />
  </div>
</template>

<script>
import axios from "axios";

import Board from "@/components/Board";

export default {
  components: {
    Board
  },
  data: function() {
    return {
      board: null,
    };
  },
  created: function() {
    this.fetchBoardData();
  },
  methods: {
    fetchBoardData: async function() {
      const response = await axios.get(
        `http://localhost:8080/api/boards/${this.$route.params.id}`
      );

      this.board = response.data;
    }
  }
};
</script>