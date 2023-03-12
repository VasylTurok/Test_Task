<template>
    <div>
  
  <div class="app_btns"> 
    <MyDialog v-model:show="dialogVisible">
    <UserForm @create="createUser"></UserForm>
</MyDialog>
  <MyButton @click="showDialog">Create user</MyButton>
  <MySelect :modelValue="selectedSort " v-model="selectedSort" :options="sortOptions"></MySelect></div>
    <UserList  v-bind:users="users" @remove="removeUser" v-if="users.length>0"></UserList>
    <h2 v-else style="color: red;">User list empty</h2>
    </div>
</template>

<script>
import UserList from '@/components/userList.vue'
import UserForm from '@/components/userForm.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
const axios =require('axios')
import MyButton from '@/components/UI/MyButton.vue';
import MySelect from '@/components/UI/MySelect.vue';

export default{
    components:{
    UserForm,
    UserList,
    MyDialog,
    MyButton,
    MySelect
},
    data(){
        return{
            users: [],
            dialogVisible: false,
            selectedSort:'',
            sortOptions:[
                {value:"userName",name: 'by name'},
                {value:"events",name: 'by count'}]
        }
    },
    methods:{
        createUser(user) {
            console.log(user);
            // this.users.push(user)
            // this.dialogVisible=false;
            axios.post(`http://localhost:5000/registration`, { "userName": user.userName, "email": user.email, "password": user.password, "phone": user.phone })
                .then(response => { })
                .catch(e => {
                this.errors.push(e);
            });
            this.users = [];
            this.fetchUsers();
            this.dialogVisible = false;
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async removeUser(user){
            const res = await axios.delete(`http://localhost:5000/deleteUser/${user._id}`);
            console.log(res)
            this.users = this.users.filter(p=>p._id!==user._id)
        },

        async fetchUsers(){
            try{
                const response = await axios.get("http://localhost:5000/users")
                this.users=response.data.reverse();
            } catch(err){
                console.log(err)
            }
        }
    },
    mounted(){
        this.fetchUsers();
    },
    watch:{
        selectedSort(newValue){
            console.log(newValue)
            if (newValue==='userName'){
                this.users.sort((a,b) => a.userName > b.userName ? 1 : -1);
            }
            if(newValue==='events'){
                this.users.sort((a,b) => a.events.length < b.events.length ? 1 : -1);
            }
            
        },
    }
    
}
</script>

<style scoped>
.app_btns{
    padding: 15px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content:space-between; 
}
</style>