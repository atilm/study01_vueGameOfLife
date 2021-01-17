<template>
  <div>
    <div>
      <button v-on:click="reset()">New Game</button>
      <button v-on:click="run()">Run</button>
      <button v-on:click="pause()">Pause</button>
    </div>
    <div class="wrapper">
      <div class="deadCell" v-for="cell in cells" :key="cell.key" v-bind:class="{ aliveCell: cell.isAlive}" v-bind:style="{ gridRow: cell.row, gridColumn: cell.column }">
      </div>
    </div>
  </div>
</template>

<script>
import GameOfLife from "./gameOfLife"

export default {
  name: 'GameField',
  data: function() {
    this.game = new GameOfLife(20, 20, 0.1);

    return {
      cells: create_cells(this.game),
      running: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    reset: function() {
      this.pause();
      this.game = new GameOfLife(20, 20, 0.25);
      update_cells(this.game, this.cells);
    },
    run: function() {
      this.running = true;
      this.loop();
    },
    pause: function() {
      this.running = false;
    },
    loop: function() {
      this.game.Evolve();
      update_cells(this.game, this.cells);
      if (this.running === true)
        setTimeout(this.step, 200);
    },
    step: function() {
      requestAnimationFrame(this.loop);
    }
  }
}

function create_cells(game){
  let cells = [];
  update_cells(game, cells);
  return cells;
}

function update_cells(game, cells){
  cells.splice(0,cells.length)
  let count = 0;
  for (let r = 0; r < game.RowCount(); r++) {
    for (let c = 0; c < game.ColumnCount(); c++) {
      cells.push({
        key: count++,
        isAlive: game.IsAlive(r, c),
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
