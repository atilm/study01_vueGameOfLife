<template>
  <div>
    <div>
      <button v-on:click="reset()">New Game</button>
      <button v-on:click="run()">Run</button>
      <button v-on:click="pause()">Pause</button>
    </div>
    <div class="wrapper">
      <cell  v-for="cell in cells" :key="cell.key" 
      v-bind:alive=cell.isAlive
      v-bind:style="{ gridRow: cell.row, gridColumn: cell.column }" />
    </div>
  </div>
</template>

<script>
import Cell from "./Cell.vue"
import GameOfLife from "./gameOfLife"
import Animation from "./animation"
import {create_cells, map_cells_to_game, map_game_to_cells} from "./helpers"

const dimensions = {
  X: 20,
  Y: 20
};

export default {
  name: 'GameField',
  data: function() {
    return {
      rowCount: dimensions.X,
      columnCount: dimensions.Y,
      cells: create_cells(new Array(0), dimensions.X, dimensions.Y, 0.25),
      running: false
    }
  },
  components: {
    Cell
  },
  methods: {
    reset: function() {
      this.animation?.pause();
      create_cells(this.cells, this.rowCount, this.columnCount, 0.25);
    },
    run: function() {
      this.animation?.pause();
      this.game = new GameOfLife(this.rowCount, this.columnCount);
      map_cells_to_game(this.cells, this.game);
      this.animation = new Animation(() => this.step(), 200);
      this.animation.run();
    },
    pause: function() {
      this.animation.pause();
    },
    step: function() {
      this.game.Evolve();
      map_game_to_cells(this.game, this.cells);
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
</style>
