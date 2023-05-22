import {AiFillStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {BsBriefcase} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'
import JobItem from '../JobItem'

const AboutJobItem = props => {
  const {allJobs} = props
  const {
    companyLogoUrl,
    data,
    jobDescription,
    id,
    location,
    pacakgePerAnnum,
    rating,
    title,
  } = allJobs

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <button type="button" className="jobs-btn-style">
          <div className="all-jobs-item">
            <div className="all-jobs-title-container">
              <div>
                <img
                  src={companyLogoUrl}
                  alt={title}
                  className="all-company-logo"
                />
              </div>
              <div className="all-jobs-title-alignment">
                <h1>{title}</h1>
                <div className="rating-container">
                  <AiFillStar />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="main-info">
              <div className="location-data-container">
                <div className="location-info">
                  <GrLocation className="location-icon" />
                  <p>{location}</p>
                </div>
                <div className="location-info">
                  <BsBriefcase className="location-icon" />
                  <p>{data}</p>
                </div>
              </div>
              <div>
                <p className="salary">{pacakgePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div className="job-description">
              <h1>Description</h1>
              <p className="jd">{jobDescription}</p>
            </div>
          </div>
        </button>
      </Link>
    </li>
  )
}
export default AboutJobItem
