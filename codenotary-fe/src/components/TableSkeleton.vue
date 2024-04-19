<template lang="pug">
  q-markup-table
    thead
      tr
        th.text-left(style="width: 150px")
          q-skeleton(animation="blink" type="text")
        th.text-right
          q-skeleton(animation="blink" type="text")
        th.text-right
          q-skeleton(animation="blink" type="text")
        th.text-right
          q-skeleton(animation="blink" type="text")
        th.text-right
          q-skeleton(animation="blink" type="text")
        th.text-right
          q-skeleton(animation="blink" type="text")

    tbody
      tr(v-for="n in 5" :key="n")
        td.text-left
          q-skeleton(animation="blink" type="text" width="85px")
        td.text-right
          q-skeleton(animation="blink" type="text" width="50px")
        td.text-right
          q-skeleton(animation="blink" type="text" width="35px")
        td.text-right
          q-skeleton(animation="blink" type="text" width="65px")
        td.text-right
          q-skeleton(animation="blink" type="text" width="25px")
        td.text-right
          q-skeleton(animation="blink" type="text" width="85px")
</template>

<script setup>
defineOptions({
  name: 'TableSkeleton',
})
</script>
