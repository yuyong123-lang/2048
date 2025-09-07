import { ref, reactive } from 'vue'

export function use2048() {
  const board = ref(Array(4).fill().map(() => Array(4).fill(0)))
  const score = ref(0)
  const bestScore = ref(parseInt(localStorage.getItem('2048-best-score') || '0'))
  const gameOver = ref(false)
  const won = ref(false)
  const theme = ref(localStorage.getItem('2048-theme') || 'classic')

  function toggleTheme() {
    theme.value = theme.value === 'classic' ? 'taylor' : 'classic'
    localStorage.setItem('2048-theme', theme.value)
  }

  function initGame() {
    // 重置游戏状态
    board.value = Array(4).fill().map(() => Array(4).fill(0))
    score.value = 0
    gameOver.value = false
    won.value = false
    
    // 添加两个初始方块
    addRandomTile()
    addRandomTile()
    
    console.log('Game initialized with board:', board.value)
  }

  function addRandomTile() {
    const emptyCells = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board.value[i][j] === 0) {
          emptyCells.push({ row: i, col: j })
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      const newValue = Math.random() < 0.9 ? 2 : 4
      
      // 创建新数组以触发Vue响应性
      const newBoard = board.value.map(row => [...row])
      newBoard[randomCell.row][randomCell.col] = newValue
      board.value = newBoard
      
      console.log(`Added ${newValue} at position (${randomCell.row}, ${randomCell.col})`)
    } else {
      console.log('No empty cells available')
    }
  }

  function moveLeft() {
    let moved = false
    let totalPoints = 0
    let hasWon = false
    const newBoard = board.value.map(row => [...row])

    for (let i = 0; i < 4; i++) {
      const originalRow = [...newBoard[i]]
      const processedRow = processRowLeft(originalRow)
      
      // 检查是否有移动
      for (let j = 0; j < 4; j++) {
        if (originalRow[j] !== processedRow.tiles[j]) {
          moved = true
        }
        newBoard[i][j] = processedRow.tiles[j]
      }
      
      totalPoints += processedRow.score
      if (processedRow.won) {
        hasWon = true
      }
    }

    if (moved) {
      board.value = newBoard
      score.value += totalPoints
      if (hasWon && !won.value) {
        won.value = true
      }
      addRandomTile()
      checkGameOver()
    }
  }

  function processRowLeft(row) {
    // 移除所有的0
    const tiles = row.filter(val => val !== 0)
    let score = 0
    let won = false
    
    // 从左到右处理合并
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] === tiles[i + 1]) {
        tiles[i] *= 2
        score += tiles[i]
        if (tiles[i] === 2048) {
          won = true
        }
        tiles[i + 1] = 0
      }
    }
    
    // 再次移除0并补齐到4位
    const finalTiles = tiles.filter(val => val !== 0)
    while (finalTiles.length < 4) {
      finalTiles.push(0)
    }
    
    return { tiles: finalTiles, score, won }
  }

  function processRowRight(row) {
    // 反转，处理，再反转
    const reversed = [...row].reverse()
    const processed = processRowLeft(reversed)
    return {
      tiles: processed.tiles.reverse(),
      score: processed.score,
      won: processed.won
    }
  }

  function moveRight() {
    let moved = false
    let totalPoints = 0
    let hasWon = false
    const newBoard = board.value.map(row => [...row])

    for (let i = 0; i < 4; i++) {
      const originalRow = [...newBoard[i]]
      const processedRow = processRowRight(originalRow)
      
      // 检查是否有移动
      for (let j = 0; j < 4; j++) {
        if (originalRow[j] !== processedRow.tiles[j]) {
          moved = true
        }
        newBoard[i][j] = processedRow.tiles[j]
      }
      
      totalPoints += processedRow.score
      if (processedRow.won) {
        hasWon = true
      }
    }

    if (moved) {
      board.value = newBoard
      score.value += totalPoints
      if (hasWon && !won.value) {
        won.value = true
      }
      addRandomTile()
      checkGameOver()
    }
  }

  function moveUp() {
    let moved = false
    let totalPoints = 0
    let hasWon = false
    const newBoard = board.value.map(row => [...row])

    for (let j = 0; j < 4; j++) {
      // 提取列
      const originalCol = []
      for (let i = 0; i < 4; i++) {
        originalCol.push(newBoard[i][j])
      }
      
      const processedCol = processRowLeft(originalCol) // 向上移动等同于向左移动
      
      // 将结果写回列
      for (let i = 0; i < 4; i++) {
        if (newBoard[i][j] !== processedCol.tiles[i]) {
          moved = true
        }
        newBoard[i][j] = processedCol.tiles[i]
      }
      
      totalPoints += processedCol.score
      if (processedCol.won) {
        hasWon = true
      }
    }

    if (moved) {
      board.value = newBoard
      score.value += totalPoints
      if (hasWon && !won.value) {
        won.value = true
      }
      addRandomTile()
      checkGameOver()
    }
  }

  function moveDown() {
    let moved = false
    let totalPoints = 0
    let hasWon = false
    const newBoard = board.value.map(row => [...row])

    for (let j = 0; j < 4; j++) {
      // 提取列
      const originalCol = []
      for (let i = 0; i < 4; i++) {
        originalCol.push(newBoard[i][j])
      }
      
      const processedCol = processRowRight(originalCol) // 向下移动等同于向右移动
      
      // 将结果写回列
      for (let i = 0; i < 4; i++) {
        if (newBoard[i][j] !== processedCol.tiles[i]) {
          moved = true
        }
        newBoard[i][j] = processedCol.tiles[i]
      }
      
      totalPoints += processedCol.score
      if (processedCol.won) {
        hasWon = true
      }
    }

    if (moved) {
      board.value = newBoard
      score.value += totalPoints
      if (hasWon && !won.value) {
        won.value = true
      }
      addRandomTile()
      checkGameOver()
    }
  }

  function checkGameOver() {
    if (score.value > bestScore.value) {
      bestScore.value = score.value
      localStorage.setItem('2048-best-score', bestScore.value.toString())
    }

    const hasEmptyCell = board.value.some(row => row.some(cell => cell === 0))
    if (hasEmptyCell) return

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board.value[i][j]
        if (
          (j < 3 && current === board.value[i][j + 1]) ||
          (i < 3 && current === board.value[i + 1][j])
        ) {
          return
        }
      }
    }

    gameOver.value = true
  }

  function restart() {
    initGame()
  }

  initGame()

  return {
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
  }
}