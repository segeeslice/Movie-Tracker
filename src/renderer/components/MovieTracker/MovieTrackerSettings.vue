<!-- Drawer component for the purpose of changing settings in card view -->
<template>
  <!-- NOTE: A custom dialog was necessary due to the default drawer
             closing when you clicked on it.-->
  <mu-paper class="custom-dialog" v-show="open">
    <span>Settings</span>

    <mu-divider/>
    <br/>

    <!-- Card size option -->
    <strong>Card Size</strong>
    <mu-slider
      v-model="size"
      :min="cardMin"
      :max="cardMax"
      :step="cardStep"
      @input="changeSetting('cardSize', formatSize($event))"
    />
    <!-- Pixel width display -->
    &nbsp; &nbsp; <span>{{ formatSize(size) }}</span>

    <br/><br/>

    <!-- Sort by option -->
    <strong>Sort By</strong>
    <mu-select
      label=""
      v-model="sortBySelection"
      style="width: 100%"
      @input="changeSetting('sortBy', $event)"
    >
      <mu-option
        v-for="option in sortByOptions"
        :label="option.text"
        :value="option.val"
        :key="option.val"
      />
    </mu-select>

    <mu-select
      label=""
      v-model="sortOrder"
      style="width: 100%"
      @input="changeSetting('sortOrder', $event)"
    >
      <mu-option
        v-for="option in sortOrderOptions"
        :label="option.text"
        :value="option.val"
        :key="option.val"
      />
    </mu-select>

      <!-- TODO: Filter option -->

    <mu-divider/>
    <br/>

    <mu-button flat @click="$emit('close')" primary>
      <mu-icon left value="close"/>
      Close
    </mu-button>

  </mu-paper>
</template>

<script>
  export default {
    name: 'movie-tracker-settings',
    props: [ 'open', 'cardSize' ],
    watch: {},
    data () {
      return {
        // Card size
        // Initialized to default
        size: 250,
        // Card min and max resolutions
        cardMin: 200,
        cardMax: 800,
        cardStep: 50,
        // Sort by selections
        sortByOptions: [
          {text: 'Name', val: 'name'},
          {text: 'Add Date', val: 'addDate'},
          {text: 'Favorites', val: 'favorite'},
          {text: 'Watched', val: 'watchLater'}
        ],
        sortOrderOptions: [
          {text: 'Ascending', val: 'asc'},
          {text: 'Descending', val: 'desc'}
        ],
        sortBySelection: 'name',
        sortOrder: 'asc'
      }
    },
    methods: {
      // Format the size to be used in dynamic style
      formatSize (size) {
        return String(size) + 'px'
      },
      // Change setting in store
      changeSetting (name, val) {
        this.$store.commit('changeSetting', {
          name: name,
          val: val
        })
      }
    }
  }
</script>

<style>
  .custom-dialog {
    width: 250px;
    height: auto;
    position: fixed;
    top: auto;
    left: 70px;
  }
</style>
