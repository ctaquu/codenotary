<template lang="pug">
q-item(
  clickable
  tag="a"
  target="_self"
  :href="props.link"
)
  q-item-section(
    v-if="props.icon"
    avatar
  )
    q-icon(:name="props.icon")
  q-item-section
    q-item-label {{ props.title }}
    q-item-label(caption) {{ props.caption }}
</template>

<script setup>
defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})
</script>
