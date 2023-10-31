<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar ><Toolbar/></v-app-bar>

      <NavigationDraw/>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view/>
    </v-main>
  </v-layout>
</template>



<script setup>
import NavigationDraw from "@/components/NavigationDraw.vue";
import Toolbar from "@/components/Toolbar.vue";

</script>

<style scoped>

</style>
