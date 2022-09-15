<template>
  <div>
    <!-- 个人信息导航 -->
    <van-nav-bar
      class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" accept=".png,.pdf,.jpg,.jpeg" @change="selectPhoto">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="avator"
      />
    </van-cell>
    <!-- 更新头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateAvatar :photo="photo" v-if="isShowPhoto" :avator.sync="avator"></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './cnps/UpdateAvatar'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  components: { UpdateAvatar },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
