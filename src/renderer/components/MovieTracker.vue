<template>
  <div>
    <!-- Button row -->
    <mu-raised-button
      label="Add Movie"
      primary
      @click="openAddDialog"
    />

    <!-- Movie display -->
    <!-- TODO: add multiple views (carousel?) -->
    <movie-tracker-card-view
      v-if="true"
    />

    <!-- TODO: 'Add movie' card -->
    <!-- <mu-card style="width: 200px; display: inline-block; margin: 10px">
      <mu-card-media>
        <mu-icon value="add_circle"/>
      </mu-card-media>
    </mu-card> -->

    <movie-tracker-edit-dialog
      :showDialog="showAddDialog"
      :data="addData"
      @close="showAddDialog = false"
      @save="addMovie($event)"
    />
  </div>
</template>

<script>
  import MovieTrackerCardView from './MovieTracker/MovieTrackerCardView'
  import MovieTrackerEditDialog from './MovieTracker/MovieTrackerEditDialog'

  export default {
    name: 'movie-tracker',
    components: { MovieTrackerCardView, MovieTrackerEditDialog },
    data () {
      return {
        showAddDialog: false,
        addData: {}
      }
    },
    methods: {
      addMovie (data) {
        this.$store.dispatch('addMovie', data)
        this.showAddDialog = false
      },
      openAddDialog () {
        var date = new Date()
        var addDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
        this.addData = {
          name: '',
          addDate: addDate,
          image: '',
          category: []
        }
        this.showAddDialog = true
      }
    }
  }
</script>
