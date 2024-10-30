<template>
  <navbar/>
  <router-view/>
  <footerComponent/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>

<script>
import navbar from './components/navbar.vue';
import footerComponent from './components/footerComponent.vue';
import FooterComponent from './components/footerComponent.vue';
export default{
  name: 'App',
  components:{
    navbar,
    footerComponent
  }
}
</script>