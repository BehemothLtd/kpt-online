<template>
  <div class="member">
    <h1 class="member-title">Member</h1>
    <div class="member-body">
      <b-row v-for="member in memberList" :key="member.id">
        <a class="remove-btn" href="#" @click.prevent="removeMember(member)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </a>
        &nbsp;
        {{member.name}} - {{member.email}}
      </b-row>
    </div>
    <div class="member-footer">
      <div class="member-input">
        <b-row>
          <input
            type="email"
            :class="{'input-error': error!=null}"
            v-model="newEmail"
            v-on:keyup.enter="addMember"
            placeholder="Input email here to invite a member"
          />
          <button class="btn btn-success ml-2" @click="addMember">
            <i class="fas fa-user-plus"></i>
          </button>
        </b-row>
      </div>

      <span class="error-details" v-if="error">{{error}}</span>
    </div>
  </div>
</template>

<script>
const EMAIL_REGEX = "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$";
const PATT = new RegExp(EMAIL_REGEX);
export default {
  data() {
    return {
      memberList: [
        { id: 1, email: "nvt@gmail.com", name: "Thái" },
        { id: 2, email: "thv@gmail.com", name: "Vũ" },
        { id: 3, email: "bach@gmail.com", name: "Bách" },
        { id: 4, email: "huy@gmail.com", name: "Huy" },
        { id: 5, email: "danh@gmail.com", name: "Đức Anh" }
      ],
      newEmail: null,
      error: null
    };
  },
  methods: {
    addMember() {
      this.error = null;
      if (!PATT.test(this.newEmail)) {
        this.error = "Email invalid";
      }
    },
    removeMember() {}
  }
};
</script>

<style scoped>
.member {
}
.member-title {
  text-align: center;
}
.member-input {
  display: flex;
  justify-content: space-between;
}
.member-input input:focus {
  outline: none;
}
.input-error {
  border: 1px solid rgb(252, 70, 24);
}
.error-details {
  color: rgb(252, 70, 24);
}
</style>