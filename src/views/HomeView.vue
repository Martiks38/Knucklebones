<script setup lang="ts">
const linkButtons = [
  ["Jugar Local", "/local"],
  ["Jugar Multijugador", "/multiplayer"],
  ["Cómo jugar", "/how_to_play"],
];

const activeHover = (ev: MouseEvent) => {
  const optionsButtonsHome = Array.from(
    document.querySelectorAll(".styleButtonMenu")
  );
  const buttonTarget = (ev.currentTarget as HTMLElement).dataset
    .option as string;

  optionsButtonsHome.forEach((button, index) => {
    if (index === parseInt(buttonTarget)) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};
</script>

<template>
  <main
    class="relative grid place-content-center w-full h-screen bg-[#000] overflow-hidden"
  >
    <img
      src="../assets/fire-1.gif"
      alt=""
      class="absolute -top-36 -left-24 rotate-135"
    />
    <img
      src="../assets/fire-1.gif"
      alt=""
      class="absolute -top-36 -right-24 -rotate-135"
    />
    <div class="w-[860px]">
      <div class="mb-12 text-white">
        <div></div>
        <h1 class="mb-4 text-7xl text-center">Matatena</h1>
        <img src="../assets/bones.png" alt="" class="mx-auto mb-4 w-24" />
        <span class="block text-2xl text-center"
          >Un juego de dados en el que hay que arriesgar para ganar</span
        >
      </div>
      <div
        class="flex flex-col items-center gap-4 mx-auto max-w-max text-white"
      >
        <div
          v-for="(link, index) in linkButtons"
          :key="index"
          class="relative w-full"
        >
          <div
            class="absolute top-0 left-0 h-full w-full outline outline-2 outline-black outline-offset-[-8px] styleButtonMenu"
            :class="index === 0 ? 'active' : ''"
          ></div>
          <router-link
            @mouseenter="activeHover"
            :to="link[1]"
            :key="index"
            class="relative block px-16 py-4 text-center font-bold"
            :data-option="index"
            >{{ link[0] }}</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<style scope>
.active {
  background-color: #fc0403;
}

.styleButtonMenu {
  clip-path: polygon(0 0, 100% 0, 84% 50%, 100% 100%, 0 100%, 16% 50%);
  animation: moveBackground 800ms linear 0s alternate infinite none;
}

@keyframes moveBackground {
  0% {
    top: 0px;
    left: 0px;
  }
  100% {
    top: 2px;
    left: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .styleButtonMenu {
    animation-name: none;
  }
}
</style>
