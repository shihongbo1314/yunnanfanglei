<template> 
    <div id="particles-js"></div> 
</template>
 
<script>
  import particlesJs from "particles.js";
  import particlesConfig from "./particles.json";
  export default {
    data() {
      return {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        particlesJS("particles-js", particlesConfig);
      }
    }
  };
</script>
<style scoped>
#particles-js{
    width: 100%;
    height: 100%;
}
</style>