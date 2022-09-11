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
  CountDown,
  Col,
  Row
} from 'vant'
const components = [Button, NavBar, Tabbar, TabbarItem, Form, Field, Swipe, SwipeItem, Search, Icon, Grid, GridItem, Image, Cell, CountDown, Col, Row]

const registerVant = (Vue) => {
  components.forEach((compontent) => Vue.use(compontent))
}

export default registerVant
