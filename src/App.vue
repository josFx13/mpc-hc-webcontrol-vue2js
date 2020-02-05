<template>
  <div id="app">
    <fxcontrols/>
  </div>
</template>

<script>
import fxcontrols from "./components/FxControls.vue";

export default {
  name: "app",
  components: {
    fxcontrols
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
html,body{
  padding: 0;
  margin:0;
  width:100%;
  height: 100%;
  overflow: hidden;
}
</style>
