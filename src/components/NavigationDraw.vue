<template>
      <v-navigation-drawer
          image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
          permanent
          theme="dark"
      >
        <v-list nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/" ></v-list-item>
          <v-list-item prepend-icon="mdi-leak" title="Dispositivos" value="dispositivos" to="Dispositivos"></v-list-item>
          <v-list-item prepend-icon="mdi-information-variant" title="Sobre o APP" value="sobre" to="About"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>