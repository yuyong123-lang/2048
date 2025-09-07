<script setup>
import { onMounted, onUnmounted } from 'vue'
import { use2048 } from './composables/use2048'
import GameBoard from './components/GameBoard.vue'

const {
  board,
  score,
  bestScore,
  gameOver,
  won,
  theme,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  restart,
  toggleTheme
} = use2048()

function handleKeyPress(event) {
  if (gameOver.value && !won.value) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      moveLeft()
      break
    case 'ArrowRight':
      event.preventDefault()
      moveRight()
      break
    case 'ArrowUp':
      event.preventDefault()
      moveUp()
      break
    case 'ArrowDown':
      event.preventDefault()
      moveDown()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="app">
    <div class="game-container">
      <div class="left-panel">
        <div class="game-title">
          <h1>2048</h1>
          <p>使用方向键合并数字，达到2048！</p>
        </div>
        
        <div class="scores">
          <div class="score-box">
            <div class="score-label">得分</div>
            <div class="score-value">{{ score }}</div>
          </div>
          <div class="score-box">
            <div class="score-label">最高分</div>
            <div class="score-value">{{ bestScore }}</div>
          </div>
        </div>
        
        <div class="controls">
          <button class="control-btn restart-btn" @click="restart">
            🔄 重新开始
          </button>
          <button class="control-btn theme-btn" @click="toggleTheme">
            {{ theme === 'classic' ? '🎤 Taylor模式' : '🎲 经典模式' }}
          </button>
        </div>
        
        <div class="instructions">
          <h3>游戏说明</h3>
          <p>• 使用方向键移动方块</p>
          <p>• 相同数字会自动合并</p>
          <p>• 目标是达到2048！</p>
        </div>
      </div>
      
      <div class="right-panel">
        <GameBoard :board="board" :theme="theme" />
      </div>
    </div>
    
    <div v-if="gameOver && !won" class="game-over-overlay">
      <div class="game-over-modal">
        <h2>游戏结束!</h2>
        <p>最终得分: {{ score }}</p>
        <button @click="restart" class="play-again-btn">再玩一次</button>
      </div>
    </div>
    
    <div v-if="won" class="win-overlay">
      <div class="win-modal">
        <h2>恭喜！你赢了！</h2>
        <p>你达到了2048！</p>
        <div class="win-buttons">
          <button @click="restart" class="play-again-btn">再玩一次</button>
          <button @click="won = false" class="continue-btn">继续游戏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #faf8ef 0%, #f4f3f0 100%);
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

/* 隐藏滚动条但保持滚动功能 */
::-webkit-scrollbar {
  display: none;
}

html {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.game-container {
  display: flex;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  max-height: calc(100vh - 40px);
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 280px;
  max-width: 320px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.right-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.game-title h1 {
  font-size: 48px;
  font-weight: bold;
  color: #776e65;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.game-title p {
  font-size: 16px;
  color: #776e65;
  margin: 10px 0 0 0;
  opacity: 0.8;
}

.scores {
  display: flex;
  gap: 15px;
}

.score-box {
  background: linear-gradient(135deg, #bbada0 0%, #a69790 100%);
  border-radius: 10px;
  padding: 18px 22px;
  text-align: center;
  flex: 1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.2);
}

.score-label {
  font-size: 13px;
  color: #eee4da;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.score-value {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-btn {
  background: linear-gradient(135deg, #8f7a66 0%, #7d6856 100%);
  color: #f9f6f2;
  border: none;
  border-radius: 8px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  box-shadow: 0 4px 12px rgba(143, 122, 102, 0.3);
  border: 1px solid rgba(255,255,255,0.1);
}

.control-btn:hover {
  background: linear-gradient(135deg, #9f8a76 0%, #8d7866 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(143, 122, 102, 0.4);
}

.control-btn:active {
  transform: translateY(-1px);
}

.theme-btn {
  background: linear-gradient(135deg, #739d73 0%, #639363 100%);
  box-shadow: 0 4px 12px rgba(115, 157, 115, 0.3);
}

.theme-btn:hover {
  background: linear-gradient(135deg, #83ad83 0%, #73a373 100%);
  box-shadow: 0 6px 20px rgba(115, 157, 115, 0.4);
}

.instructions {
  background: rgba(187, 173, 160, 0.1);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #bbada0;
}

.instructions h3 {
  color: #776e65;
  margin-bottom: 15px;
  font-size: 16px;
}

.instructions p {
  color: #776e65;
  font-size: 14px;
  margin: 8px 0;
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .game-container {
    gap: 40px;
    max-width: 900px;
  }
  
  .left-panel {
    min-width: 260px;
    max-width: 280px;
  }
}

@media (max-width: 768px) {
  .game-container {
    flex-direction: column;
    gap: 30px;
    padding: 0 10px;
  }
  
  .left-panel {
    min-width: auto;
    max-width: none;
    width: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .right-panel {
    width: 100%;
  }
  
  .scores {
    justify-content: center;
  }
  
  .game-title h1 {
    font-size: 36px;
  }
  
  .controls {
    flex-direction: row;
    gap: 15px;
  }
  
  .control-btn {
    flex: 1;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .app {
    padding: 15px;
  }
  
  .game-title h1 {
    font-size: 28px;
  }
  
  .game-title p {
    font-size: 14px;
  }
  
  .controls {
    flex-direction: column;
  }
}

.game-over-overlay,
.win-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.game-over-modal,
.win-modal {
  background: #faf8ef;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.game-over-modal h2,
.win-modal h2 {
  color: #776e65;
  margin-bottom: 20px;
  font-size: 32px;
}

.game-over-modal p,
.win-modal p {
  color: #776e65;
  margin-bottom: 30px;
  font-size: 18px;
}

.play-again-btn,
.continue-btn {
  background: #8f7a66;
  color: #f9f6f2;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.2s;
}

.play-again-btn:hover,
.continue-btn:hover {
  background: #9f8a76;
}

.continue-btn {
  background: #739d73;
}

.continue-btn:hover {
  background: #83ad83;
}

.instructions {
  margin-top: 20px;
  text-align: center;
}

.instructions p {
  color: #776e65;
  font-size: 14px;
}

.win-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
