<template>
  <div>
    <span v-for="(movie, index) in sortMovies()">
      <mu-divider v-if="shouldDivide(movie, index)"/>

      <mu-card
        :style="cardStyle"
        :key="movie.key"
      >
        <!-- Card Image -->
        <mu-card-media :title="movie.name" :subTitle="`Added ${movie.addDate}`">
          <img :src="movie.image || defaultPosterPath" :alt="movie.name"/>
        </mu-card-media>

        <!-- Card buttons -->
        <mu-card-actions>
          <mu-icon-button
              icon="favorite"
              @click="toggleFavorite(movie.key)"
              :class="{favoriteColor: movie.favorite}"
            />

            <mu-icon-button
              :icon="getIcon(movie)"
              @click="toggleWatchLater(movie.key)"
              :class="{watchedColor: movie.watchLater === -1}"
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
    </span>

    <!-- Dialogs -->
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
  import MovieTrackerDeleteDialog from './MovieTrackerDeleteDialog'

  export default {
    name: 'movie-tracker-card-view',
    components: { MovieTrackerEditDialog, MovieTrackerDeleteDialog },
    props: [],
    data () {
      return {
        showEditDialog: false,
        editData: {},
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
        return _.orderBy(this.movies, [this.settings.sortBy, 'name'], [this.settings.sortOrder, 'asc'])
      },
      shouldDivide (movie, index) {
        if (index === 0 || !['watchLater', 'favorite'].includes(this.settings.sortBy)) {
          return false
        } else {
          let sorted = this.sortMovies()
          return sorted[index][this.settings.sortBy] !== sorted[index - 1][this.settings.sortBy]
        }
      },
      toggleFavorite (key) {
        this.$store.dispatch('toggleFavoriteMovie', {key: key})
      },
      toggleWatchLater (key) {
        this.$store.dispatch('toggleWatchLater', {key: key})
      },
      getIcon (movie) {
        return movie.watchLater === -1 ? 'check_circle' : 'watch_later'
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
.watchedColor {
  color: #25a80f
}
</style>
