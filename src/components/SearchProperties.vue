<template>
<q-list bordered separator>
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
      :columns="columns"
      :loading="!viewProps.isReadySearchProperties" >
      <template v-slot:top>
        <q-input filled dense label="Cena od" v-model="priceFrom" id="filterPriceFrom" type="number" />
        <q-space />
        <q-input filled dense label="Cena do" v-model="priceTo" id="filterPriceTo" type="number" />
        <q-space />
        <q-input filled dense label="Pokoje od" v-model="roomsFrom" id="filterRoomsFrom" type="number" />
        <q-space />
        <q-input filled dense label="Pokoje do" v-model="roomsTo" id="filterRoomsTo" type="number" />
        <q-btn color="primary" icon="search" label="Szukaj" @click="search" />
      </template>
      </q-table>
  </q-list>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue'
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
  field: 'locationShort'
},
{
  name: 'numberOfRooms',
  label: 'Liczba pokoi',
  align: 'left',
  field: 'numberOfRooms'
},
{
  name: 'price',
  label: 'Cena',
  align: 'left',
  field: 'price'
},
{
  name: 'totalArea',
  label: 'Powierzchnia',
  align: 'left',
  field: 'totalArea'
}]
const search = () => {
  mzn.searchProperties = []
  mzn.fetchSearchProperties()
}

const priceFrom = ref(mzn.priceFrom),
  priceTo = ref(mzn.priceTo),
  roomsFrom = ref(mzn.roomsFrom),
  roomsTo = ref(mzn.roomsTo)

watchEffect(() => {
  mzn.priceFrom = priceFrom
})
watchEffect(() => {
  mzn.priceTo = priceTo
})
watchEffect(() => {
  mzn.roomsFrom = roomsFrom
})
watchEffect(() => {
  mzn.roomsTo = roomsTo
})

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
  .q-btn {
    position: relative;
    margin-left: 20px;
    height: 30px;
  }
</style>
