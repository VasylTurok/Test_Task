<template>
    <div >
        <h3>User list</h3>
        <TransitionGroup name="list">
        <div class="post" v-for="event in paginatedData" :key="event.id" >
        <div> <strong>Title:</strong>{{ event.title }}</div>
        <div> <strong>About:</strong>{{ event.about }}</div>
        <div> <strong>Start date</strong>{{ event.startDate }}</div>
        <div> <strong>End date</strong>{{ event.endDate }}</div>


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
        events: {
            type: Array,
            required: true,
        },
        size: {
            type: Number,
            required: false,
            default: 5
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
            let l = this.events.length, s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size, end = start + this.size;
            return this.events.slice(start, end);
        }
    },
    components: { MyButton }
}
</script>

<style  scoped>
h3{
    align-items: center;
    display: flex;
    justify-content: center;
}

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