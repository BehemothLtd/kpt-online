<template>
  <div class="board p-4">
    <div>
      <b-input-group prepend="Board name" class="mb-4 mr-4">
        <b-form-input v-model="boardName"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-primary" @click="rename">Rename</b-button>
        </b-input-group-append>
      </b-input-group>

      <export-pdf id="output"></export-pdf>
    </div>

    <b-row id="output">
      <b-col>
        <h1>
          Keep
          <b-button pill variant="outline-success" @click="addSticky('k')">Add</b-button>
        </h1>

        <b-row>
          <b-col v-for="(item, index) in keeps" :key="index" cols="12">
            <Sticky
              :data="item"
              class="mb-4"
              :index="index"
              @add="addSticky('k')"
              @close="removeKeep('k', item.id)"
            ></Sticky>
          </b-col>
        </b-row>
      </b-col>

      <b-col>
        <h1>
          Problem
          <b-button pill variant="outline-success" @click="addSticky('p')">Add</b-button>
        </h1>

        <b-row>
          <b-col v-for="(item, index) in problems" :key="index" cols="12">
            <Sticky
              :data="item"
              class="mb-4"
              :index="index"
              @add="addSticky('p')"
              @close="removeKeep('p', item.id)"
            ></Sticky>
          </b-col>
        </b-row>
      </b-col>

      <b-col>
        <h1>
          Try
          <b-button pill variant="outline-success" @click="addSticky('t')">Add</b-button>
        </h1>

        <b-row>
          <b-col v-for="(item, index) in tries" :key="index" cols="12">
            <Sticky
              :data="item"
              class="mb-4"
              :index="index"
              @add="addSticky('t')"
              @close="removeKeep('t', item.id)"
            ></Sticky>
          </b-col>
        </b-row>
      </b-col>

      <b-col xs="12" sm="6" md="3">
        <BoardMember />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sticky from "./Sticky";
import BoardMember from "./BoardMember";
import io from "socket.io-client";
import ExportPdf from "./ExportPdf";

export default {
  components: {
    Sticky,
    BoardMember,
    ExportPdf
  },
  data() {
    return {
      keeps: [],
      problems: [],
      tries: [],
      boardId: this.$route.params.id,
      boardName: "",
      socket: io(this.$apiURL)
    };
  },
  created() {
    this.fetchBoard();
    this.fetchStickies();
  },
  mounted() {
    this.socket.on("STICKY_CREATED", data => {
      if (this.boardId != data.boardId) return;

      switch (data.type) {
        case "k":
          this.keeps.push(data);
          break;
        case "p":
          this.problems.push(data);
          break;
        case "t":
          this.tries.push(data);
          break;
      }
    });

    this.socket.on("STICKY_DELETED", data => {
      if (this.boardId != data.boardId) return;

      let index = -1;
      switch (data.type) {
        case "k":
          index = this.findInArray(data.id, this.keeps);
          if (index != -1) this.keeps.splice(index, 1);
          break;

        case "p":
          index = this.findInArray(data.id, this.problems);
          if (index != -1) this.problems.splice(index, 1);
          break;

        case "t":
          index = this.findInArray(data.id, this.tries);
          if (index != -1) this.tries.splice(index, 1);
          break;
      }
    });

    this.socket.on("BOARD_RENAMED", data => {
      if (this.boardId == data.id) {
        this.boardName = data.name;
      }
    });
  },
  methods: {
    async fetchBoard() {
      const result = await this.$axios.get(
        this.$apiURL + "/api/boards/" + this.boardId
      );
      if (result.data) this.boardName = result.data.name;
    },

    async fetchStickies() {
      const result = await this.$axios.get(
        this.$apiURL + "/api/stickies?boardId=" + this.boardId
      );

      if (result.data) {
        this.keeps = result.data.filter(item => item.type == "k");
        this.problems = result.data.filter(item => item.type == "p");
        this.tries = result.data.filter(item => item.type == "t");
      }
    },

    async addSticky(type) {
      const result = await this.$axios.post(this.$apiURL + "/api/stickies", {
        boardId: this.boardId,
        type: type,
        createdBy: "5e92e79a1278b456ccc89869"
      });

      if (result.data) this.socket.emit("CREATE_STICKY", result.data);
    },

    async removeKeep(type, id) {
      const result = await this.$axios.delete(
        this.$apiURL + "/api/stickies/" + id
      );
      if (result.data) this.socket.emit("DELETE_STICKY", result.data);
    },

    async rename() {
      const result = await this.$axios.put(
        this.$apiURL + "/api/boards/" + this.boardId,
        { name: this.boardName }
      );

      if (result.data) this.socket.emit("RENAME_BOARD", result.data);
    },

    findInArray(id, array) {
      return array.findIndex(item => item.id == id);
    }
  }
};
</script>

<style>
</style>