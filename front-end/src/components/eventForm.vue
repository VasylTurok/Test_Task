<template>
<div>
        <form @submit.prevent>
        <h4>Add event</h4>
        <MyInput v-model="event.title" class="input" type="text" placeholder="Title" ></MyInput>
        <MyInput v-model="event.about" class="input" type="text" placeholder="About"></MyInput>
        <MyInput v-model="event.startDate" class="input" type="Date" placeholder="Start date"></MyInput>
        <MyInput v-model="event.endDate" class="input" type="Date" placeholder="End date"></MyInput>
        <MyButton class="btn" style="margin-top: 15px;" @click="addEvent" >Create</MyButton>

    </form>
    </div>

</template>

<script>
import MyInput from './UI/MyInput.vue';

export default {
    data() {
        return {
            event: {
                title: "",
                about: "",
                startDate: Date,
                endDate:Date
            }
        };
    },
    methods: {
        addEvent() {
            this.$emit("create", this.event);
            this.event = {
                title: "",
                about: "",
                startDate: Date,
                endDate:Date

            };

        }
    },
    components: { MyInput }
}
</script>

<style scoped>

form {
display: flex;
flex-direction: column;
}




</style>