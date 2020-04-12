<template>
  <div class="p-4">
    <div>
      <b-input-group prepend="Add a new board" class="mb-4">
        <b-form-input v-model="newBoard.name"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" @click="addBoard">Add</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <b-table-simple striped hover :items="list">
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>User created</b-th>
          <b-th>Created at</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in list" :key="item.id">
          <b-td>
            <b-link :href="'/#/board/'+item.boardId._id">{{ item.boardId.name }}</b-link>
          </b-td>
          <b-td>{{ item.boardId.createdBy.email }}</b-td>
          <b-td>{{ item.boardId.createdAt }}</b-td>
          <b-td>
            <b-button pill variant="outline-danger" @click="deleteBoard(item)">Delete</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      newBoard: {
        name: ""
      },
      list: [],
      socket: io(this.$apiURL),
      baseURL: this.$apiURL + "/api/board_members/"
    };
  },
  created() {
    this.fetchList();
  },
  mounted() {
    this.socket.on("BOARD_CREATED", data => {
      this.fetchList();
    });

    this.socket.on("BOARD_DELETED", data => {
      this.fetchList();
    });
  },
  methods: {
    async fetchList() {
      const result = await this.$axios.get(this.baseURL);
      this.list = result.data;
    },
    async addBoard() {
      if (this.newBoard.name) {
        const result = await this.$axios.post(this.$apiURL + "/api/boards", {
          name: this.newBoard.name
        });
        if (result) {
          this.socket.emit("CREATE_BOARD", result.data);
          this.newBoard.name = "";
        }
      }
    },
    deleteBoard(item) {
      this.$bvModal
        .msgBoxConfirm('Are you sure to delete this board:"' + item.name + '"?')
        .then(async value => {
          if (value) {
            const result = await this.$axios.delete(this.baseURL + item.id);
            if (result) this.socket.emit("DELETE_BOARD", result.data);
          }
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