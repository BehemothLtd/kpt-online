<template>
  <div>
    <ul class="keep">
      <li v-for="card in keeps" :key="card.id">
        <div>
          {{ card.content }}
          <br />
          {{ card.type }}
          <br />
          {{ card.user }}
        </div>
      </li>
    </ul>
    <ul class="problem">
      <li v-for="card in problems" :key="card.id">
        <div>
          {{ card.content }}
          <br />
          {{ card.type }}
          <br />
          {{ card.user }}
        </div>
      </li>
    </ul>
    <ul class="try">
      <li v-for="card in trys" :key="card.id">
        <div>
          {{ card.content }}
          <br />
          {{ card.type }}
          <br />
          {{ card.user }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    keeps: function() {
      return this.cards.filter(c => c.type == 1);
    },
    problems: function() {
      return this.cards.filter(c => c.type == 2);
    },
    trys: function() {
      return this.cards.filter(c => c.type == 3);
    }
  }
};
</script>

<style>
.keep {
  background-color: green;
}
.problem {
  background-color: red;
}
.try {
  background-color: yellow;
}
</style>