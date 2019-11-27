<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Crazy Logo"
          class="shrink mr-2"
          contain
          src="http://pluspng.com/img-png/internet-meme-png-me-gusta-face-meme-photo-me-gusta-face-meme-png-200.png"
          transition="scale-transition"
          width="40"
        />

        <span class="mr-2">The Best App</span>
        
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/JesusPaz"
        target="_blank"
        text
      >
        <span class="mr-2">Visit my GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Information/>
    </v-content>
  </v-app>
</template>

<script>
import Information from './components/Information';

export default {
  name: 'App',

  components: {
    Information,
  },

  data: () => ({
    //
  }),
};
</script>
