<template>
  <mu-card>
    <mu-card-title title="About"/>
    <mu-card-text>
      <div v-for="prop in packageData" :key="prop.name">
        <strong>{{ prop.name }}:</strong> {{ prop.data }}
      </div>
    </mu-card-text>
  </mu-card>
</template>

<script>
  import Package from '../../../package.json'
  import License from '../../../LICENSE.txt'

  export default {
    name: 'about',
    computed: {
      packageData () {
        return [
          {
            name: 'Product Name',
            data: Package.productName
          }, {
            name: 'Project Name',
            data: Package.name
          }, {
            name: 'Version',
            data: Package.version
          }, {
            name: 'Author',
            data: Package.author
          }, {
            name: 'Description',
            data: Package.description
          }, {
            name: 'License',
            data: License
          }
        ]
      }
    }
  }
</script>
