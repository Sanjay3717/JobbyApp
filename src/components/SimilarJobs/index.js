import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDisplay} = props
  const {
    companyLogoUrl,
    id,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobsDisplay
  console.log()
  return (
    <li className="similar-jobs-list">
      <div className="all-jobs-item job-item-alignment">
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
