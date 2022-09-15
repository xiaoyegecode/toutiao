<template>
  <div class="update-avatar">
    <img :src="photo" alt="" ref="image" />
    <div class="toolbar">
      <span>取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
// 更新用户头像
// 裁剪后的图片发送给服务器
// 服务器返回一个图片的地址
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { uploadPhotoAPI } from '@/api'
export default {
  name: 'UpdateAvatar',
  props: {
    photo: {
      type: String,
      required: true
    },
    avator: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    confirm() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        const res = await uploadPhotoAPI(blob)
        this.$emit('update:avator', res.data.data.photo)
        this.$parent.$parent.isShowPhoto = false
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 65%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 9999;
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
