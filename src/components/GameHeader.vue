<template>
  <div class="game-header">
    <div class="title-section">
      <h1 
        class="game-title"
        v-motion
        :initial="{ y: -50, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { duration: 600 } }"
      >
        2048
      </h1>
      <p 
        class="game-subtitle"
        v-motion
        :initial="{ y: -30, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        使用方向键合并数字，达到2048！
      </p>
    </div>

    <div class="score-section">
      <div 
        class="score-box"
        v-motion
        :initial="{ scale: 0, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 300 } }"
      >
        <div class="score-label">得分</div>
        <div class="score-value">{{ score }}</div>
      </div>
      
      <div 
        class="score-box"
        v-motion
        :initial="{ scale: 0, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 400 } }"
      >
        <div class="score-label">最高分</div>
        <div class="score-value">{{ bestScore }}</div>
      </div>
    </div>

    <button 
      class="restart-btn"
      @click="$emit('restart')"
      v-motion
      :initial="{ scale: 0, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 500 } }"
      :hover="{ scale: 1.05 }"
      :tap="{ scale: 0.95 }"
    >
      重新开始
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  score: {
    type: Number,
    default: 0
  },
  bestScore: {
    type: Number,
    default: 0
  }
})

defineEmits(['restart'])
</script>

<style scoped>
.game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.title-section {
  text-align: center;
}

.game-title {
  font-size: 48px;
  font-weight: bold;
  color: #776e65;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.game-subtitle {
  font-size: 16px;
  color: #776e65;
  margin: 10px 0 0 0;
}

.score-section {
  display: flex;
  gap: 20px;
}

.score-box {
  background: #bbada0;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
  min-width: 80px;
}

.score-label {
  font-size: 12px;
  color: #eee4da;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.score-value {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.restart-btn {
  background: #8f7a66;
  color: #f9f6f2;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.restart-btn:hover {
  background: #9f8a76;
}

.restart-btn:active {
  background: #7f6a56;
}
</style>