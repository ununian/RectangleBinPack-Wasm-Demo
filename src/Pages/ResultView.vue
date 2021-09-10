<template>
  <div class="result-view">
    <div v-if="svg" v-html="svg"></div>
    <div v-else-if="rects && width && height">
      <svg
        :width="`${width}px`"
        :height="`${height}px`"
        :viewBox="`0 0 ${width} ${height}`"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect
          v-for="(rect, index) in rects"
          :key="index"
          stroke-width="1"
          stroke="#00FF00"
          fill="#FF0000"
          :x="rect.x"
          :y="rect.y"
          :width="rect.width"
          :height="rect.height"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { usePackStore } from '../store/PackStore';

export default defineComponent({
  setup() {
    const store = usePackStore();
    return {
      svg: computed(() => store.result?.svg),
      rects: computed(() => store.result?.rects),
      width: computed(() => store.result?.width),
      height: computed(() => store.result?.height),
    };
  },
});
</script>
<style lang="scss" scoped>
.result-view {
  overflow: auto;

  :deep(svg) {
    max-width: 100% !important;
    max-height: 100% !important;
    background: #ccc;
  }
}
</style>
