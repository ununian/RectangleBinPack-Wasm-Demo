<template>
  <div>
    <n-h3 prefix="bar" type="info">
      <n-text type="info">原材料</n-text>
    </n-h3>
    <div class="my-2">
      <n-dynamic-input
        v-model:value="sourcePanels"
        :on-create="onCreateSourcePanel"
        :min="1"
        #="{ value }"
      >
        <div class="w-full">
          <div class="flex items-center">
            <n-input-number
              :show-button="false"
              placeholder="宽"
              v-model:value="value.width"
              class="w-30 mx-2"
            >
              <template #suffix>mm</template>
            </n-input-number>
            <div class="text-2xl">*</div>
            <n-input-number
              :show-button="false"
              v-model:value="value.height"
              placeholder="高"
              class="w-30 mx-2"
            >
              <template #suffix>mm</template>
            </n-input-number>
            <n-input-number
              :show-button="true"
              v-model:value="value.count"
              placeholder="数量"
              class="w-30 mx-2"
            >
              <template #suffix>个</template>
            </n-input-number>
          </div>
        </div>
      </n-dynamic-input>
    </div>
    <n-h3 prefix="bar" type="info">
      <n-text type="info">目标</n-text>
    </n-h3>
    <div class="my-2">
      <n-dynamic-input
        v-model:value="targetPanels"
        :on-create="onCreateTargetPanel"
        :min="1"
        #="{ value }"
      >
        <div class="w-full">
          <div class="flex items-center">
            <n-input-number
              :show-button="false"
              placeholder="宽"
              v-model:value="value.width"
              class="w-30 mx-2"
            >
              <template #suffix>mm</template>
            </n-input-number>
            <div class="text-2xl">*</div>
            <n-input-number
              :show-button="false"
              v-model:value="value.height"
              placeholder="高"
              class="w-30 mx-2"
            >
              <template #suffix>mm</template>
            </n-input-number>
            <n-input-number
              :show-button="true"
              v-model:value="value.count"
              placeholder="数量"
              class="w-30 mx-2"
            >
              <template #suffix>个</template>
            </n-input-number>
          </div>
        </div>
      </n-dynamic-input>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { usePackStore } from '../store/PackStore';

export default defineComponent({
  setup() {
    const store = usePackStore();

    store.source = [
      {
        width: 1000,
        height: 1000,
        count: 1,
      },
    ];

    store.target = [
      {
        width: 100,
        height: 100,
        count: 2,
      },
      {
        width: 100,
        height: 200,
        count: 2,
      },
      {
        width: 333,
        height: 222,
        count: 2,
      },
      {
        width: 100,
        height: 222,
        count: 2,
      },
    ];

    return {
      sourcePanels: computed({
        get: () => store.source,
        set: (v) => (store.source = v),
      }),
      targetPanels: computed({
        get: () => store.target,
        set: (v) => (store.target = v),
      }),
      onCreateSourcePanel() {
        return {
          width: 1000,
          height: 1000,
          count: 1,
        };
      },
      onCreateTargetPanel() {
        return {
          width: 100,
          height: 100,
          count: 1,
        };
      },
    };
  },
});
</script>

<style></style>
