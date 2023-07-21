<template>
  <div class="chips">
    <p>Chips: {{ chips }}</p>
    <p>Bet: {{ bet }}</p>
  </div>
</template>

<script>
export default {
  props: ["chips", "bet"],
};
</script>
