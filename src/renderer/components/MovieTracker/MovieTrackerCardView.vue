<template>
  <div>
    <!-- NOTE: movie posters are 27x40 typically -->
    <mu-card
      :style="cardStyle"
      v-for="movie in sortMovies()"
      :key="movie.key"
    >
      <!-- Card Image -->
      <mu-card-media :title="movie.name" :subTitle="`Added ${movie.addDate}`">
        <img :src="movie.image || defaultPosterPath" :alt="movie.name"/>
      </mu-card-media>

      <!-- Card buttons -->
      <mu-card-actions>
        <!-- Displays red if item is favorited -->
        <mu-icon-button
          icon="favorite"
          @click="favorite(movie.key)"
          :class="{favoriteColor: movie.favorite}"
        />

        <mu-icon-button
          icon="watch_later"
          @click="openWatchLaterDialog(movie)"
        />

        <mu-icon-button
          icon="edit"
          @click="openEditDialog(movie)"
        />

        <mu-icon-button
          icon="delete"
          @click="openDeleteDialog(movie.key)"
        />
      </mu-card-actions>
    </mu-card>

    <!-- Dialogs -->
    <movie-tracker-watch-later
      :showDialog="showWatchLaterDialog"
      :data="watchLaterData"
      @close="closeWatchLaterDialog()"
      @save="saveMovie($event); closeWatchLaterDialog()"
    />

    <movie-tracker-edit-dialog
      :showDialog="showEditDialog"
      :data="editData"
      @close="closeEditDialog()"
      @save="saveMovie($event); closeEditDialog()"
    />

    <movie-tracker-delete-dialog
      :showDialog="showDeleteDialog"
      @close="showDeleteDialog = false"
      @confirm="deleteMovie(deleteKey)"
    />

    <!-- TODO: 'backtop' functionality -->

  </div>
</template>

<script>
  import _ from 'lodash'
  import Config from '../../../services/Config'

  import MovieTrackerEditDialog from './MovieTrackerEditDialog'
  import MovieTrackerWatchLater from './MovieTrackerWatchLater'
  import MovieTrackerDeleteDialog from './MovieTrackerDeleteDialog'

  export default {
    name: 'movie-tracker-card-view',
    components: { MovieTrackerEditDialog, MovieTrackerWatchLater, MovieTrackerDeleteDialog },
    props: [],
    data () {
      return {
        showEditDialog: false,
        editData: {},
        showWatchLaterDialog: false,
        watchLaterData: {},
        showDeleteDialog: false,
        deleteKey: null,
        defaultPosterPath: Config.defaultPosterPath
      }
    },
    computed: {
      movies () {
        return this.$store.state.movieTracker.movies
      },
      settings () {
        return this.$store.state.movieTracker.settings
      },
      // Dynamic style of the card
      // Card size is set in the settings component
      cardStyle () {
        return {
          width: this.settings.cardSize,
          display: 'inline-block',
          margin: '10px'
        }
      }
    },
    methods: {
      sortMovies () {
        // Sorts by name. TODO: Change to dynamically sort based on settings
        // Separate from computed movies for reactivity
        return _.sortBy(this.movies, (o) => { return o[this.settings.sortBy] })
      },
      favorite (key) {
        this.$store.dispatch('toggleFavoriteMovie', {key: key})
      },
      openWatchLaterDialog (movie) {
        this.watchLaterData = movie
        this.showWatchLaterDialog = true
      },
      closeWatchLaterDialog () {
        this.showWatchLaterDialog = false
        this.watchLaterData = {}
      },
      openEditDialog (movie) {
        this.editData = movie
        this.showEditDialog = true
      },
      closeEditDialog () {
        this.showEditDialog = false
        this.editData = {}
      },
      openDeleteDialog (key) {
        this.deleteKey = key
        this.showDeleteDialog = true
      },
      deleteMovie (key) {
        this.$store.dispatch('deleteMovie', {key: key})
        this.showDeleteDialog = false
      },
      saveMovie (data) {
        this.$store.dispatch('setMovie', data)
      }
    }
  }
</script>

<style>
.favoriteColor {
  color: #DC143C
}
</style>
