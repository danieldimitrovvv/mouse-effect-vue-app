<template>
  <MouseEffectWithGSAP v-bind="config" v-show="gsapDemo" />
  <MouseEffectWithRequestAnimationFrame v-bind="config" v-show="!gsapDemo" />
  <MouseEffectControlPanel v-bind="config" @change-config="changeConfig">
    <template v-slot:header>
      <SwitchButton
        :checked="gsapDemo"
        @change="gsapDemo = !gsapDemo"
        rightLabel="GSAP"
        leftLabel="requestAnimationFrame"
        small
      />
    </template>
  </MouseEffectControlPanel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IMouseEffectProps,
  defaultMouseEffectProps,
} from "./components/MouseEffect/MouseEffectProps";
import MouseEffectWithGSAP from "./components/MouseEffect/MouseEffectWithGSAP.vue";
import MouseEffectWithRequestAnimationFrame from "./components/MouseEffect/MouseEffectWithRequestAnimationFrame.vue";
import MouseEffectControlPanel from "./components/MouseEffect/MouseEffectControlPanel.vue";
import SwitchButton from "./components/SwitchButton/SwitchButton.vue";

const config = ref<IMouseEffectProps>(defaultMouseEffectProps);

const gsapDemo = ref(true);

function changeConfig(newConfig: IMouseEffectProps) {
  config.value = { ...newConfig };
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
