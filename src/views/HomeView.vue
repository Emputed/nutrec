<template>
  <div class="container text-center">
    <div class="row align-items-center">
      <div class="col">
        One of three columns
      </div>
      <div class="col">
        One of three columns
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue';
export default {
  name: 'HomeView',
  components: {
    navbar
  }
}
</script>
