<template>
        <button class="btn">
            <slot></slot>
        </button>

</template>

<script>
    export default {
        name: 'MyButton'
    }
</script>

<style scoped>
.btn{
    margin-top: 0px;
    align-self: flex-end;
    padding: 15px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
</style>