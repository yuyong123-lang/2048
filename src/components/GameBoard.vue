<template>
  <div class="game-board">
    <div 
      class="board-grid"
      v-motion
      :initial="{ scale: 0.8, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1, transition: { duration: 400 } }"
    >
      <div 
        v-for="(row, rowIndex) in board" 
        :key="rowIndex" 
        class="board-row"
      >
        <GameTile 
          v-for="(value, colIndex) in row" 
          :key="`${rowIndex}-${colIndex}`" 
          :value="value"
          :theme="theme"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GameTile from './GameTile.vue'

const props = defineProps({
  board: {
    type: Array,
    required: true
  },
  theme: {
    type: String,
    default: 'classic'
  }
})
</script>

<style scoped>
.game-board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.board-grid {
  background: #bbada0;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.board-row {
  display: flex;
  gap: 15px;
}
</style>