<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      :title="article.title"
      v-if="article.cover.type === 0"
      :label="label"
    >
    </van-cell>
    <!-- 一张图片 -->
    <van-cell
      :title="article.title"
      v-else-if="article.cover.type === 1"
      :label="label"
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>

    <!-- 三张图片 -->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          width="100"
          height="100"
          v-for="(item,index) in article.cover.images"
          :key = index
          :src="item"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, coumm_count, pubdata } = this.article
      return `${aut_name}${coumm_count}评论${pubdata}`
    }
  }
}
</script>

<style></style>
