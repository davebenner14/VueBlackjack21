<template>
  <div>
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="(card, index) in cards" :key="index">
        <span v-if="!isDealer || index !== 1 || !card.faceDown">
          {{ card }}
        </span>
        <span v-else> Face Down </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["cards", "title", "isDealer"],
};
</script>
