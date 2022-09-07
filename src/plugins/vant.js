// 自动注册vant组件
import {
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  Swipe,
  SwipeItem,
  Search,
  Icon,
  Grid,
  GridItem,
  Image,
  Cell,
  CountDown
} from 'vant'
const components = [Button, NavBar, Tabbar, TabbarItem, Form, Field, Swipe, SwipeItem, Search, Icon, Grid, GridItem, Image, Cell, CountDown]

const registerVant = (Vue) => {
  components.forEach((compontent) => Vue.use(compontent))
}

export default registerVant
