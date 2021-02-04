<template>
  <div>
    <t-pie v-if="type === 'pie'" :data="data"></t-pie>
    <t-line v-if="type === 'line'" :data="data"></t-line>
  </div>
</template>

<script>
export default {
name: "graph",
  props: {
    type: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: []
    }
  }
}
</script>
