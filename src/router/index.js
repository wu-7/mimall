import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home')
const Index = () => import('views/index/Index')
const Product = () => import('views/product/Product')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')
const Cart = () => import('views/cart/Cart')
const Order = () => import('views/order/Order')
const OrderList = () => import('views/order/OrderList')
const OrderConfirm = () => import('views/order/OrderConfirm')
const OrderPay = () => import('views/order/OrderPay')
const AliPay = () => import('views/order/AliPay')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/index',
    children:[
      {
        path:'/index',
        name: 'index',
        component: Index
      },{
        path:'/product/:id',
        component: Product
      },{
        path:'/detail/:id',
        component: Detail
      }
    ]
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/order',
    component: Order,
    children: [
      {
        path: 'list',
        component: OrderList
      },{
        path: 'confirm',
        component: OrderConfirm
      },{
        path: 'pay',
        component: OrderPay
      },{
        path: 'alipay',
        component: AliPay
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router