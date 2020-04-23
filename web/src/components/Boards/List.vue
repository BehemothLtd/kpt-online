<template>
  <div>
    <div>
      <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">
          <template v-slot:header>
            <h6 class="mb-0">Board list</h6>
          </template>
          <b-card-text>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Created at</th>
                  <th scope="col">Updated at</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.id" @click="goto(item)">
                  <th>{{item.id}}</th>
                  <th>{{item.name}}</th>
                  <th>{{item.createdAt}}</th>
                  <th>{{item.updatedAt}}</th>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try{
        const result = await this.$axios.get('/boards');
        console.log(result.data)
        this.list = result.data
      }
      catch(e) {
        console.log(e);
      }
      
    },
    goto(item){
      console.log(item);
      this.$router.push(`board/${item.id}`)
    }
  }
};
</script>

<style>
</style>