<template>
  <MouseEffectWithCss v-bind="config" v-show="selectItem === 'css'" />
  <MouseEffectWithGSAP v-bind="config" v-show="selectItem === 'gsap'" />
  <MouseEffectWithRequestAnimationFrame
    v-bind="config"
    v-show="selectItem === 'animation'"
  />
  <MouseEffectControlPanel v-bind="config" @change-config="changeConfig">
    <template v-slot:header>
      <!-- <SwitchButton
        :checked="gsapDemo"
        @change="gsapDemo = !gsapDemo"
        rightLabel="GSAP"
        leftLabel="requestAnimationFrame"
        small
      /> -->

      <RadioButtons
        :items="[
          { value: 'css', id: 'css', label: 'CSS' },
          {
            value: 'animation',
            id: 'animation',
            label: 'animation',
          },
          { value: 'gsap', id: 'gsap', label: 'GSAP' },
        ]"
        :defaultValue="selectItem"
        @change="(e) => (selectItem = e.target.value)"
      />
    </template>
  </MouseEffectControlPanel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IMouseEffectProps, defaultMouseEffectProps } from "./MouseEffectProps";
import MouseEffectWithGSAP from "./MouseEffectWithGSAP.vue";
import MouseEffectWithCss from "./MouseEffectWithCss.vue";
import MouseEffectWithRequestAnimationFrame from "./MouseEffectWithRequestAnimationFrame.vue";
import MouseEffectControlPanel from "./MouseEffectControlPanel.vue";
// import SwitchButton from "../SwitchButton/SwitchButton.vue";
import RadioButtons from "../RadioButtons/RadioButtons.vue";

const config = ref<IMouseEffectProps>(defaultMouseEffectProps);

const selectItem = ref("css");

function changeConfig(newConfig: IMouseEffectProps) {
  config.value = { ...newConfig };
}
</script>

<style></style>
