export default {
  data() {
    return {
      page: null
    }
  },
  created() {
    this.page = this.$api
      .getPage(this.$route.path)
      .then(page => (this.page = page))
      .catch(async () => (this.page = await this.$api.getPage('error')))
  },
  async activated() {
    await this.page
  }
}
