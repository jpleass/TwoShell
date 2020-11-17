<template>
  <header class="header">
    <div class="logo">
      <img src="https://www.penguinrandomhouse.com/wp-content/themes/penguinrandomhouse/images/prh-logo.svg" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background: white;
  z-index: 99;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    height: 100%;
    padding: 0.65em;
    img {
      height: 100%;
      width: auto;
    }
  }
}
</style>
