<template>
  <div class="chips">
    <p>Chips:</p>
    <div class="chip-circle">
      <div class="chip-inner-circle">
        <p>{{ chips }}</p>
      </div>
    </div>
    <p>Bet: {{ bet }}</p>
  </div>
</template>

<script>
export default {
  props: ["chips", "bet"],
};
</script>
<style scoped>
.chips {
  text-align: center;
  min-width: 150px; /* or any value that is wide enough for your largest possible content */
}

.chip-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f00; /* Red, can be changed to any color you like */
  border: 5px solid #000; /* Black, can be changed to any color you like */
  border-radius: 50%; /* Makes the chip circle round */
  height: 100px;
  width: 100px;
  margin: 20px auto;
}

.chip-inner-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f00; /* Red, can be changed to any color you like */
  border: 5px solid #000; /* Black, can be changed to any color you like */
  border-radius: 50%; /* Makes the chip circle round */
  height: 80px;
  width: 80px;
  color: #fff; /* White, can be changed to any color you like */
  font-size: 2em; /* Adjust this to change the font size */
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; /* Adds a thin black outline */
}
</style>
