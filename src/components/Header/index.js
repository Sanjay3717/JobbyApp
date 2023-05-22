import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <button className="logo-container" type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className=""
          />
        </button>
      </Link>
      <div className="header-center-container">
        <Link to="/">
          {' '}
          <button className="header-text-btn">Home</button>{' '}
        </Link>
        <Link to="/jobs">
          <button className="header-text-btn">Jobs</button>{' '}
        </Link>
      </div>
      <div className="home-logout">
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
