<template>
  <div class="content">
    <!-- Button row -->
    <mu-list class="content-left">
      <mu-list-item @click="openAddDialog" @mouseenter="showMovieTip = true" @mouseleave="showMovieTip = false">
        <mu-icon value="add_box"/>
      </mu-list-item>
      <mu-list-item @click="openSettings = !openSettings">
        <mu-icon value="settings"/>
        <!-- <movie-tracker-settings
          :open="openSettings"
        /> -->
      </mu-list-item>
    </mu-list>

    <!-- Movie display -->
    <!-- TODO: add multiple views (carousel?) -->
    <movie-tracker-card-view
      class="content-right"
      v-if="true"
      :cardSize="cardSize"
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

    <movie-tracker-settings
      :open="openSettings"
      :cardSize="cardSize"
      @size-change="cardSize = $event"
      @close="openSettings = false"
    />
  </div>
</template>

<script>
  import MovieTrackerCardView from './MovieTracker/MovieTrackerCardView'
  import MovieTrackerEditDialog from './MovieTracker/MovieTrackerEditDialog'
  import MovieTrackerSettings from './MovieTracker/MovieTrackerSettings'

  export default {
    name: 'movie-tracker',
    components: { MovieTrackerCardView, MovieTrackerEditDialog, MovieTrackerSettings },
    data () {
      return {
        showAddDialog: false,
        showMovieTip: false,
        addData: {},
        openSettings: false,
        // Default card size
        // TODO: Move card size to store
        cardSize: '250px'
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

<style>
.content {
  overflow: hidden
}
.content-left {
  float: left;
  width: 50px;
}
.content-right {
  float: right;
  width: calc(100% - 50px)
}
</style>
