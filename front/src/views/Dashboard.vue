<template>
  <div class="home">
    Please input your board name: <input type="text" v-model="boardName"/>
    <button class="button" @click="submit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Dashboard',
  data: function() {
    return {
      boardName: ''
    }
  },
  methods: {
    submit: async function() {
      const response = await axios.post("http://localhost:8080/api/boards", {
        name: this.boardName
      });

      console.log(response.data);
      this.$router.push({ path: `/boards/${response.data.id}` })
    }
  }
}
</script>
