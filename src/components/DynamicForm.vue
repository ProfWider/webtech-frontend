<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="nameField" placeholder="Name" type="text" ref="nameInput">
    <input v-model="priceField" placeholder="Price" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
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
      <tr v-for="product in items" :key="product.name">
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
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
      priceField: ''
    }
  },
  methods: {
    loadThings () {
      const endpoint = 'http://localhost:8080/things'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(thing => {
          this.items.push(thing)
        }))
        .catch(error => console.log('error', error))
    },
    save () {
      const endpoint = 'http://localhost:8080/things'
      const data = {
        name: this.nameField,
        price: this.priceField
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    this.loadThings()
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
