import React from 'react'
import AddAcount from "../../../img/add-user.png"
import Course from "../../../img/course.png"
import "./TeacherDashboard.css"

const TeacherDashboard = () => {
  return (
    <div className='dashboard'>
        <div className='dashboard-first-section'>
          <div>
            <span><img src={AddAcount} alt="" /></span>
            <span>Add account</span>
          </div>
          <div>
            <span><img src={Course} alt="" /></span>
            <span>Courses</span>
          </div>
          <div>
            <span><img src={AddAcount} alt="" /></span>
            <span>Add account</span>
          </div>
          <div>
            <span><img src={AddAcount} alt="" /></span>
            <span>Add account</span>
          </div>
          <div>
            <span><img src={AddAcount} alt="" /></span>
            <span>Add account</span>
          </div>
        </div>
        <div className='dashboard-second-section'>
          <div className='dashboard-search-box'>
            <span>My Groups</span>
            <input type="text" placeholder="Search groups"/>
          </div>
          <div  className='dashboard-group-card'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    </div>
  )
}

export default TeacherDashboard