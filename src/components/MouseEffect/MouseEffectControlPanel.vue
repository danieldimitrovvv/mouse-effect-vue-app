<template>
  <div class="control-panel col" :class="{ open }">
    <div class="col">
      <h3 class="title" @click="open = !open">Control Panel</h3>
      <slot name="header"></slot>
    </div>
    <div class="content col">
      <div class="row">
        <div class="form-container col">
          <label>Background:</label>
          <input type="color" v-model="bgColor" />
        </div>

        <div class="form-container col">
          <label>Circle:</label>
          <input type="color" v-model="itemColor" />
        </div>
      </div>

      <div class="row">
        <div class="form-container">
          <label>Size:</label>
          <input type="number" v-model="size" placeholder="size" />
        </div>

        <div class="form-container">
          <label>Numbers:</label>
          <input type="number" v-model="count" placeholder="count" />
        </div>
      </div>

      <div class="form-container">
        <label>Opacity: {{ opacityStep }}</label>
        <input
          type="range"
          v-model="opacityStep"
          min="0.1"
          max="1"
          step="0.1"
          class="slider"
        />
      </div>

      <div class="form-container">
        <label> Speed: {{ speed }}</label>
        <input
          type="range"
          v-model="speed"
          min="0.01"
          max="0.5"
          step="0.01"
          class="slider"
        />
      </div>
      <input type="button" value="Save" @click="changeConfig" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits, watch } from "vue";
import { IMouseEffectProps, defaultMouseEffectProps } from "./MouseEffectProps";

const props = withDefaults(
  defineProps<IMouseEffectProps>(),
  defaultMouseEffectProps
);

const emit = defineEmits(["change-config"]);

const open = ref(true);

const bgColor = ref(props.backgroundColor);
const itemColor = ref(props.itemColor);
const size = ref(props.size);
const count = ref(props.count);
const opacityStep = ref(props.opacityStep);
const speed = ref(props.speed);

// function toggleOpen() {
//   open.value = !open.value;
// }

function changeConfig() {
  const newConf: IMouseEffectProps = {
    backgroundColor: bgColor.value,
    itemColor: itemColor.value,
    size: parseInt(size.value),
    count: parseInt(count.value),
    opacityStep: parseFloat(opacityStep.value),
    speed: parseFloat(speed.value),
  };
  open.value = false;
  emit("change-config", newConf);
}

watch(
  () => props,
  (props) => {
    bgColor.value = props.backgroundColor;
    itemColor.value = props.itemColor;
    size.value = props.size;
    count.value = props.count;
    opacityStep.value = props.opacityStep;
    speed.value = props.speed;
  },
  { deep: true }
);
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.row {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.col {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}

.control-panel {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 250px;
  height: 46px;
  overflow: hidden;
  gap: 15px;
  background-color: #fff;
  border: 1px solid #222;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  transition: 0.5s;
}
.control-panel.open {
  height: 400px;
}

.control-panel .content {
  padding: 10px;
  padding-top: 5px;
}
.control-panel .title {
  text-transform: uppercase;
  padding: 10px;
  margin: 0;
  cursor: pointer;
  background-color: #04aa6d;
  color: white;
}

.form-container {
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.form-container label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  text-wrap: nowrap;
  flex: 1;
  text-align: left;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  flex: 1;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  min-width: 0;
  border-radius: 15px;
}

/* button */

input[type="button"] {
  width: 100%;
  background-color: #04aa6d;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
}

input[type="button"]:hover {
  background-color: #03784d;
}

/* slider */

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 15px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #04aa6d;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #04aa6d;
  border-radius: 50%;
  cursor: pointer;
}
</style>
