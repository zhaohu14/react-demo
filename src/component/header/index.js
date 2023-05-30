import './header.styl'
import { connect } from 'react-redux'

function Header(props) {
  const { title, info, myLoginData  } = props
  info && info()
  return (
    <div className="M-header">
      Header：{ title }
      <span style={{ marginLeft: 20 }}>myLoginData:{myLoginData}</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myLoginData: state.getIn(['login', 'myLoginData']),
  }
}

export default connect(mapStateToProps, null)(Header)