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
            <b-link :href="'/#/board/'+item.id">{{ item.name }}</b-link>
          </b-td>
          <b-td>{{ item.created_by }}</b-td>
          <b-td>{{ item.created_at }}</b-td>
          <b-td>
            <b-button pill variant="outline-danger" @click="deleteBoard(item)">Delete</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBoard: {
        name: ""
      },
      list: [
        {
          id: 1,
          name: "Week 01",
          created_by: "VuTH",
          created_at: Date()
        },
        {
          id: 2,
          name: "Week 02",
          created_by: "BachDX",
          created_at: Date()
        }
      ]
    };
  },
  methods: {
    addBoard() {
      if (this.newBoard.name) {
        this.list.push({
          name: this.newBoard.name,
          created_by: "VuTH",
          created_at: Date()
        });

        this.newBoard.name = "";
      }
    },
    deleteBoard(item) {
      this.$bvModal
        .msgBoxConfirm('Are you sure to delete this board:"' + item.name + '"?')
        .then(value => {
          if (value) {
          }
        });
    }
  }
};
</script>

<style>
</style>