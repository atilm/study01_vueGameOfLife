<template>
    <div class="deadCell"
      v-bind:class="{ aliveCell: alive}">
    </div>
</template>

<script>
export default {
    name: "Cell",
    props: {
        alive: Boolean
    }
}
</script>

<style scoped lang="scss">
.deadCell{
background-color: rgb(155, 175, 201);
}

.aliveCell{
background-color: rgb(201, 85, 129)
}
</style>