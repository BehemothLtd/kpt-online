<template>
  <div class="board p-4">
    <div>
      <b-input-group prepend="Board name" class="mb-4">
        <b-form-input v-model="boardName"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" @click="rename">Rename</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <b-row>
      <b-col xs="12" sm="10">
        <b-row>
          <b-col>
            <h1>
              Keep
              <b-button pill variant="outline-success" @click="addSticky('k')">Add</b-button>
            </h1>

            <b-row>
              <b-col v-for="(item, index) in keeps" :key="index" xs="12" sm="6" md="3">
                <Sticky
                  :data="item"
                  class="mb-4"
                  :index="index"
                  @add="addSticky('k')"
                  @close="removeKeep('k', item.id)"
                ></Sticky>
              </b-col>
            </b-row>

            <h1>
              Problem
              <b-button pill variant="outline-success" @click="addSticky('p')">Add</b-button>
            </h1>

            <b-row>
              <b-col v-for="(item, index) in problems" :key="index" xs="12" sm="6" md="3">
                <Sticky
                  :data="item"
                  class="mb-4"
                  :index="index"
                  @add="addSticky('p')"
                  @close="removeKeep('p', item.id)"
                ></Sticky>
              </b-col>
            </b-row>

            <h1>
              Try
              <b-button pill variant="outline-success" @click="addSticky('t')">Add</b-button>
            </h1>

            <b-row>
              <b-col v-for="(item, index) in tries" :key="index" xs="12" sm="6" md="3">
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
        </b-row>
      </b-col>
      <b-col xs="12" sm="2">
        <BoardMember />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sticky from "./Sticky";
import BoardMember from "./BoardMember";
import io from "socket.io-client";

export default {
  components: {
    Sticky,
    BoardMember
  },
  data() {
    return {
      keeps: [],
      problems: [],
      tries: [],
      boardId: this.$route.params.id,
      boardName: "",
      socket: io("localhost:3001")
    };
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
    addSticky(type) {
      this.socket.emit("CREATE_STICKY", {
        boardId: this.boardId,
        type: type
      });
    },
    removeKeep(type, id) {
      this.socket.emit("DELETE_STICKY", {
        boardId: this.boardId,
        type: type,
        id: id
      });
    },
    rename() {
      this.socket.emit("RENAME_BOARD", {
        id: this.boardId,
        name: this.boardName
      });
    },
    findInArray(id, array) {
      return array.findIndex(item => item.id == id);
    }
  }
};
</script>

<style>
</style>