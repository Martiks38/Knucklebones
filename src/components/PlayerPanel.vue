<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  player: { type: String, required: true },
});

const score = ref(0);
const src = `src/assets/avatar-${props.player}.png`;
let playerCol = "flex flex-col items-center gap-2.5 px-4 py-10";
let faceAvatar = "w-full h-auto";

if (props.player === "1") {
  playerCol += " justify-end";
  faceAvatar += " face-to-right";
}
</script>

<template>
  <div :class="playerCol">
    <div class="h-auto" :class="player === '2' ? 'order-1' : ''">
      <img :class="faceAvatar" :src="src" :alt="`Jugador ${props.player}`" />
      <p class="mb-2 text-3xl text-center">{{ `Jugador ${player}` }}</p>
      <p class="text-2xl text-center">{{ score }}</p>
    </div>
    <div class="diceBox"></div>
  </div>
</template>

<style>
.face-to-right {
  transform: rotateY(180deg);
}
.diceBox {
  width: 90%;
  height: 180px;
  background-color: #212826;
  border: solid 20px #39433e;
  box-shadow: 0 17px #1c2420;
}
</style>
