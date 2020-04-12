<template>
  <div class="container">
    <ul>
      <li v-for="card in keeps" :key="card.id" class="cards__item">
        <div class="card bg-primary">
          <div class="card-body">
            <div class="card-title">{{ card.user }}</div>
            <p class="card-text">{{ card.content }}</p>
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="card in problems" :key="card.id">
        <div class="card bg-danger">
          <div class="card-body">
            <div class="card-title">{{ card.user }}</div>
            <p class="card-text">{{ card.content }}</p>
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="card in trys" :key="card.id">
        <div class="card bg-warning">
          <div class="card-body">
            <div class="card-title">{{ card.user }}</div>
            <p class="card-text">{{ card.content }}</p>
          </div>
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
.container {
  display: flex;
}
ul {
  list-style-type: none;
}

.card {
  margin-top: 5px;
}
</style>