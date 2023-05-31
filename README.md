# 项目启动方式
`npm start`

# 项目打包
`npm build`

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

2. 配置方式
 ** 模块化store,各个页面store由各个页面单独管理，集中暴露统计到总的store中
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
 ** 页面单独store 四个文件 login举例
 ```javascript

// login/store/reducer.js
import * as constants from './constants'
import { fromJS } from 'immutable'


// 初始默认的state
const defaultState = fromJS({
  myLoginData: null,
})

const getData = (state, action) => {
  return state.set('myLoginData', action.data)
}

const reducer = (state = defaultState, action) => {
    // 由于state是引用型，不能直接修改，否则是监测不到state发生变化的。因此需要先复制一份进行修改，然后再返回新的state。
    // let newState = Object.assign({}, state)
    switch(action.type) {
        case constants.SET_DATA:
            // newState.myLoginData = action.data
            // return newState
            return getData(state, action)
        default:
            return state
    }
}

export default reducer

// login/store/constants.js
const ZONE = 'pages/login/' // 页面唯一标识

export const SET_DATA = ZONE + 'SET_DATA'

// login/store/actionCreators.js
import * as constants from './constants' // 页面唯一标识

export const setData = (data) => ({
  type: constants.SET_DATA,
  data
})

// login/store/index.js
// 引入所有的js文件统一暴露出去
import reducer from './reducer'
import * as actionCreators from './actionCreators'
import * as constants from './constants'

export { reducer, actionCreators, constants}
 ```

 3. 更改方式
 ```javascript
 import { connect } from 'react-redux'
 import * as actionCreators from './store/actionCreators'
 function Login (props) {
  // store会在props参数中引入, setData为修改store的方法，也会在props中传入
  const { myLoginData, setData } = props
  return ()
 }
//  读取方法
  const mapStateToProps = (state) => {
    return {
      myLoginData: state.getIn(['login', 'myLoginData']),
    }
  }
  // 修改方法
  const mapDispatchToProps = (dispatch) => (
    {
      setData (data) {
        const action = actionCreators.setData(data)
        dispatch(action)
      }
    }
  )
  // 修改方法和读取方法最终都会被connect方法包裹导出，使myLoginData和 setData 作为主方法的参数传入
  export default connect(mapStateToProps, mapDispatchToProps)(Login)
 ```