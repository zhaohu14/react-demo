# store使用方式
1. 读取方式
```javascript
// 在页面或者组件中引用 react-redux
import { connect } from 'react-redux'

function login(props) {
  // 主方法
  // .....
}

// 返回store方法
const mapStateToProps = (state) => {
  return {
    myLoginData: state.getIn(['login', 'myLoginData']),
  }
}
// 使用connect包裹sotre相关方法 
// 原始写发应该为 export default Header
export default connect(mapStateToProps, null)(Header)

```


