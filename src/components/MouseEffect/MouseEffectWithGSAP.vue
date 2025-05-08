<template>
  <section
    class="mouse-effect"
    :style="{ backgroundColor }"
    @mousemove="mouseMove"
  >
    <h2 class="title">GSAP DEMO</h2>
    <div class="cursor-effect">
      <span
        v-for="(dot, i) in dots"
        :style="[
          styleObject,
          `opacity: calc(1 - (${i} * var(--opacity-step)))`,
        ]"
        :key="i"
      >
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { reactive, withDefaults, defineProps, watch, ref } from "vue";

import { IMouseEffectProps, defaultMouseEffectProps } from "./MouseEffectProps";
import { StyleUtil } from "../../utilities/StyleUtil";

const props = withDefaults(defineProps<IMouseEffectProps>(), {
  ...defaultMouseEffectProps,
});

const mousePosition = reactive({ x: 0, y: 0 });
const dots = ref(Array.from({ length: props.count }));

const styleObject = ref({
  left: 0,
  top: 0,
  backgroundColor: props.itemColor,
  width: props.size + "px",
  height: props.size + "px",
  "--opacity-step": StyleUtil.calculateOpacityStep(
    props.count,
    props.opacityStep
  ),
});

function mouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

watch(
  [mousePosition, () => props.speed],

  ([{ x, y }, speed]) => {
    console.log("speed", speed);
    gsap.to(".cursor-effect span", {
      duration: function (index) {
        return index * speed;
      },
      stagger: 0.1,
      left: x,
      top: y,
    });
  },
  { deep: true }
);

watch(
  () => props,
  (props) => {
    console.log("NEW PROPS", props.itemColor);
    const opacityStep = StyleUtil.calculateOpacityStep(
      props.count,
      props.opacityStep
    );

    styleObject.value = {
      left: 0,
      top: 0,
      backgroundColor: props.itemColor,
      width: props.size + "px",
      height: props.size + "px",
      "--opacity-step": opacityStep,
    };

    dots.value = Array.from({ length: props.count });
  },
  { deep: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mouse-effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.mouse-effect .title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  color: white;
}

.cursor-effect span {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>
