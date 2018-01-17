<template>
  <!-- Currently bases size on current VH, but could not get to modify dynamically.
       TODO: allow dialog height to change dynamically -->
  <mu-dialog
    :open="showDialog"
    title="Edit Movie Data"
    @close="close"
    scrollable
  >
    <!-- Form -->
    <mu-text-field v-model="newData.addDate" label="Add Date" labelFloat fullWidth disabled/><br/>
    <mu-text-field v-model="newData.name" label="Movie Name" labelFloat fullWidth/><br/>
    <mu-text-field v-model="newData.image" label="Image URL" labelFloat fullWidth/><br/>
    <span>Image preview</span><br/>
    <img :src="newData.image" :alt="newData.name" style="width: 200px"/>

    <!-- Buttons -->
    <mu-flat-button slot="actions" @click="close" label="Cancel"/>
    <mu-flat-button slot="actions" @click="save" primary label="Save"/>
  </mu-dialog>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'movie-tracker-edit-dialog',
    props: [ 'showDialog', 'data' ],
    watch: {
      // Update editable data variable every time dialog opens
      showDialog: {
        handler () {
          this.newData = _.clone(this.data)
        }
      }
    },
    data () {
      return {
        newData: {}
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
      }
    }
  }
</script>

<style>
</style>
