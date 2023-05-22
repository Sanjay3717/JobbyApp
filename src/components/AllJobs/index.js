import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import AboutJobItem from '../AboutJobItem'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

const apiJobStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    profileDetails: [],
    allJobsData: [],
    isLoading: true,
    checkBoxInput: '',
    radioButtonInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiJobsStatus: apiJobStatusConstants.initial,
  }

  componentDidMount() {
    this.profileDetails()
    this.getAllJobDetails()
  }

  profileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const userUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
    }
  }

  displayProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="all-jobs-profile-container">
        <img src={profileImageUrl} alt="profile" className="" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => <button type="button">Retry</button>

  renderCheckBoxElements = () => (
    <div className="employment-type">
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachItem => (
          <li className="list-item-style" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              onChange={this.onCheckInputChange}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderRadioElements = () => (
    <div className="employment-type">
      <h1>Type of Employment</h1>
      <ul>
        {salaryRangesList.map(eachItem => (
          <li className="list-item-style" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              onChange={this.onRadioInputChange}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  onRadioInputChange = event => {
    this.setState({radioButtonInput: event.target.id}, this.getAllJobDetails)
  }

  onCheckInputChange = event => {
    this.setState(
      prevState => ({
        checkBoxInput: [...prevState.checkBoxInput, event.target.id],
      }),
      this.getAllJobDetails,
    )
  }

  searchInputChange = event => {
    console.log(event.target.value)
    this.setState({searchInput: event.target.value}, this.getAllJobDetails)
  }

  pressEnter = event => {
    if (event.key === 'Enter') {
      this.searchInputChange()
    }
  }

  renderSearchTab = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-tab"
        placeholder="Search"
        onChange={this.searchInputChange}
        onKeyDown={this.pressEnter}
      />
      <button
        type="button"
        className="search-icon-style"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  getAllJobDetails = async () => {
    this.setState({apiJobsStatus: apiJobStatusConstants.inProgress})
    const {checkBoxInput, radioButtonInput, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const allJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&&minimum_package=${radioButtonInput}&&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(allJobsUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        data: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        pacakgePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(fetchedData)
      this.setState({
        allJobsData: fetchedData,
        isLoading: false,
        apiJobsStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobStatusConstants.failure})
    }
  }

  onGetJobs = () => {
    const {allJobsData} = this.state

    console.log('No Jobs')
    const noJobs = allJobsData.length === 0
    console.log(noJobs)
    // const noJobs = true
    // console.log(allJobsData.length === 0)

    // console.log(noJobs)
    return noJobs ? (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className=""
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul>
        {allJobsData.map(eachJobs => (
          <AboutJobItem allJobs={eachJobs} key={eachJobs.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.profileDetails()}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsOutput = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiJobStatusConstants.success:
        return this.onGetJobs()
      case apiJobStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiJobStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="all-jobs-left-container">
            {this.displayProfile()}
            <hr />
            {this.renderCheckBoxElements()}
            <hr />
            {this.renderRadioElements()}
          </div>
          <div className="all-jobs-right-container">
            <div>{this.renderSearchTab()}</div>

            {this.renderJobsOutput()}
          </div>
        </div>
      </>
    )
  }
}
export default AllJobs
