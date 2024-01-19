<template>
<q-list bordered separator>
  <div v-if="!viewProps.isReadySearchProperties">Loading...</div>
  <div v-else>
    <q-table
      class="mzn-table"
      virtual-scroll
      flat bordered
      v-model:pagination="pagination"
      :rows-per-page-options="[0, 10, 20 , 50]"
      :virtual-scroll-sticky-size-start="50"
      row-key="id"
      title="Znalezione nieruchomości"
      :rows="viewProps.searchProperties"
      :columns="columns" />
      <!-- <q-item v-for="(property) in viewProps.searchProperties" :key="property.id" clickable v-ripple>
        <q-item-section><SearchProperty
          :property="property"
          /></q-item-section>
      </q-item> -->
    </div>
  </q-list>
</template>
<script setup>
import { computed, ref } from 'vue'
// import SearchProperty from './SearchProperty.vue'
import { useMzn } from 'stores/mzn'

const mzn = useMzn()
const pagination = ref({
  rowsPerPage: 20
})
const columns = [{
  name: 'id',
  label: 'Id',
  field: 'id'
},
{
  name: 'locationShort',
  label: 'Nazwa lokacji',
  align: 'left',
  field: 'locationShort',
  sortable: true
},
{
  name: 'numberOfRooms',
  label: 'Liczba pokoi',
  align: 'left',
  field: 'numberOfRooms',
  sortable: true
},
{
  name: 'price',
  label: 'Cena',
  align: 'left',
  field: 'price',
  sortable: true
},
{
  name: 'totalArea',
  label: 'Powierzchnia',
  align: 'left',
  field: 'totalArea'
}]
const viewProps = computed(() => {
  const properties = mzn.searchProperties.map(property => {
    return {
      id: property?.id,
      locationShort: filterOutMissingData([property?.locationShort.join(', ')]),
      numberOfRooms: filterOutMissingData([property?.numberOfRooms]),
      price: filterOutMissingData([property?.price?.amount, property?.price?.currency]),
      totalArea: filterOutMissingData([property?.totalArea])
    }
  })
  return {
    searchProperties: properties,
    isReadySearchProperties: mzn.isReadySearchProperties
  }
})
function filterOutMissingData (arr) {
  const nrOfUndefines = arr.filter(field => typeof field === 'undefined')
  if (nrOfUndefines.length > 0) {
    return 'Brak danych'
  } else {
    return arr.join(' ')
  }
}
</script>
<style lang="scss">
  .mzn-table {
    height: 800px;
    width: 100%
  }
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #fff
  }

  thead tr th {
    position: sticky;
    z-index: 1
  }
  /* this will be the loading indicator */
  thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px
  }
  thead tr:first-child th {
    top: 0
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px
  }
</style>
