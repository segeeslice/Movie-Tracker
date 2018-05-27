// NPM storage, saves all data to default electron 'userData' path
import storage from 'electron-json-storage'

// Global key object for object referencing
// Outside of state, as it does not need to be referenced within components
var key = 0

const state = {
  // Image master object
  movies: [],
  // Settings master object
  settings: {
    cardSize: '250px',
    sortBy: 'name'
  }
}

const mutations = {
  // ---------- Movie data modifications ----------
  setMovies (state, args) {
    state.movies = args.data
  },
  setMovie (state, args) {
    // Find the object we're working with according to key and apply changes
    // TODO: Better way of doing this?
    for (var index in state.movies) {
      if (state.movies[index].key === args.data.key) {
        state.movies[index] = args.data
        break
      }
    }
  },
  saveMoviesToFile (state, args) {
    saveMovieFile(args.data)
  },
  addMovie (state, args) {
    state.movies.push({
      name: args.data.name,
      image: args.data.image,
      addDate: args.data.addDate,
      category: args.data.category,
      favorite: false,
      key: key++
    })
  },
  deleteMovie (state, args) {
    for (var index in state.movies) {
      if (state.movies[index].key === args.key) {
        state.movies.splice(index, 1)
        break
      }
    }
  },
  toggleFavoriteMovie (state, args) {
    for (var index in state.movies) {
      if (state.movies[index].key === args.key) {
        state.movies[index].favorite = !state.movies[index].favorite
        break
      }
    }
  },
  // ---------- Settings modifications ----------
  changeSetting (state, args) {
    state.settings[args.name] = args.val
  }
}

const actions = {
  openMovies ({ commit }) {
    // Open movie file then set the data
    openMovieFile(state).then((data) => {
      commit('setMovies', {data: data})
    }).catch((error) => {
      throw new Error(error)
    })
  },
  setMovie ({ commit }, args) {
    commit('setMovie', args)
    commit('saveMoviesToFile', {data: state.movies})
  },
  addMovie ({ commit }, args) {
    commit('addMovie', args)
    commit('saveMoviesToFile', {data: state.movies})
  },
  deleteMovie ({ commit }, args) {
    commit('deleteMovie', args)
    commit('saveMoviesToFile', {data: state.movies})
  },
  toggleFavoriteMovie ({ commit }, args) {
    commit('toggleFavoriteMovie', args)
    commit('saveMoviesToFile', {data: state.movies})
  }
}

export default {
  state,
  mutations,
  actions
}

// Utility functions (move to own file if excessive)
// ----------------------------------------------------------------------------

// Open movie file from electron storage
// Returns promise containing movie data
const openMovieFile = (state) => {
  return new Promise((resolve, reject) => {
    storage.get('movies', (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(
          data.length > 0 ? data.map((obj, i) => {
            return {
              name: obj.name,
              image: obj.image,
              addDate: obj.addDate,
              favorite: obj.favorite,
              category: obj.category,
              key: key++ // Puts in current key, then increments the key
            }
          }) : []
        )
      }
    })
  })
}

// Saves movie object to electron storage file
const saveMovieFile = (data) => {
  // Add all properties to data except key
  var newData = data.map((obj, i) => {
    return {
      name: obj.name,
      image: obj.image,
      addDate: obj.addDate,
      favorite: obj.favorite,
      category: obj.category
    }
  })

  storage.set('movies', newData, (error) => {
    if (error) throw new Error(error)
  })

  return newData
}
