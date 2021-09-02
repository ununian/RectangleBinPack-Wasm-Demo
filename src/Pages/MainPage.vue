<template>
  <div class="main-page">
    <div class="grid-item p-3 box-border div1">
      <RectInput />
    </div>
    <div class="grid-item p-3 div2">
      <AlgorithmsSelect />
    </div>
    <div class="grid-item p-3 div3">
      <ResultView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RectInput from './RectInput.vue';
import ResultView from './ResultView.vue';
import AlgorithmsSelect from './AlgorithmsSelect.vue';

export default defineComponent({
  components: { RectInput, ResultView, AlgorithmsSelect },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.main-page {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: auto 1fr;
  grid-column-gap: 5px;
  box-sizing: border-box;
  grid-row-gap: 5px;
  padding-bottom: 1px;
}

.grid-item {
  border: solid 1px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 2 / 1 / 3 / 3; }
</style>
