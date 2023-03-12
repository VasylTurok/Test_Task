<template>
    <div>
        <form @submit.prevent>
        <h4>Registration</h4>
        <MyInput v-model="user.userName" class="input" type="text" placeholder="User name" ></MyInput>
        <MyInput v-model="user.email" class="input" type="text" placeholder="Email"></MyInput>
        <MyInput v-model="user.phone" class="input" type="text" placeholder="Phone"></MyInput>
        <MyInput v-model="user.password" class="input" type="text" placeholder="Password"></MyInput>
        <MyButton class="btn" style="margin-top: 15px;" @click="createUser" >Create</MyButton>

    </form>
    </div>
</template>

<script >
import MyInput from './UI/MyInput.vue';

export default {
    data() {
        return {
            user: {
                userName: "",
                email: "",
                phone: "",
                password:""
            }
        };
    },
    methods: {
        createUser() {
            this.$emit("create", this.user);
            this.user = {
                userName: "",
                email: "",
                phone: "",
                password:""

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