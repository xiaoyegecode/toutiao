<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell :title="item" v-for="item in histories" :key="item" @click="$emit('change-keywords',item)">
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      historyResults: []
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
