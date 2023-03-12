import { createRouter, createWebHashHistory } from "vue-router";
import Profile from "@/pages/Profile"
import Main from "@/pages/Main"
import MainStore from '@/pages/MainStore'
export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/',component:Main, alias:"/"},
        {path:'/profile/:id',component:Profile },
        {path:'/store',component: MainStore}

    ]
})