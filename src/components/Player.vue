<template>
  <footer v-if="currentTrack" class="accordion__player">
    <div class="accordion__player-top">
      <div class="accordion__player-info">
        <img
          :src="currentTrack.album?.cover_small"
          alt="Capa"
          class="accordion__player-info-img"
        />

        <div class="accordion__player-info-text">
          <p class="accordion__player-info-title">
            {{ currentTrack.title }}
          </p>

          <p class="accordion__player-info-artist">
            {{ currentTrack.artist?.name }}
          </p>
        </div>
      </div>

      <div class="accordion__player-center">
        <div class="accordion__player-controls">
          <button @click="playPreviousTrack" class="accordion__player-button">
            <img
              :src="previousIcon"
              alt="Anterior"
              class="accordion__player-icon"
            />
          </button>

          <button @click="togglePlay" class="accordion__player-button">
            <img
              :src="isPlaying ? pauseIcon : playIcon"
              alt="Play/Pause"
              class="accordion__player-icon"
            />
          </button>

          <button @click="playNextTrack" class="accordion__player-button">
            <img :src="nextIcon" alt="Próxima" class="accordion__player-icon" />
          </button>
        </div>

        <div class="accordion__player-progress">
          <span class="accordion__player-time">
            {{ durationReformed(currentTime) }}
          </span>

          <input
            type="range"
            min="0"
            :max="duration"
            step="0.1"
            v-model="currentTime"
            class="accordion__player-progress-bar"
            @input="seekAudio"
          />

          <span class="accordion__player-time">
            {{ durationReformed(duration) }}
          </span>
        </div>
      </div>

      <div>
        <button>
          <img
            :src="listIcon"
            alt="lista de músicas"
            class="accordion__player-icon"
          />
        </button>

        <button>
          <img
            :src="tvIcon"
            alt="transmitir na tv"
            class="accordion__player-icon"
          />
        </button>

        <button>
          <img
            :src="volumeIcon"
            alt="volume do som"
            class="accordion__player-icon"
          />
        </button>

        <button>
          <img
            :src="sliderIcon"
            alt="configuração de áudio"
            class="accordion__player-icon"
          />
        </button>
      </div>
    </div>

    <audio
      ref="audioPlayer"
      @timeupdate="updateCurrentTime"
      @loadedmetadata="updateDuration"
      @ended="playNextTrack"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    ></audio>
  </footer>
</template>

<script>
import { formatDuration } from "../untils/formatDuration.js"
import playIcon from "@/assets/icons/play-solid-full.png"
import pauseIcon from "@/assets/icons/pause-solid-full.png"
import nextIcon from "@/assets/icons/forward-solid-full.png"
import previousIcon from "@/assets/icons/backward-solid-full.png"
import listIcon from "@/assets/icons/list-solid-full.png"
import tvIcon from "@/assets/icons/tv-solid-full.png"
import volumeIcon from "@/assets/icons/volume-high-solid-full.png"
import sliderIcon from "@/assets/icons/sliders-solid-full.png"

export default {
  name: "Player",

  data() {
    return {
      currentTrack: null,
      queue: [],
      currentTrackIndex: 0,
      isPlaying: false,
      currentTime: 0,
      duration: 30,

      playIcon,
      pauseIcon,
      nextIcon,
      previousIcon,
      listIcon,
      tvIcon,
      volumeIcon,
      sliderIcon,
    }
  },

  mounted() {
    window.addEventListener("track-changed", this.handleTrackChanged)

    const savedTrack = localStorage.getItem("currentTrack")
    const savedQueue = localStorage.getItem("playerQueue")
    const savedIndex = localStorage.getItem("playerTrackIndex")
    const savedCurrentTime = localStorage.getItem("playerCurrentTime")

    try {
      if (savedTrack) {
        this.currentTrack = JSON.parse(savedTrack)
      }

      if (savedQueue) {
        this.queue = JSON.parse(savedQueue)
      } else if (this.currentTrack) {
        this.queue = [this.currentTrack]
      }

      if (savedIndex !== null) {
        this.currentTrackIndex = Number(savedIndex)
      }

      if (savedCurrentTime !== null) {
        this.currentTime = Number(savedCurrentTime)
      }

      this.$nextTick(() => {
        const audio = this.$refs.audioPlayer
        if (!audio || !this.currentTrack?.preview) return

        audio.addEventListener(
          "loadedmetadata",
          () => {
            this.duration = audio.duration || 30

            if (this.currentTime < this.duration) {
              audio.currentTime = this.currentTime
            }
          },
          { once: true },
        )

        audio.src = this.currentTrack.preview
        audio.load()
      })
    } catch (error) {
      console.error("Erro ao restaurar o player:", error)
    }
  },

  beforeUnmount() {
    window.removeEventListener("track-changed", this.handleTrackChanged)
    const audio = this.$refs.audioPlayer

    if (audio) {
      audio.pause()
    }
  },

  methods: {
    handleTrackChanged(event) {
      const detail = event.detail || {}
      const track = detail.track

      if (!track || !track.preview) return

      this.currentTrack = track

      this.queue = detail.queue && detail.queue.length ? detail.queue : [track]

      this.currentTrackIndex = Number.isInteger(detail.index)
        ? detail.index
        : 0

      this.currentTime = 0

      localStorage.setItem("currentTrack", JSON.stringify(this.currentTrack))

      localStorage.setItem("playerQueue", JSON.stringify(this.queue))

      localStorage.setItem("playerTrackIndex", String(this.currentTrackIndex))

      localStorage.setItem("playerCurrentTime", "0")

      this.$nextTick(() => {
        this.playCurrent()
      })
    },

    playCurrent() {
      const audio = this.$refs.audioPlayer

      if (!audio || !this.currentTrack?.preview) return

      audio.pause()

      audio.src = this.currentTrack.preview
      audio.currentTime = 0

      this.currentTime = 0
      this.duration = 30

      audio.load()

      audio.play().catch((error) => {
        console.error("Erro ao reproduzir música:", error)
      })
    },

    togglePlay() {
      const audio = this.$refs.audioPlayer

      if (!audio || !this.currentTrack?.preview) return

      if (audio.paused) {
        audio.play().catch((error) => {
          console.error("Erro ao continuar música:", error)
        })
      } else {
        audio.pause()
      }
    },

    playNextTrack() {
      const audio = this.$refs.audioPlayer

      if (!audio || !this.queue.length) return

      const nextIndex = this.currentTrackIndex + 1

      if (nextIndex >= this.queue.length) {
        this.isPlaying = false
        return
      }

      const nextTrack = this.queue[nextIndex]

      if (!nextTrack?.preview) return

      this.currentTrackIndex = nextIndex
      this.currentTrack = nextTrack
      this.currentTime = 0
      this.duration = 30

      localStorage.setItem("currentTrack", JSON.stringify(nextTrack))

      localStorage.setItem("playerQueue", JSON.stringify(this.queue))

      localStorage.setItem("playerTrackIndex", String(this.currentTrackIndex))

      localStorage.setItem("playerCurrentTime", "0")

      audio.pause()
      audio.src = nextTrack.preview
      audio.currentTime = 0
      audio.load()

      audio.play().catch((error) => {
        console.error("Erro ao reproduzir próxima música:", error)
      })
    },

    playPreviousTrack() {
      const audio = this.$refs.audioPlayer

      if (!audio || !this.queue.length) return

      // Se a música já passou de 3 segundos,
      // apenas volta para o início dela.
      if (audio.currentTime > 3) {
        audio.currentTime = 0
        this.currentTime = 0

        localStorage.setItem("playerCurrentTime", "0")

        return
      }

      const previousIndex = this.currentTrackIndex - 1

      // Já está na primeira música
      if (previousIndex < 0) {
        audio.currentTime = 0
        this.currentTime = 0

        localStorage.setItem("playerCurrentTime", "0")

        return
      }

      const previousTrack = this.queue[previousIndex]

      if (!previousTrack?.preview) return

      this.currentTrackIndex = previousIndex
      this.currentTrack = previousTrack
      this.currentTime = 0
      this.duration = 30

      localStorage.setItem("currentTrack", JSON.stringify(previousTrack))

      localStorage.setItem("playerQueue", JSON.stringify(this.queue))

      localStorage.setItem("playerTrackIndex", String(this.currentTrackIndex))

      localStorage.setItem("playerCurrentTime", "0")

      audio.pause()
      audio.src = previousTrack.preview
      audio.currentTime = 0
      audio.load()

      audio.play().catch((error) => {
        console.error("Erro ao reproduzir música anterior:", error)
      })
    },

    seekAudio() {
      const audio = this.$refs.audioPlayer
      if (!audio) return
      audio.currentTime = Number(this.currentTime)
    },

    updateCurrentTime(event) {
      this.currentTime = event.target.currentTime

      localStorage.setItem("playerCurrentTime", String(this.currentTime))
    },

    updateDuration(event) {
      this.duration = event.target.duration || 30
    },

    durationReformed(seconds) {
      return formatDuration(seconds)
    },
  },
}
</script>
