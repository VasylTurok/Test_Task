<template> 
<MyNavbar></MyNavbar>
<div class="app">
    <RouterView ></RouterView>
</div>

</template>

<script>
import MyNavbar from './components/UI/MyNavbar.vue';

export default {
    components: { MyNavbar }
}

</script>

<style >
*{
    margin: 0;
    padding: 3px;
    box-sizing: border-box; 
}
.app{
    padding: 20px;
}
.app_btns{
    display: flex;
    justify-content: space-between;
}




</style>