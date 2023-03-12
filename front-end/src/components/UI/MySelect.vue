<template>
    <Select v-model="selOptions" @change="changeOption">
        <option > Choose</option>
        <option v-for="option in options" :key="option.value" :value="option.value" >{{ option.name }}</option>
        </Select>
</template>

<script>
    export default {
        name:"MySelect",
        data(){
            return {
               selOptions: '', 

            }
        },
        props:{
            modelValue:{
                type:String,
            },
            options:{
                type : Array,
                default: ()=>[]
            }
        },
        methods:{
            changeOption(event){
                this.$emit('update:modelValue',event.target.value)
            },

        }
    }
</script>

<style scoped>

</style>