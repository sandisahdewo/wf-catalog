const { createApp } = Vue

createApp({
  data() {
    return {
      isLoading: false,
      page: 'index',
      subName: '',
      search: '',
      activeTab: 'barang',
      countActiveFilter: 0,
      products: [],
      product: {},
      filters: {
        category: { // kategori barang
          isActive: false,
          options: [],
          value: null
        },
        variety: { // jenis barang
          isActive: false,
          options: [],
          value: null
        },
        class: { // golongan obat
          isActive: false,
          options: [],
          value: null
        },
        producer: { // produsen
          isActive: false,
          options: [],
          value: null
        },
        rack: { // rak
          isActive: false,
          options: [],
          value: null
        },
        supply: { // sediaan
          isActive: false,
          options: [],
          value: null
        },
        function: { // fungsi
          isActive: false,
          options: [],
          value: null
        },
        service: { // jasa
          isActive: false,
          options: [],
          value: null
        },
        min_price: {
          isActive: false,
          value: null
        },
        max_price: {
          isActive: false,
          value: null
        }
      },
      activeFilters: {},
      pagination: {
        page: 1
      },
      satuanSelected: null
    }
  },
  watch: {
    'filters.min_price.isActive': function(newValue) {
      this.filters.max_price.isActive = newValue
    },
    filters: {
      handler(newChanges) {
        let filters = Object.entries(newChanges).filter(filter => filter[1].isActive && filter[1].value !== null)
        let active = {}

        filters.forEach(filter => {
          active[filter[0]] = filter[1].value
        })

        this.activeFilters = JSON.parse(JSON.stringify(active))
        this.countActiveFilter = filters.length
      },
      deep: true
    }
  },
  methods: {
    changePage(page, params = null) {
      this.page = page

      if (page == 'index') {
        this.setSlider()
      }

      if (page == 'view') {
        this.showProduct(params.id)
      }
    },
    filterJenisProduct(tab) {
      this.activeTab = tab
      this.refreshProducts()
      this.clearFilter()
      this.getProducts()
    },
    onSearchProduct() {
      this.refreshProducts()
      this.getProducts()
    },
    refreshProducts() {
      this.products = []
      this.pagination.page = 1
    },
    getProducts() {
      let query = window.getUrlParams()

      this.isLoading = true

      axios
        .get(`${apiURL}${query.id_cabang}/katalog`, {
          params: {
            search: this.search,
            jenis: this.activeTab,
            page: this.pagination.page,
            ...this.activeFilters
          }
        })
        .then(response => {
          this.products.push(...response.data.data)
          this.pagination.page = response.data.next_page_url ? response.data.current_page + 1 : null
          this.setSlider()

          this.isLoading = false
          
          if (response.data.data.length == 0) {
            toastr.error(`Data ${this.activeTab} tidak ditemukan`)
          }
        })
    },
    showProduct(id) {
      let query = window.getUrlParams()
      this.product = {}

      this.isLoading = true

      axios
        .get(`${apiURL}${query.id_cabang}/katalog/${id}`, {
          params: {
            jenis: this.activeTab
          }
        })
        .then(response => {
          this.product = response.data
          this.satuanSelected = this.product.id_satuan

          this.setSlider()

          this.isLoading = false

          if (response.data.total == 0) {
            toastr.error(`Data ${this.activeTab} tidak ditemukan`)
          }
        })
    },
    setSlider() {
      setTimeout(() => {
        $(document).find('.carousel.slider-products').slick({
          dots: false,
          arrows: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000
        });
      }, 1)
    },
    getFilterCategory() {
      axios
        .get(`${apiURL}kategori-barang`)
        .then(response => {
          this.filters.category.options = response.data.data
        })
    },
    getFilterVariety() {
      axios
        .get(`${apiURL}jenis`)
        .then(response => {
          this.filters.variety.options = response.data.data
        })
    },
    getFilterClass() {
      axios
        .get(`${apiURL}jenis-obat`)
        .then(response => {
          this.filters.class.options = response.data.data
        })
    },
    getFilterProducer() {
      axios
        .get(`${apiURL}produsen`)
        .then(response => {
          this.filters.producer.options = response.data.data
        })
    },
    getFilterRack() {
      let query = window.getUrlParams()

      axios
        .get(`${apiURL}${query.id_cabang}/rak`)
        .then(response => {
          this.filters.rack.options = response.data.data
        })
    },
    getFilterSupply() {
      axios
        .get(`${apiURL}kategori-obat`)
        .then(response => {
          this.filters.supply.options = response.data.data
        })
    },
    getFilterFunction() {
      axios
        .get(`${apiURL}fungsi-obat`)
        .then(response => {
          this.filters.function.options = response.data.data
        })
    },
    getFilterService() {
      axios
        .get(`${apiURL}kategori-jasa`)
        .then(response => {
          this.filters.service.options = response.data.data
        })
    },
    applyFilter() {
      this.refreshProducts()
      this.getProducts()
    },
    resetFilter() {
      this.refreshProducts()
      this.clearFilter()
      this.getProducts()
    },
    clearFilter() {
      this.activeFilters = {}

      for (let i in this.filters) {
        this.filters[i].value = null
        this.filters[i].isActive = false
      }
    },
    changePriceBySatuan() {
      let satuan = this.product.produk_satuan.find(satuan => satuan.id_satuan == this.satuanSelected)
      this.product.harga = satuan.harga
    },
    getNextProducts() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 >= document.documentElement.offsetHeight
        if (bottomOfWindow && this.pagination.page && !this.isLoading) {
          this.getProducts()
        }
      }
    }
  },
  mounted() {
    this.subName = window.getUrlParams().nama_cabang

    this.getProducts()

    this.getNextProducts()
  }
}).mount('#app')