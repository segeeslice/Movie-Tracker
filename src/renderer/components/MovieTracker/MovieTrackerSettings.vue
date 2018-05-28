<!-- Drawer component for the purpose of changing settings in card view -->
<template>
  <!-- NOTE: A custom dialog was necessary due to the default drawer
             closing when you clicked on it.-->
  <mu-paper class="custom-dialog" v-show="open">
    <mu-content-block>
      <span>Settings</span>
    </mu-content-block>

    <mu-divider/>
    <br/>

    <mu-content-block>
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
      <mu-select-field
        label=""
        v-model="sortBySelection"
        style="width: 100%"
        @input="changeSetting('sortBy', $event)"
      >
        <mu-menu-item
          v-for="option in sortByOptions"
          :title="option.text"
          :value="option.val"
          :key="option.val"
        />
      </mu-select-field>

      <!-- TODO: Filter option -->

    </mu-content-block>

    <mu-divider/>
    <br/>

    <mu-content-block>
      <mu-flat-button @click="$emit('close')" primary label="Close" icon="close"/>
    </mu-content-block>

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
        sortBySelection: 'name'
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
