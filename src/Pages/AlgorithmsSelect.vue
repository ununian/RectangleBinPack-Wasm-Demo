<template>
  <div class="algorithms-view">
    <n-form :model="store" size="small">
      <n-form-item path="algorithms" label="算法">
        <n-radio-group
          size="small"
          v-model:value="store.algorithms"
          name="radiobuttongroup1"
        >
          <n-radio-button
            size="small"
            v-for="algorithms in AlgorithmsOption"
            :key="algorithms"
            :value="algorithms"
          >
            {{ algorithms }}
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item
        v-for="(options, prop) in settings"
        :key="prop"
        :path="`algorithmsSetting.${prop}`"
        :label="prop"
      >
        <template v-if="isBoolOptions(options)">
          <n-switch v-model:value="store.algorithmsSetting[prop]" />
        </template>
        <template v-else>
          <n-select
            v-model:value="store.algorithmsSetting[prop]"
            :options="formatOptions(options)"
          />
        </template>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts">
import { omit } from 'lodash';
import { computed, defineComponent, ref, watch } from 'vue';
import { AlgorithmsOption, AlgorithmsSetting } from '../model/Algorithms';
import { usePackStore } from '../store/PackStore';

export default defineComponent({
  setup() {
    const store = usePackStore();

    const settings = computed(() =>
      omit(AlgorithmsSetting[store.algorithms], '__name')
    );

    watch(
      () => store.algorithms,
      () => {
        store.algorithmsSetting = Object.keys(settings.value).reduce(
          (acc, key) => {
            acc[key] = settings.value[key][0];
            return acc;
          },
          {} as Record<string, string | boolean>
        );
      },
      { immediate: true }
    );

    const isBoolOptions = (
      options: Array<string | boolean>
    ): options is boolean[] => options[0] === true && options[1] === false;

    const formatOptions = (options: Array<string | boolean>) =>
      options.map((opt) => ({ label: opt, value: opt }));

    watch(
      () => [
        store.algorithms,
        store.algorithmsSetting,
        store.source,
        store.target,
      ],
      () => {
        store.pack();
      },
      { immediate: true, deep: true }
    );

    return {
      store,
      AlgorithmsOption,
      settings,
      formatOptions,
      isBoolOptions,
    };
  },
});
</script>
<style lang="scss" scoped>
.algorithms-view {
}
</style>
