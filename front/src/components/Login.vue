<template>
  <b-card no-body class="overflow-hidden mx-auto mt-4" style="max-width: 720px">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img
          src="https://cf.shopee.com.my/file/3ddcf2563df025b599f2218ee4d7223d"
          class="rounded-0"
        ></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Login">
          <b-form @submit="submit">
            <b-form-group label="Email:">
              <b-form-input v-model="email" type="email" required placeholder="Enter email"></b-form-input>
            </b-form-group>

            <b-form-group label="Password:">
              <b-form-input
                type="password"
                v-model="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false
    };
  },
  methods: {
    submit() {}
  }
};
</script>

<style>
</style>