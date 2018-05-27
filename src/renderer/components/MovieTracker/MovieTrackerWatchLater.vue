<template>
  <mu-dialog
    :open="showDialog"
    title="Edit Movie Data"
    @close="close"
    scrollable
  >


    <!-- Buttons -->
    <mu-flat-button slot="actions" @click="close" label="Cancel"/>
    <mu-flat-button slot="actions" @click="save" primary label="Save"/>
  </mu-dialog>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'movie-tracker-watch-later',
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
      // capitalize (string) {
      //   return string.charAt(0).toUpperCase() + string.slice(1)
      // }
    }
  }
</script>
