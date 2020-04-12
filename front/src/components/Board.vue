<template>
  <div class="board">
    <b-row>
      <b-col xs="12" sm="10">
        <b-row>
          <b-col>
            <h1>Keep</h1>

            <b-row>
              <b-col v-for="(item, index) in keeps" :key="index" xs="12" sm="6" md="3">
                <Sticky :data="item" class="mb-4" :index="index" @add="addKeep" @close="removeKeep"></Sticky>
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

export default {
  components: {
    Sticky,
    BoardMember,
  },
  data() {
    return {
      boardId: 1,
      keeps: [
        {
          created_at: Date()
        },
        {}
      ],
      problems: [],
      tries: []
    };
  },
  methods: {
    addKeep() {
      this.keeps.push({
        title: "",
        content: "",
        created_at: Date()
      });
    },
    removeKeep(value) {
      this.keeps.splice(value, 1);
      if (this.keeps.length == 0) {
        this.addKeep();
      }
    }
  }
};
</script>

<style>
</style>