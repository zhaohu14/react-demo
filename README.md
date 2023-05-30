# redux使用方式
`npm i redux-immutable`
`npm i react-redux`
1. 读取方式
```javascript
// 在页面或者组件中引用 react-redux
import { connect } from 'react-redux'

function Login(props) {
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
export default connect(mapStateToProps, null)(Login)

```

2. 改动方式
 **模块化store,各个页面store由各个页面单独管理，集中暴露统计到总的store中
``` javascript
// store/index.js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 这里让项目支持浏览器插件Redux DevTools
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(
  reducer,
  enhancer
)
// 引入reducer文件 然后暴露出store
export default store
/* ------------------------------分割线------------------------------ */
// store/reducer.js
// redux-immutable: 对redux进行处理，更加方便的处理redux
import { combineReducers } from 'redux-immutable'
import { reducer as loginReducer } from '@/pages/login/store'
import { reducer as headerReducer } from '@/component/header/store'
// 引入各个页面的store

const reducer = combineReducers({
    login: loginReducer,
    header: headerReducer
})

export default reducer

``` 
 **页面单独store 四个文件 login举例
 ```javascript

 ```