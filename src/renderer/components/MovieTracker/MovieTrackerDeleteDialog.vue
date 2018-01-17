<template>
  <mu-dialog
    :open="showDialog"
    title="Delete Movie"
    @close="close"
  >
    <span>Are you sure you want to delete this movie? (This cannot be undone)</span>

    <!-- Buttons -->
    <mu-flat-button slot="actions" @click="close" label="Cancel"/>
    <mu-flat-button slot="actions" @click="confirm" primary label="Confirm"/>
  </mu-dialog>
</template>

<script>
  export default {
    name: 'movie-tracker-delete-dialog',
    props: [ 'showDialog' ],
    methods: {
      close () {
        this.$emit('close')
      },
      confirm () {
        this.$emit('confirm')
      }
    }
  }
</script>
