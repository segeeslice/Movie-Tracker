<template>
  <div class="content">
    <!-- Button row -->
    <mu-list class="content-left">
      <mu-list-item button @click="openAddDialog">
        <!-- <mu-tooltip content="Add movie" placement="right"> -->
          <mu-icon value="add_box"/>
        <!-- </mu-tooltip> -->
      </mu-list-item>

      <mu-list-item button @click="openSettings = !openSettings">
        <!-- <mu-tooltip content="Settings" placement="right"> -->
          <mu-icon value="settings"/>
        <!-- </mu-tooltip> -->
      </mu-list-item>
    </mu-list>

    <!-- Movie display -->
    <!-- TODO: add multiple views (carousel?) -->
    <movie-tracker-card-view
      class="content-right"
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

    <movie-tracker-settings
      :open="openSettings"
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
        addData: {},
        openSettings: false
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
  width: 55px;
  /* Width from left: 70px */
  left: 15px; right: 15px;
  position: fixed;
}
.content-right {
  float: right;
  width: calc(100% - 55px)
}
</style>
