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
  Row,
  Tab,
  Tabs
} from 'vant'
const components = [Button, NavBar, Tabbar, TabbarItem, Form, Field, Swipe, SwipeItem, Search, Icon, Grid, GridItem, Image, Cell, CountDown, Col, Row, Tabs, Tab]

const registerVant = (Vue) => {
  components.forEach((compontent) => Vue.use(compontent))
}

export default registerVant
