<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar ><Toolbar/></v-app-bar>

      <NavigationDraw/>

    <v-main class="d-flex align-center " style="min-height: 300px;">
      <router-view/>
    </v-main>

    <v-footer class="v-theme--dark" app name="footer"> <Footer/></v-footer>


  </v-layout>
</template>



<script setup>
import NavigationDraw from "@/components/NavigationDraw.vue";
import Toolbar from "@/components/Toolbar.vue";
import Footer from "@/components/FooterApp.vue";

</script>

<style scoped>

</style>
