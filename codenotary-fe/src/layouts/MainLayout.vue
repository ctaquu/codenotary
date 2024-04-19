<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      )
      q-toolbar-title Codenotary Home Assignment
      div {{ (new Date).getFullYear() }}
  q-drawer(v-model="leftDrawerOpen" show-if-above bordered)
    q-list
      q-item-label(header) Navigation

      EssentialLink(
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      )
  AddTransactionDrawer
  q-page-container
    router-view
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import AddTransactionDrawer from 'components/AddTransactionDrawer.vue'

defineOptions({
  name: 'MainLayout',
})

const linksList = [
  {
    title: 'Home',
    caption: 'Accounting Listing',
    icon: 'house',
    link: '/',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
