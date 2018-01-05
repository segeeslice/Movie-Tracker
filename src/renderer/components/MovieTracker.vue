<template>
  <div>
    <!-- Button row -->
    <!-- Movie grid -->
    <mu-card style="width: 200px; display: inline-block; margin: 10px" v-for="movie in movies" :key="movie.name">
      <mu-card-media :title="movie.name" :subTitle="`Added ${movie.addDate}`">
        <img :src="movie.image" :alt="movie.name"/>
      </mu-card-media>
      <mu-card-actions>
        <mu-icon-button icon="favorite"/>
        <mu-icon-button icon="watch_later"/>
        <mu-icon-button icon="delete"/>
      </mu-card-actions>
    </mu-card>

    <!-- TODO: 'Add movie' card -->
    <!-- <mu-card style="width: 200px; display: inline-block; margin: 10px">
      <mu-card-media>
        <mu-icon value="add_circle"/>
      </mu-card-media>
    </mu-card> -->
  </div>
</template>

<script>
  import path from 'path'

  export default {
    name: 'movie-tracker',
    data () {
      return {
      }
    },
    computed: {
      movies () {
        var jon = path.resolve(path.join(__dirname, '../../../static/jontron.jpg'))
        console.log(jon)
        return [
          {name: 'JonTron', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTronz', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTron2', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTron5', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTroni', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTronh', image: '/static/jontron.jpg', addDate: '1/4/2018'},
          {name: 'JonTrons', image: '/static/jontron.jpg', addDate: '1/4/2018'}
        ]
      }
    }
  }
</script>
