const { createApp } = Vue

createApp({
  data() {
    return {
        subs: []
    }
  },
  watch: {},
  methods: {
    get() {
      axios
        .get(`${apiURL}cabang`)
        .then(response => {
          this.subs = response.data.data

          if (response.data.total == 0) {
            toastr.error(`Data ${this.activeTab} tidak ditemukan`)
          }
        })
    }
  },
  mounted() {
    this.get()
  }
}).mount('#app')