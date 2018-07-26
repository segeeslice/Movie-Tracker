<template>
  <div>
    <mu-appbar title="Movie Tracker">
      <mu-tabs :value="activeTab" slot="right">
        <mu-tab
          v-for="item in nav" :key="item.ref"
          @click="navigate(item.ref)"
          :value="item.ref"
          :icon="item.icon"
        />
      </mu-tabs>
    </mu-appbar>

    <mu-content-block>
      <transition name="fade">
        <movie-tracker v-if="activeTab === 'movie-tracker'"/>
        <about v-if="activeTab === 'about'"/>
      </transition>
    </mu-content-block>
  </div>
</template>

<script>
  import MovieTracker from './components/MovieTracker'
  import About from './components/About'

  export default {
    name: 'app',
    components: { MovieTracker, About },
    mounted () {
      // Load the movie object on app start-up
      /*
        NOTE: Occasionally does not load initially in dev due to devtools. Could add extra logic,
        but until then, simply need to reload the page after app start-up in development.
        One possible solution: https://gist.github.com/rtfleg/cc159e4f773a8a3d9ec3a0f8ca821464
      */
      this.$store.dispatch('openMovies')
    },
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
        ],
        activeTab: 'movie-tracker'
      }
    },
    methods: {
      navigate (tab) {
        this.activeTab = tab
      }
    }
  }
</script>

<style>
  .fade-enter-active {
    transition: opacity .15s ease-out;
    transition-delay: .15s;
  }

  .fade-leave-active {
    transition: opacity .15s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
