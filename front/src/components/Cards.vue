<template>
  <div>
    <ul>
      <li v-for="card in cards" :key="card.id">
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
  }
};
</script>

<style>
</style>