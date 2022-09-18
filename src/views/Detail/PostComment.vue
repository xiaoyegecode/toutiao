<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="value"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
    </van-field>
    <van-button :disabled="!value" class="post-btn" @click="postComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { PostCommentAPI } from '@/api'
import { Toast } from 'vant'

export default {
  name: 'PostComment',
  data() {
    return {
      value: ''
    }
  },
  props: {
    // 发送请求的目标id(可能是评论id/文章id)
    target: {
      type: [Number, String, Object],
      required: true
    },
    artId: {
      type: [String, Number, Object],
      default: null
    }
  },
  methods: {
    async postComment() {
      Toast.loading({
        message: '发布中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const res = await PostCommentAPI({
          target: this.target + '',
          content: this.value,
          art_id: this.artId
        })
        Toast.success('评论成功')
        this.$emit('on-success', res.data.data.new_obj)
        this.value = ''
      } catch (error) {
        Toast.fail('评论失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
