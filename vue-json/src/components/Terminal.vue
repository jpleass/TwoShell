<template>
  <div v-if="IP" ref="terminal" class="terminal">
    <div class="terminal__log">
      <p v-for="(line, index) in log" :key="index" v-html="line"></p>
    </div>
    <vue-typed-js
      v-if="isTyping"
      :strings="strings"
      :contentType="'html'"
      :backDelay="0"
      :backSpeed="0"
      :typeSpeed="10"
      @onStringTyped="onStringTyped"
      @onComplete="isTyping = false"
    >
      <p ref="typing" class="typing"></p>
    </vue-typed-js>
    <br />
    <p
    class="text--upper terminal__attempts"
      v-for="(password, index) in $store.state.attemptedPasswords.slice(Math.max($store.state.attemptedPasswords.length - 5, 0))"
      :key="index"
      v-html="password"
    ></p>
    <p style="display: inline" v-if="!isTyping && $store.state.attemptedCode" v-html="toUpper($store.state.attemptedCode)"></p>
    <span v-if="!isTyping" style="display: inline" class="blink">▌</span>
    <p class="text--upper blink terminal__code-message" :class="{ 'success': $store.state.success }" v-html="$store.state.codeMessage"></p>
  </div>
</template>

<script>
export default {
  name: 'Terminal',
  props: {
    text: String
  },
  data() {
    return {
      IP: null,
      strings: null,
      log: [],
      stringIndex: 0,
      isTyping: true
    }
  },
  async mounted() {
    this.IP = await fetch('https://jsonip.com?callback')
      .then(response => response.json())
      .then(data => data.ip)
    this.strings = this.text.replace('[IP]', this.IP)
    this.strings = this.strings.split('\n')
  },
  methods: {
    async getIP() {
      return new Promise(resolve => {
        fetch('https://jsonip.com?callback')
          .then(response => response.json())
          .then(data => data.ip)
      })
    },
    onStringTyped(e) {
      this.log.push(this.strings[this.stringIndex])
      this.stringIndex++
    },
    toUpper(string) {
      return string.toUpperCase()
    }
  }
}
</script>

<style lang="scss">
.terminal {
  position: fixed;
  top: 1rem;
  left: 1rem;
  padding: 1em;
  color: rgb(0, 255, 0);
  color: #cfcce0;
  z-index: 99;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.3;
  max-width: 40em;
  &__code-message {
    color: #E5003B;
  }
}
.success {
  color:#77F7CD;
}
</style>
