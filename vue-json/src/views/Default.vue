<template>
  <main class="main">
    <ShellCity />
    <PassCode v-if="$site.codes" />
    <Terminal v-if="page.text" :text="page.text" />
  </main>
</template>

<script>
import page from '@/mixins/page'
import ShellCity from '@/components/ShellCity.vue'
import PassCode from '@/components/PassCode.vue'
import Terminal from '@/components/Terminal.vue'

export default {
  name: 'Default',
  mixins: [page],
  components: {
    ShellCity,
    PassCode,
    Terminal
  }
}
</script>
