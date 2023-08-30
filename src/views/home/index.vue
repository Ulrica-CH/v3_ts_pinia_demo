<script setup lang="ts">
import useDemo from '@/store/demoStore/index'
const counterStore = useDemo()
</script>

<template>
  <div> {{ counterStore.count }}</div>
</template>

<style lang="scss" scope>

</style>
