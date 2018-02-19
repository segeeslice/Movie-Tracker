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
        <img :src="movie.image" :alt="movie.name"/>
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
          @click="watchLater()"
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

      <!-- TODO: 'Add movie' card -->
      <!-- <mu-card style="width: 200px; display: inline-block; margin: 10px">
        <mu-card-media>
          <mu-icon value="add_circle"/>
        </mu-card-media>
      </mu-card> -->
    </mu-card>

    <!-- Dialogs -->
    <movie-tracker-edit-dialog
      :showDialog="showEditDialog"
      :data="editData"
      @close="showEditDialog = false"
      @save="saveMovie($event)"
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

  import MovieTrackerEditDialog from './MovieTrackerEditDialog'
  import MovieTrackerDeleteDialog from './MovieTrackerDeleteDialog'

  export default {
    name: 'movie-tracker-card-view',
    components: { MovieTrackerEditDialog, MovieTrackerDeleteDialog },
    props: [ 'cardSize', 'sortBy' ],
    data () {
      return {
        showEditDialog: false,
        editData: {},
        showDeleteDialog: false,
        deleteKey: null
      }
    },
    computed: {
      movies () {
        return this.$store.state.movieTracker.movies
      },
      // Dynamic style of the card
      // Card size is set in the settings component
      cardStyle () {
        return {
          width: this.cardSize,
          display: 'inline-block',
          margin: '10px'
        }
      }
    },
    methods: {
      sortMovies () {
        // Sorts by name. TODO: Change to dynamically sort based on settings
        // Separate from computed movies for reactivity
        return _.sortBy(this.movies, (o) => { return o[this.sortBy] })
      },
      favorite (key) {
        this.$store.dispatch('toggleFavoriteMovie', {key: key})
      },
      watchLater () {
        console.log('oh')
      },
      openEditDialog (movie) {
        this.editData = movie
        this.showEditDialog = true
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
        this.showEditDialog = false
      }
    }
  }
</script>

<style>
.favoriteColor {
  color: #DC143C
}
</style>
