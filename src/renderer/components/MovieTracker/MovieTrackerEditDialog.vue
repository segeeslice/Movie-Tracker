<template>
  <!-- Currently bases size on current VH, but could not get to modify dynamically.
       TODO: allow dialog height to change dynamically -->
  <mu-dialog
    :open="showDialog"
    title="Edit Movie Data"
    @close="close"
    scrollable
  >
    <!-- Add date (disabled for editing) -->
    <mu-text-field
      v-model="newData.addDate"
      label="Add Date"
      labelFloat
      fullWidth
      disabled
    /><br/>

    <!-- Movie name -->
    <mu-text-field
      v-model="newData.name"
      label="Movie Name"
      labelFloat
      fullWidth
    /><br/>

     <!-- Category select -->
     <!-- NOTE: If newData.category is not initalized as an array, the values do not get set.
                Just watch to be sure that it's being initialized when necessary. -->
    <mu-select-field
      v-model="newData.category"
      label="Category"
      labelFloat
      fullWidth
      multiple
      separator=", "
    >
      <!-- Categories defined in config file -->
      <mu-menu-item
        v-for="category in categories"
        :value="category"
        :key="category"
        :title="capitalize(category)"
        fullWidth
      />
    </mu-select-field>
    <br/>

    <!-- Image selection and preview -->
    <mu-text-field
      v-model="newData.image"
      label="Image URL"
      labelFloat
      fullWidth
    /><br/>
    <span>Image preview</span><br/>
    <img :src="newData.image" :alt="newData.name" style="width: 200px"/>

    <!-- Buttons -->
    <mu-flat-button slot="actions" @click="close" label="Cancel"/>
    <mu-flat-button slot="actions" @click="save" primary label="Save"/>
  </mu-dialog>
</template>

<script>
  import _ from 'lodash'
  import Config from '../../../services/Config'

  export default {
    name: 'movie-tracker-edit-dialog',
    props: [ 'showDialog', 'data' ],
    watch: {
      // Update editable data variable every time dialog opens
      showDialog: {
        handler (val) {
          if (val === true) {
            this.newData = _.cloneDeep(this.data)
          }
        }
      }
    },
    data () {
      return {
        newData: {}
      }
    },
    computed: {
      categories () {
        return Config.categories
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      save () {
        this.$emit('save', {
          data: this.newData
        })
      },
      capitalize (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    }
  }
</script>

<style>
</style>
