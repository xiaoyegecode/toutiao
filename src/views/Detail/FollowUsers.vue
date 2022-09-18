<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      round
      v-if="!is_followed"
      size="small"
      icon="plus"
      :loading="isFollowLoading"
      @click="follow"
      >关注
    </van-button>
    <van-button
      class="follow-btn"
      type="default"
      round
      v-else
      size="small"
      :loading="isFollowLoading"
      @click="follow"
      >已关注
    </van-button>
  </div>
</template>

<script>
import { addFollowAPI, delFollowAPI } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'FollowUsers',
  data() {
    return {
      isFollowLoading: false
    }
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  created() {
    this.follow()
  },
  methods: {
    async follow() {
      try {
        this.isFollowLoading = true
        if (this.is_followed) {
          await delFollowAPI(this.user_id)
        } else {
          await addFollowAPI(this.user_id)
        }
        this.$emit('update-follow', !this.is_followed)
      } catch (error) {
        Toast.fail('关注失败')
      } finally {
        this.isFollowLoading = false
      }
    }
  }
}
</script>

<style></style>
