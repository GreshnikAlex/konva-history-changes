<template>
  <button id="undo-btn">Отмена</button>
  <button id="redo-btn">Повторить</button>
  <div id="container" class="block"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DrawController } from './DrawController';

export default defineComponent({
  name: 'App',
  components: {
  },
  mounted() {
    const draw = new DrawController('container');
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.block {
  width: 48%;
  height: 300px;
  background-color: #E1E5EE;
  padding: 5px;
  margin: 5px;
}
</style>
