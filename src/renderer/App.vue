<template>
  <md-app id="app">
    <md-app-toolbar class="md-primary">
      <span class="md-headline">
        Movie Tracker
      </span>
    </md-app-toolbar>

    <!-- App navigation drawer -->
    <md-app-drawer md-persistent="mini" md-fixed>
      <md-list>
        <md-list-item v-for="item in nav" :key="item.text" @click="navigate(item.ref)">
          <md-icon>{{ item.icon }}</md-icon>
          <md-tooltip md-direction="right">{{ item.text }}</md-tooltip>
          <!-- Not currently used, but is needed for icon to be centered -->
          <span>{{ item.text }}</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      You ask for a hamburger, I give you a hamburger. You raise it to your lips and take a bite. Your eye twitches involuntarily. Across the street a father of three falls down the stairs. You swallow and look down at the hamburger in your hands. I give you a hamburger. You swallow and look down at the hamburger in your hands. You cannot swallow. There are children at the top of the stairs. A pickle shifts uneasily under the bun. I give you a hamburger. You look at my face, and I am pleading with you. The children are crying now. You raise the hamburger to your lips, tears stream down your face as you take a bite. I give you a hamburger. You are on your knees. You plead with me to go across the street. I hear only children's laughter. I give you a hamburger. You are screaming as you fall down the stairs. I am your child. You cannot see anything. You take a bite of the hamburger. The concrete rushes up to meet you. You awake with a start in your own bed. Your eye twitches involuntarily. I give you a hamburger. As you kill me, I do not make a sound. I give you a hamburger.
    </md-app-content>
  </md-app>
</template>

<script>
  // import LandingPage from '@/components/LandingPage'

  export default {
    name: 'movie-tracker',
    components: {},
    data () {
      return {
        nav: [
          {
            icon: 'movie',
            text: 'Movie Tracker',
            ref: 'movie-tracker'
          }, {
            icon: 'info_outline',
            text: 'About',
            ref: 'about'
          }
        ]
      }
    },
    methods: {
      navigate (text) {
        console.log(text)
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
