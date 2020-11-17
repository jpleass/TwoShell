<template>
  <div class="pass-code__wrapper">
    <div
      class="pass-code__content"
      :class="{
        'pass-code__content--positive': state === 'succesful' && this.$store.state.codeMessage,
        'pass-code__content--negative': state === 'failed' && this.$store.state.codeMessage
      }"
    >
      <form ref="form" @submit="onSubmit">
        <input
          class="pass-code__input text--display"
          :placeholder="placeholder"
          type="text"
          name="passCode"
          id="passCode"
          v-model.trim="$store.state.attemptedCode"
        />
        <button class="pass-code__submit">
          <Submit />
        </button>
      </form>
      <div v-if="$store.state.codeMessage" class="pass-code__message text--display" v-html="$store.state.codeMessage"></div>
    </div>
  </div>
</template>

<script>
import Submit from '@/svg/submit.svg'

export default {
  name: 'PassCode',
  components: {
    Submit
  },
  props: {
    code: String,
    filelink: String
  },
  mounted() {
    if (window.innerWidth > 768) document.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeyUp)
  },
  data() {
    return {
      placeholder: 'Enter Passcode',
      state: null,
      attemptedCode: null
    }
  },
  methods: {
    onKeyUp(e) {
      if (this.$store.state.attemptedCode) {
        this.$store.state.codeMessage = null
        if (e.keyCode === 8) this.$store.state.attemptedCode = this.$store.state.attemptedCode.slice(0, -1)
        if (e.keyCode >= 65 && e.keyCode <= 90) this.$store.state.attemptedCode += e.key
      } else {
        if (e.keyCode >= 65 && e.keyCode <= 90) this.$store.state.attemptedCode = e.key
      }
      if (e.keyCode === 13) this.submitCheck()
    },
    onSubmit(e) {
      e.preventDefault()
      this.submitCheck()
    },
    submitCheck() {
      let wasSubmitSuccessful = false
      for (let index = 0; index < this.$site.codes.length; index++) {
        const codeCombination = this.$site.codes[index]
        if (this.$store.state.attemptedCode && codeCombination.code.toLowerCase() === this.$store.state.attemptedCode.toLowerCase()) {
          this.state = 'succesful'
          this.$store.state.codeMessage = 'Access Granted'
          this.$store.state.success = true
          wasSubmitSuccessful = true
          setTimeout(this.onSuccess(codeCombination.filelink), 1000)
        }
      }
      if (!wasSubmitSuccessful) {
        this.state = 'failed'
        this.$store.state.codeMessage = 'Access Denied'
        this.$store.state.attemptedPasswords.push(this.$store.state.attemptedCode)
        this.$store.state.attemptedCode = null
        this.$store.state.success = false
      }
    },
    onSuccess(filelink) {
      var win = window.open(filelink, '_blank')
      win.focus()
    }
  }
}
</script>

<style lang="scss">
.pass-code {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    visibility: hidden;
    @media screen and (max-width: 768px) {
      visibility: visible;
    }
  }
  &__input {
    font-size: 24px;
    height: 70px;
    mix-blend-mode: difference;
    padding: 1rem 0rem;
    background: rgba(0, 0, 0, 0.95);
    box-shadow: 0 0 2vw rgba(178, 203, 231, 0.5);
    border: solid 1px rgba(178, 203, 231, 0.5);
    text-align: center;
    color: currentColor;
    outline: none;
    text-transform: uppercase;
    transition: box-shadow 300ms;
    letter-spacing: 0.01em;
    &:focus {
      background: rgba(0, 0, 0, 1);
      box-shadow: 0 0 5vw 1vw rgba(178, 203, 231, 1);
    }
    &::placeholder {
      color: #cfcce0;
      color: currentColor;
      opacity: 0.5;
    }
  }
  &__submit {
    height: 70px;
    width: 100%;
    background: black;
    color: currentColor;
    border: solid 1px rgba(178, 203, 231, 0.5);
    border-left: none;
    // position: absolute;
    top: 0;
    right: -70px;
    text-align: center;
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    svg {
      height: 0.75em;
      width: 0.75em;
      fill: rgba(178, 203, 231, 0.5);
      transition: 250ms ease-in-out;
    }
    &:hover {
      color: black;
      background: rgba(178, 203, 231, 1);
      svg {
        fill: black;
        transform: translateY(-2px);
      }
    }
  }
  &__message {
    position: absolute;
    width: 100%;
    text-align: center;
    padding-top: 1em;
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
    text-transform: uppercase;
  }
  &__content {
    color: #cfcce0;
    position: relative;
    &--positive {
      color: lightgreen;
    }
    &--negative {
      color: red;
    }
  }
}
</style>
