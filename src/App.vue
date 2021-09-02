<template>
  <n-config-provider :theme-overrides="myTheme">
    <MainPage />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { darkTheme } from 'naive-ui';
import MainPage from './Pages/MainPage.vue';

export default defineComponent({
  name: 'App',
  components: { MainPage },
  setup: () => ({
    myTheme: {
      DynamicInput: {
        buttonSize: 'small',
      },
    },
  }),
});
</script>

<style>
body {
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
