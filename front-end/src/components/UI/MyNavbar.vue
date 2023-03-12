<template>
    <div class="navbar">
    <button @click="$router.push('/')">Main</button>
    <!-- <button @click="$router.push('/store')">Store</button> -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style >
.navbar{
    height: 50px;
    background:rgb(76, 89, 192)  ;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 15px;
}
button{
    padding: auto 15px;
    margin-left: 15px;
    background: teal;
    
}
</style>