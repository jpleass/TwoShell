<template>
  <div id="app">
    <div class="page">
      <transition name="fade">
        <router-view :key="$route.path" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './scss/style.scss';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 400ms ease-in-out;
}
.fade-enter-active {
  transition-delay: 0ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
.blink {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
</style>
