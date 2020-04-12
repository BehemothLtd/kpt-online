<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Vue App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/board-list">Board</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-if="activeUser">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeUser: null
    };
  },
  mounted() {
    this.activeUser = window.localStorage.getItem("token");
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.activeUser = null;
      this.$router.push("/");
    }
  }
};
</script>
