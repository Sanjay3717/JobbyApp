import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'
import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

const getJobDetailsApiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class JobItem extends Component {
  state = {
    jobDetailsList: [],
    getJobsApi: getJobDetailsApiConstants.initial,
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {jobDetailsList} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({getJobsApi: getJobDetailsApiConstants.inProgress})
    const fetchJobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(fetchJobDetailsUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = [data.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobsData = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetailsList: fetchedData,
        similarJobsData: updatedSimilarJobsData,
        getJobsApi: getJobDetailsApiConstants.success,
      })
    } else {
      this.setState({
        getJobsApi: getJobDetailsApiConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobDetailsList, similarJobsData} = this.state
    console.log(jobDetailsList)
    if (jobDetailsList.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        id,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDetailsList[0]
      return (
        <div className="job-item-container">
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
            <div className="main-info">
              <div className="location-data-container">
                <div className="location-info">
                  <GrLocation className="location-icon" />
                  <p>{location}</p>
                </div>
                <div className="location-info">
                  <BsBriefcase className="location-icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="salary">{packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div className="job-description">
              <h1>Description</h1>
              <p className="jd">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1>Skills</h1>
              <ul className="skill-list-container">
                {skills.map(eachItem => (
                  <li key={eachItem.name} className="skill-list">
                    <img src={eachItem.imageUrl} alt={eachItem.name} />
                    <p className="skill-name">{eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-work-container">
              <div>
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <div>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life-at-company"
                  className=""
                />
              </div>
            </div>
            <div className="similar-jobs-container">
              <h1>SimilarJobs</h1>
              <ul className="similar-jobs-alignment">
                {similarJobsData.map(eachJob => (
                  <SimilarJobs similarJobsDisplay={eachJob} key={eachJob.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const {jobDetailsList} = this.state
    // const {skills} = jobDetailsList
    console.log(jobDetailsList.skills)
    return (
      <div>
        <Header />
        {this.renderSuccessView()}
      </div>
    )
  }
}
export default JobItem
