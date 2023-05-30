import { Button, Input } from 'antd'
import './login.styl'

import { useNavigate } from 'react-router-dom'
import Header from '@/component/header'


import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'



function Login(props) {
  const { myLoginData, setData } = props
  const navigate = useNavigate()

  return (
      <div className="P-login">
          <Header title="login" info={()=>{console.log('info:login')}}/>
          <div className="ipt-con">login store: myData = {myLoginData}</div>
          <div className="ipt-con">
            <button onClick={() => {setData('123456')}}>更改login store的myData</button>
          </div>
          <div className="ipt-con">
              <Input placeholder="账号" />
          </div>
          <div className="ipt-con">
              <Input.Password placeholder="密码" />
          </div>
          <div className="ipt-con">
              <Button type="primary" block={true} onClick={()=>{navigate('/home')}}>
                  登录
              </Button>
          </div>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myLoginData: state.getIn(['login', 'myLoginData']),
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    setData (data) {
      const action = actionCreators.setData(data)
      dispatch(action)
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)