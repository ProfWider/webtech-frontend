<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="nameField" placeholder="Name" type="text" ref="nameInput">
    <input v-model="priceField" placeholder="Price" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
    <input v-model="filterCrit" placeholder="filter criterion">
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="items.length === 0">
        <td colspan="2">No products yet</td>
      </tr>
      <tr v-for="item in myFilterFunc(filterCrit)" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
      </tr>
      <tr>
        <td>{{ nameField }}</td>
        <td>{{ priceField }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['title'],
  data () {
    return {
      items: [],
      nameField: '',
      priceField: '',
      claims: '',
      accessToken: '',
      filterCrit: ''
    }
  },
  methods: {
    myFilterFunc (crit) {
      return this.items.filter(
        it => crit.length < 1 ||
          it.name.toLowerCase().includes(crit.toLowerCase()))
    },
    loadThings () {
      const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL
      const email = this.claims.email
      const endpoint = baseUrl + '/things' + '?owner=' + email
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        // headers: {
        //   Authorization: 'Bearer ' + this.accessToken
        // }
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(thing => {
          this.items.push(thing)
        }))
        .catch(error => console.log('error', error))
    },
    save () {
      const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL
      const endpoint = baseUrl + '/things'
      const data = {
        name: this.nameField,
        price: this.priceField,
        owner: this.claims.email
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify(data)
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))
    },
    async setup () {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser()
        // this.accessToken = await this.$auth.getAccessToken()
      }
    }
  },
  async created () {
    await this.setup()
    this.loadThings()
  },
  mounted () {
  }
}
</script>

<style scoped>
  table {
    margin-left: auto;
    margin-right: auto;
  }
  button {
    color: blue;
  }
</style>
