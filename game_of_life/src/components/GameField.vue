<template>
  <div>
    <div>
      <button v-on:click="reset()">New Game</button>
      <button>Start</button>
      <button>Pause</button>
    </div>
    <div class="wrapper">
      <div class="deadCell" v-for="cell in cells" :key="cell.key" v-bind:class="{ aliveCell: cell.isAlive}" v-bind:style="{ gridRow: cell.row, gridColumn: cell.column }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameField',
  data: function() {
    return {
      cells: create_cells(20, 20)
    }
  },
  props: {
    msg: String
  },
  methods: {
    reset: function() {
      reset_cells(20, 20, this.cells, 0.1)
    }
  }
}

function create_cells(rowCount, colCount){
  let cells = [];
  reset_cells(rowCount, colCount, cells, 0);
  return cells;
}

function reset_cells(rowCount, colCount, cells, aliveProbability){
  cells.splice(0,cells.length)
  let count = 0;
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      cells.push({
        key: count++,
        isAlive: Math.random() < aliveProbability,
        row: r+1,
        column: c+1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$cell-size: 20px;
$cell-gap: $cell-size / 10;

button {
  background-color: rgb(33, 43, 49);
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  padding: 15px 32px;
  margin: 10px 5px;
  font-size: 16px;
  border-radius: 5px;
}

.wrapper{
  background-color: rgb(49, 48, 48);
  display: grid;
  grid-template-rows: repeat(20, $cell-size);
  grid-template-columns: repeat(20, $cell-size);
  gap: $cell-gap;
  padding: $cell-gap;
  justify-content: center;
  width: 20 * $cell-size + 20 * $cell-gap + 6 * $cell-size;
  margin: auto;
  border-radius: 10px;
}

.deadCell{
  background-color: rgb(155, 175, 201);
}

.aliveCell{
  background-color: rgb(201, 85, 129)
}

</style>
