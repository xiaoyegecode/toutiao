<template>
  <van-icon
    :color="value ? '#3296fa' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { addCollectAPI, delCollectAPI } from '@/api'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      // type: Boolean,
      required: true
    },
    artId: {
      // type: [Number, Object, String],
      required: true
    }
  },
  methods: {
    async onCollect() {
      if (this.value) {
        await delCollectAPI(this.artId)
      } else {
        await addCollectAPI(this.artId)
      }
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style></style>
