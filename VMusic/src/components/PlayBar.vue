<template>
  <div id="playbar" class="playbar">
    <div class="songplay">
      <a-image
        class="cover"
        :src="songInfo.al?.picUrl || emptyImg"
        :preview="false"
        fit="fill"
      />
      <p class="name">
        {{ songInfo?.name || '云音乐' }}
      </p>
      <p>
        <span v-if="!songInfo" class="er">EN</span>
        <span class="er" v-for="(a, index) in songInfo?.ar" :key="index">{{
          a.name
        }}</span>
      </p>
    </div>
    <div class="play_handlers" :class="status">
      <a-popover
        :popup-visible="popupVisible"
        trigger="click"
        content-class="method_pop"
        popup-container="#playbar"
      >
        <icon-font
          class="method_ico"
          :type="playMethods[howplay].icon"
          strokeWidth="2"
          @click="popupVisible = true"
        />
        <template #content>
          <div
            class="method_item"
            v-for="(meth, index) in playMethods"
            :key="index"
            @click.stop="
              () => {
                howplay = index
                popupVisible = !popupVisible
              }
            "
          >
            <icon-font class="method_ico" :type="meth.icon" /> {{ meth.name }}
          </div>
        </template>
      </a-popover>
      <icon-skip-previous-fill class="pre btn" @click="playingPre" />
      <icon-loading v-if="loading" />
      <component
        v-else
        :is="`icon-${onPlay ? 'pause' : 'play'}-circle-fill`"
        class="play btn"
        @click="playChgHandler"
      ></component>
      <icon-skip-next-fill class="next btn" @click="playingNext" />
    </div>
    <div class="extra_handlers">
      <span class="duration" v-if="audioElem && songInfo">
        {{ longFmt(slidebar.now, 's') }} / {{ longFmt(slidebar.duration, 's') }}
      </span>
      <span class="list" @click.stop="drawVisible = !drawVisible">
        <icon-font class="ico_list" type="icon-gedan" />{{ queue.length }}
      </span>
    </div>
    <a-slider
      class="slider_bar"
      :model-value="slidebar.value"
      :min="0"
      :max="slidebar.duration"
      @change="sliderChg"
    />
  </div>
  <audio
    ref="audioElem"
    :src="mediaInfo?.url"
    @ended="endHandler"
    @loadstart="mediaPlaying = false"
    @error="errorHandler"
  />
  <a-drawer
    class="drawer_queue"
    :visible="drawVisible"
    mask-closable
    popup-container="#app"
    width="300px"
  >
    <template #header>
      <div class="header">
        <p class="title">播放队列</p>
        <p class="sub_tit">
          <span class="del_ico" title="清空" @click="clearList"> 清空列表 </span
          >{{ queue.length }}首歌曲
        </p>
      </div>
    </template>
    <div class="queue">
      <ul>
        <li
          v-for="(item, index) in queue"
          :key="index"
          :class="{ is_current: item.id === songInfo.id }"
          @dblclick="playSong(item, index)"
        >
          <p class="name">{{ item.name }}</p>
          <p class="er">
            <span class="long">
              {{ longFmt(item.dt || 0) }}
            </span>
            <template v-for="(er, ind) in item.ar" :key="ind">
              <em> {{ er.name }} </em>
            </template>
          </p>
        </li>
      </ul>
    </div>
    <template #footer>
      <icon-list class="ico_list" @click.stop="drawVisible = !drawVisible" />
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref, toRefs, reactive, onMounted, onUnmounted } from 'vue'
import { Message, Icon } from '@arco-design/web-vue'
import { usePlayer } from '@/utils/hooks'
import { audioItem, playMethod } from '@/utils/types/playlist.type'
import { songApi } from '@/api'
import { longFmt } from '@/utils/index'
import emptyImg from '@/assets/img/emty_default.svg'

const audioElem = ref<HTMLAudioElement>()
const IconFont = Icon.addFromIconFontCn({
  src: 'https://at.alicdn.com/t/c/font_1640412_tq822srt1bg.js'
})
const { player: playsongs, playerSubs } = usePlayer()
const { list: queue, current: songInfo, playing: onPlay } = toRefs(playsongs)
const loading = ref<boolean>(false)
const mediaInfo = ref()
const drawVisible = ref<boolean>(false)
const popupVisible = ref<boolean>(false)
const mediaPlaying = ref<boolean>(!!mediaInfo.value?.url)
const status = ref<string>('init')
const playMethods = ref<playMethod[]>([
  {
    name: '随机播放',
    icon: 'icon-playradom',
    type: 1,
    end() {
      const ind = Math.round(Math.random() * queue?.value?.length)
      songInfo.value = { queueIndex: ind, ...queue.value[ind] }
    }
  },
  {
    name: '顺序播放',
    icon: 'icon-playturns',
    type: 2,
    end() {
      playingNext()
    }
  },
  {
    name: '单曲循环',
    icon: 'icon-repeatone',
    type: 3,
    end() {
      setTimeout(() => {
        audioElem.value?.play()
      }, 500)
    }
  },
  {
    name: '列表循环',
    icon: 'icon-repeatall',
    type: 4,
    end() {
      if (songInfo.value.queueIndex) {
        let ind = songInfo.value.queueIndex + 1
        if (ind > queue.value.length - 1) {
          ind = 0
        }
        songInfo.value = { queueIndex: ind, ...queue.value[ind] }
      }
    }
  }
])
const howplay = ref<number>(3)
const slidebar = reactive({
  now: 0,
  value: 0,
  duration: 0
})
let sliderDrag = false
let playSubStop: any

onMounted(() => {
  let getTimer: any = null
  audioElem.value?.pause()
  onPlay.value = false
  playSubStop = playerSubs('current', (val) => {
    clearTimeout(getTimer)
    songInfo.value = val
    document.title = val.name || 'EN音乐'
    getTimer = setTimeout(() => {
      audioElem.value?.pause()
      slidebar.value = 0
      songInfo.value.id && getMedia()
    }, 400)
  })
  if (songInfo.value.id && !mediaInfo.value) {
    getMedia()
  }
  if (audioElem.value) {
    audioElem.value.oncanplay = () => {
      audioElem.value?.play()
      onPlay.value = true
    }
    audioElem.value.ondurationchange = () => {
      slidebar.duration = audioElem.value?.duration || 0
      if (!slidebar.duration) {
        onPlay.value = false
      }
    }
    let onupdate = false
    audioElem.value.ontimeupdate = (event) => {
      !onupdate && console.log(event)
      slidebar.now = audioElem.value?.currentTime || 0
      if (sliderDrag) return
      slidebar.value = audioElem.value?.currentTime || 0
      onupdate = true
    }
  }
})
onUnmounted(() => {
  playSubStop()
})

function getMedia() {
  loading.value = true
  songApi
    .getUrl({ id: songInfo.value?.id })
    .then((res) => {
      if (res.length) {
        mediaInfo.value = res[0]
      }
    })
    .catch(() => {
      onPlay.value = false
      mediaInfo.value = {}
      audioElem.value?.pause()
    })
    .finally(() => {
      loading.value = false
    })
}
function playChgHandler() {
  if (!mediaInfo.value) return
  if (audioElem.value && !audioElem.value?.readyState) {
    Message.error('当前音乐加载出错！')
    return
  }
  if (onPlay.value) {
    audioElem.value?.pause()
  } else {
    audioElem.value?.play()
  }
  onPlay.value = !onPlay.value
}
function playingNext() {
  if (songInfo.value.queueIndex) {
    let ind = songInfo.value.queueIndex + 1
    if (ind > queue.value.length - 1) {
      ind = 0
    }
    songInfo.value = { queueIndex: ind, ...queue.value[ind] }
  }
}
function playingPre() {
  if (songInfo.value.queueIndex) {
    let ind = songInfo.value.queueIndex - 1
    if (ind < 0) {
      ind = queue.value.length - 1
    }
    songInfo.value = { queueIndex: ind, ...queue.value[ind] }
  }
}
function endHandler() {
  onPlay.value = false
  mediaPlaying.value = false
  status.value = 'ended'
  playMethods.value[howplay.value].end()
  console.log(howplay.value)
}
function errorHandler() {
  console.warn('Media is Error')
  mediaPlaying.value = false
  onPlay.value = false
  status.value = 'error'
  Message.error('音乐加载失败！')
}
function playSong(song: audioItem, index?: number) {
  songInfo.value = { queueIndex: index, ...song }
}
let slideTimer: any = null
function sliderChg(num: number | [number, number]) {
  slidebar.value = Array.isArray(num) ? num[0] : num
  clearTimeout(slideTimer)
  sliderDrag = true
  slideTimer = setTimeout(() => {
    if (audioElem.value) {
      audioElem.value.currentTime = slidebar.value
    }
    sliderDrag = false
  }, 80)
}
function clearList() {
  queue.value = []
  songInfo.value = Object(null)
  onPlay.value = false
}
</script>
<style lang="scss" scoped>
.playbar {
  position: relative;
  display: flex;
  height: 75px;
  align-items: center;
  .play_handlers {
    display: flex;
    align-items: center;
    padding: 0 20px;
    flex-grow: 1;
    font-size: 25px;
    .btn {
      &.pre,
      &.next {
        margin: 0 5px;
      }
      &.play {
        font-size: 40px;
      }
    }
    &.error {
      .play {
        color: $bgrey;
      }
    }
  }
  .extra_handlers {
    display: flex;
    align-items: center;
    padding-right: 30px;
    font-size: 12px;
    color: #999;
    .list {
      // display: flex;
      // align-items: center;
      margin-left: 8px;
      .ico_list {
        vertical-align: -6px;
        color: #999;
      }
    }
  }
  .slider_bar {
    position: absolute;
    left: 0;
    top: -8px;
    width: 100%;
    :deep(.arco-slider-btn) {
      opacity: 0;
    }
  }
}
.ico_list {
  font-size: 20px;
}
.songplay {
  padding-left: 20px;
  flex-basis: 35%;
  flex-shrink: 0;
  white-space: nowrap;
  .cover {
    float: left;
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 4px;
    background-color: $lightblue;
  }
  .name {
    padding-bottom: 5px;
  }
  .er {
    font-size: 12px;
    color: $textlight;
  }
}
.method_ico {
  font-size: 18px;
  margin-right: 5px;
}
:deep(.method_pop) {
  padding: 0 2px 5px;
  .method_item {
    padding: 6px 10px;
    border-bottom: 1px $bgrey solid;
    cursor: pointer;
    &:hover {
      background-color: $somegrey;
    }
    &:last-of-type {
      border: none;
    }
  }
}

// :global(.arco-trigger-popup) {
//   display: none;
// }
</style>
<style lang="scss">
.drawer_queue {
  z-index: 1009 !important;
  line-height: 1;
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #000;
  }
  .arco-drawer-header {
    height: 65px;
    padding: 25px 15px;
  }
  .header {
    width: 100%;
    .title {
      font-size: 18px;
    }
    .sub_tit {
      font-size: 10px;
      color: #666;
      .del_ico {
        float: right;
        cursor: pointer;
      }
    }
  }
  .arco-drawer-body {
    padding: 0;
  }
  .queue {
    height: 100%;
    overflow: hidden auto;
    li {
      padding: 10px 15px;
      &.is_current {
        background-color: $somegrey;
        color: $somegreen;
      }
      .er {
        .long {
          float: right;
          margin-left: 5px;
        }
        em {
          font: {
            size: 12px;
            style: normal;
          }
          &::after {
            content: ' / ';
          }
          &:last-of-type {
            &::after {
              content: '';
            }
          }
        }
        color: $textlight;
      }
    }
  }
}
</style>
