<template>
  <div class="switch-button">
    <Transition>
      <h6 class="label" v-if="leftLabel && !checked">{{ leftLabel }}</h6>
    </Transition>
    <label class="switch" :class="{ small }">
      <input
        type="checkbox"
        :checked="checked"
        @change="$emit('change', $event)"
      />
      <span class="slider round"></span>
    </label>
    <Transition>
      <h6 class="label" v-if="rightLabel && checked">{{ rightLabel }}</h6>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from "vue";

import {
  ISwitchButtonProps,
  defaultSwitchButtonProps,
} from "./SwitchButtonProps";

const props = withDefaults(
  defineProps<ISwitchButtonProps>(),
  defaultSwitchButtonProps
);

const $emit = defineEmits(["change"]);

const cssWidth = props.size + "px";
</script>

<style scoped>
.switch-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.switch-button .label {
  font-size: 15px;
  padding: 0;
  margin: 0;
}

.switch {
  --width: v-bind(cssWidth);
  --height: calc(v-bind(cssWidth) * 0.55);

  position: relative;
  display: inline-block;
  width: var(--width);
  height: var(--height);
}

.switch.small {
  --width: 40px;
  --height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: calc(var(--height) * 0.8);
  width: calc(var(--height) * 0.8);
  left: calc(var(--height) * 0.1);
  bottom: calc(var(--height) * 0.1);
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #04aa6d;
}

input:focus + .slider {
  box-shadow: 0 0 1px #04aa6d;
}

input:checked + .slider:before {
  --translate: calc(var(--width) - var(--height));

  -webkit-transform: translateX(var(--translate));
  -ms-transform: translateX(var(--translate));
  transform: translateX(var(--translate));
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
