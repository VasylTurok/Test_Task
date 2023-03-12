<template>
    <div >
        <h3>User list</h3>
        <TransitionGroup name="list">
        <div class="post" v-for="user in paginatedData" :key="user.id" @remove="$emit('remove', user)">
        <div> <strong>User name:</strong>{{ user.userName }}</div>
        <div> <strong>Email:</strong>{{ user.email }}</div>
        <div> <strong>Phone:</strong>{{ user.phone }}</div>
        <div> <strong>Events count:</strong>{{ user.events.length }}</div>
        <div> <strong>Next Event Date:</strong>{{ user.nextEventDate }}</div>
        <div class="post_btn">
        <MyButton class="btn" @click="$router.push(`/profile/${user._id}`)">Open</MyButton>
        <MyButton class="btn" @click="$emit('remove',user)">Delete</MyButton>
    </div>
    </div>
    </TransitionGroup>
    <MyButton @click="prevPage" :disabled="pageNumber === 0">
    Previous
  </MyButton>
  <MyButton @click="nextPage" :disabled="pageNumber >= pageCount -1" >
    Next
  </MyButton>
    </div>

</template>

<script>
import MyButton from './UI/MyButton.vue';

    export default {
    data() {
        return {
            pageNumber: 0
        };
    },
    props: {
        users: {
            type: Array,
            required: true,
        },
        size: {
            type: Number,
            required: false,
            default: 10
        }
    },
    methods: {
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        }
    },
    computed: {
        pageCount() {
            let l = this.users.length, s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size, end = start + this.size;
            return this.users.slice(start, end);
        }
    },
    components: { MyButton }
}
</script>

<style  scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content:space-between;
}

.list-item{ 
display: inline-block;
margin-right: 10px;
}
.list-enter-active,
.list-leave-active{
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to{
    opacity: 0;
    transform: translateX(130px);
}
.lost-move{
    transition: transform 0.8s ease;
}



</style>