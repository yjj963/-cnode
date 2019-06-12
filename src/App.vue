<template>
  <div id="app">
    <Header/>
    <div class='main'>
      <router-view name='slidebar'></router-view>
      <router-view name='main'></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components:{Header}
}
</script>

<style>
*{margin:0;padding:0;}
ul,ol{list-style:none;}
html{font-size:14px;}
body{background:#e1e1e1;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main{width:90%;margin:15px auto;}
</style>
