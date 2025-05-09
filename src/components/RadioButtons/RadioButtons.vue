<template lang="">
  <div class="radio-buttons">
    <div
      class="form-group"
      :class="{ active: item.value === selectedItem }"
      v-for="(item, index) in items"
      :key="index"
    >
      <input
        type="radio"
        :id="item.id"
        :name="item.id"
        :value="item.value"
        v-model="selectedItem"
        @change="$emit('change', $event)"
      />
      <label :for="item.id">{{ item.label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits, watch } from "vue";

import {
  IRadioButtonsProps,
  defaultRadioButtonsProps,
} from "./RadioButtonsProps";

const $emit = defineEmits(["change"]);

const props = withDefaults(
  defineProps<IRadioButtonsProps>(),
  defaultRadioButtonsProps
);

const selectedItem = ref(props.defaultValue ?? props.items[0].value);

watch(
  () => props,
  (props) => {
    selectedItem.value = props.defaultValue ?? props.items[0].value;
  },
  { deep: true }
);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.radio-buttons {
  --primary-color: #04aa6d;
  --default-color: #676767;
  --size: 15px;
  --offset: 10px;

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}

.form-group {
  --inline-padding: 5px;
  margin: 0;
  padding: 4px var(--inline-padding);
  padding-left: calc(var(--size) + var(--offset) + var(--inline-padding));
  border-radius: 15px;
  border: 2px solid var(--default-color);
}

input[type="radio"] {
  display: none;
}

.form-group label {
  cursor: pointer;
  position: relative;
  font-size: 15px;
  color: var(--default-color);
  transition: 0.5s;
}

.form-group.active {
  border-color: var(--primary-color);
}

.form-group.active label {
  font-weight: 600;
  color: var(--primary-color);
}

.form-group label::before {
  content: "";
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: transparent;
  border: 2px solid var(--default-color);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  left: calc((var(--size) + var(--offset)) * -1);
  transition: border-color 400ms ease;
}

.form-group label::after {
  content: "";
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  top: 50%;
  left: calc((var(--size) + var(--offset)) * -1);
  transform: translateY(-50%) scale(0);
  transition: transform 400ms ease;
}

.form-group input[type="radio"]:checked + label::before {
  border-color: var(--primary-color);
}

.form-group input[type="radio"]:checked + label::after {
  transform: translateY(-50%) scale(0.55);
}
</style>
