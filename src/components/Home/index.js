import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  console.log()
  return (
    <div>
      <Header />
      <div className="home-bg-container content-color">
        <div className="home-content">
          <h1 className="home-title">Find The Job That Fits Your Life</h1>
          <p className="home-desc">
            Millions of people are searching for job, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
