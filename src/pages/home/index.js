import { Button } from 'antd'
import './home.styl'
import { useNavigate } from 'react-router-dom'
import { goto } from '@/api'
import Header from '@/component/header'

function Home() {
 const navigate  = useNavigate()
  return (
      <div className="P-home">
        <Header title="home" info={()=>{console.log('info:home')}}/>
        <h1>Home Page</h1>
        <div className="ipt-con">
            <Button onClick={()=>{goto('/login')}}>组件外跳转</Button>
        </div>
        <div className="ipt-con">
            <Button onClick={()=>{navigate('/login')}}>返回登录</Button>
        </div>
      </div>
  )
}

export default Home