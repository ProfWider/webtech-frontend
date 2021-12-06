<template>
  <div class="home">
    <DynamicForm title="Let's talk to the backend!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamicForm from '@/components/DynamicForm.vue'

export default {
  name: 'Home',
  components: {
    DynamicForm
  }
}
</script>
