<template>
  <div 
    class="game-tile" 
    :class="tileClass"
    :key="`${value}-${theme}`"
  >
    <!-- Taylor主题下显示图片或空格子 -->
    <img v-if="theme === 'taylor' && value !== 0 && taylorImages[value]" 
         :src="taylorImages[value]" 
         :alt="`Taylor ${value}`"
         class="taylor-image" />
    <!-- 经典主题下显示数字或空格子 -->
    <span v-else-if="theme === 'classic' && value !== 0" class="tile-value">{{ value }}</span>
    <!-- 空格子在所有主题下都显示（通过CSS样式控制外观） -->
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  theme: {
    type: String,
    default: 'classic'
  }
})

import taylor1 from '../assets/taylor/taylor_1.png'
import taylor2 from '../assets/taylor/taylor_2.png'
import taylor3 from '../assets/taylor/taylor_3.png'
import taylor4 from '../assets/taylor/taylor_4.png'
import taylor5 from '../assets/taylor/taylor_5.png'
import taylor6 from '../assets/taylor/taylor_6.png'
import taylor7 from '../assets/taylor/taylor_7.png'
import taylor8 from '../assets/taylor/taylor_8.png'
import taylor9 from '../assets/taylor/taylor_9.png'
import taylor10 from '../assets/taylor/taylor_10.png'
import taylor11 from '../assets/taylor/taylor_11.png'

const taylorImages = {
  2: taylor1,
  4: taylor2,
  8: taylor3,
  16: taylor4,
  32: taylor5,
  64: taylor6,
  128: taylor7,
  256: taylor8,
  512: taylor9,
  1024: taylor10,
  2048: taylor11
}

const tileClass = computed(() => {
  if (props.value === 0) {
    return 'tile-empty'
  }
  if (props.theme === 'taylor') {
    return 'tile-taylor'
  }
  return `tile-${props.value}`
})
</script>

<style scoped>
.game-tile {
  width: 90px;
  height: 90px;
  background: #cdc1b4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  color: #776e65;
  transition: all 0.15s ease-in-out;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tile-empty {
  background: #cdc1b4;
  opacity: 0.6;
}

.tile-2 {
  background: #eee4da;
  color: #776e65;
}

.tile-4 {
  background: #ede0c8;
  color: #776e65;
}

.tile-8 {
  background: #f2b179;
  color: #f9f6f2;
}

.tile-16 {
  background: #f59563;
  color: #f9f6f2;
}

.tile-32 {
  background: #f67c5f;
  color: #f9f6f2;
}

.tile-64 {
  background: #f65e3b;
  color: #f9f6f2;
}

.tile-128 {
  background: #edcf72;
  color: #f9f6f2;
  font-size: 24px;
}

.tile-256 {
  background: #edcc61;
  color: #f9f6f2;
  font-size: 24px;
}

.tile-512 {
  background: #edc850;
  color: #f9f6f2;
  font-size: 24px;
}

.tile-1024 {
  background: #edc53f;
  color: #f9f6f2;
  font-size: 22px;
}

.tile-2048 {
  background: #edc22e;
  color: #f9f6f2;
  font-size: 22px;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.4);
}

.tile-value {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.tile-taylor {
  background: linear-gradient(135deg, #ff9a9a 0%, #ff6b6b 100%);
  border: 2px solid #ff4757;
  box-shadow: 0 2px 8px rgba(255, 75, 87, 0.3);
}

.taylor-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}
</style>