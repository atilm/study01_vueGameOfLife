<template>
  <div class="wrapper">
    <div class="cell" v-for="cell in cells" :key="cell.key" v-bind:style="{ gridRow: cell.row, gridColumn: cell.column }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function() {
    return {
      cells: create_cells(20, 20)
    }
  },
  props: {
    msg: String
  }
}

function create_cells(rowCount, colCount){
  let cells = [];
  let count = 0;
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      cells.push({
        key: count++,
        row: r+1,
        column: c+1
      })
    }
  }
  return cells;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$cell-size: 10px;
$cell-gap: $cell-size / 10;

.wrapper{
  background-color: rgb(49, 48, 48);
  display: grid;
  grid-template-rows: repeat(20, $cell-size);
  grid-template-columns: repeat(20, $cell-size);
  gap: $cell-gap;
  padding: $cell-gap;
  justify-content: center;
  width: 20 * $cell-size + 20 * $cell-gap;
  margin: auto;
}

.cell{
  background-color: rgb(155, 175, 201);
}
</style>
