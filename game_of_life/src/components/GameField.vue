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
import Animation from "./animation"
import {create_cells, map_cells_to_game, map_game_to_cells} from "./helpers"

export default {
  name: 'GameField',
  data: function() {
    return {
      cells: create_cells(new Array(0), 20, 20, 0.25),
      running: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    reset: function() {
      this.animation?.pause();
      create_cells(this.cells, 20, 20, 0.25);
    },
    run: function() {
      this.animation?.pause();
      this.game = new GameOfLife(20, 20);
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

.deadCell{
  background-color: rgb(155, 175, 201);
}

.aliveCell{
  background-color: rgb(201, 85, 129)
}

</style>
