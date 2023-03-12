<template>
    <div>
        <h1>Name: {{ user.userName }}</h1>
        <h3>Email: {{ user.email }}</h3>
        <h3>Phone: {{ user.phone }}</h3>
        <!-- <div> <strong>Events count:</strong>{{ user.events.length }}</div> -->
        <h3>Events count: {{ eventsCount}}</h3>
        <h3>Next event date: {{ user.nextEventDate }}</h3>
        <MyDialog v-model:show="dialogVisible">
            <EventForm @create="addEvent"></EventForm>
        </MyDialog>
        <div class="app_btns">
        <MyButton @click="showDialog">Add event</MyButton>
        <MySelect :modelValue="selectedSort " v-model="selectedSort" :options="sortOptions"></MySelect></div>
        <EventList  v-bind:events="events" v-if="eventsCount>0"></EventList>
    <h2 v-else style="color: red;">Event list empty</h2>

    </div>
</template>

<script>
const axios =require('axios')
import EventList from '@/components/eventList.vue'
import EventForm from '@/components/eventForm.vue'


    export default {
        components:{
            EventList,
            EventForm,
        },
        data(){
        return{
            user: {},
            events:[],
            eventsCount:0,
            dialogVisible: false,
            selectedSort:'',
            sortOptions:[
                {value:"title",name: 'by titel'},
                {value:"startDate",name: 'by start date'}]
            
            
        
        }},

        methods:{
            addEvent(event) { 
                let evSt=Date.parse(event.startDate)
                let evEn=Date.parse(event.endDate)
                if((evSt>Date.now())&&(evEn>evSt)){
                   
                    let bool=true
                    for(const el of this.events){
                        let elSt=Date.parse(el.startDate)
                        let elEn = Date.parse(el.endDate)
                        if ((elSt<=evSt&&elEn>evSt)||(elSt>evSt&&elSt<evEn)){
                            bool=false
                            alert('You cant create event for this time')   
                            break
                        }
                    }

                    if(bool){
                    axios.post(`http://localhost:5000/addEvent/${this.$route.params.id}`, { "title": event.title, "about": event.about, "startDate": event.startDate, "endDate": event.endDate })
                    .then(response => { })
                    .catch(e => {
                    this.errors.push(e);
                    });
                    this.events = [];
                    this.fetchEvents();
                    this.fetchUser();}
                }
                else{
                    alert('You cant create event for this time')   



        }
            this.dialogVisible = false;
        },
            showDialog() {
            this.dialogVisible = true;
        },
            async fetchUser(){
            try{
                const response = await axios.get(`http://localhost:5000/getUser/${this.$route.params.id}`)
                this.user=response.data;
                this.eventsCount=this.user.events.length
            } catch(err){
                console.log(err)
            }
        },
        async fetchEvents(){
            try{
                const response = await axios.get(`http://localhost:5000/getEvents/${this.$route.params.id}`)
                this.events=response.data.reverse();
                console.log(this.events)
            } catch(err){
                console.log(err)
            }
        }

        },
        mounted(){
        this.fetchUser();
        this.fetchEvents();
    },
    watch:{
        selectedSort(newValue){
            console.log(newValue)
            if (newValue==='title'){
                this.events.sort((a,b) => a.title > b.title ? 1 : -1);
            }
            if(newValue==='startDate'){
                this.events.sort((a,b) => a.startDate < b.startDate ? 1 : -1).reverse();
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