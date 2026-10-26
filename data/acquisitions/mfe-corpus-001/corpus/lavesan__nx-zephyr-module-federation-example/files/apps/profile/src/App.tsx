import "./App.css";

const App = () => {
  const studentData = {
    name: "John Smith",
    role: "Student",
    joinDate: "Member since January 2024",
    stats: {
      totalCourses: "12",
      totalCoursesLabel: "Total Courses Available",
      completedCourses: "5",
      completedCoursesLabel: "Courses Completed",
      progress: "42%",
      progressLabel: "Overall Progress",
      grade: "8.5",
      gradeLabel: "Average Grade",
    },
    learningStats: {
      coursesCompleted: 5,
      hoursStudied: 25,
    },
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img
            src="https://www.shutterstock.com/image-photo/handsome-happy-african-american-bearded-600nw-2460702995.jpg"
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h1>{studentData.name}</h1>
          <p className="role">{studentData.role}</p>

          <div className="join-date">
            <span className="icon">✦</span>
            <span>{studentData.joinDate}</span>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <h3>{studentData.stats.totalCourses}</h3>
              <p>{studentData.stats.totalCoursesLabel}</p>
            </div>
            <div className="stat-item">
              <h3>{studentData.stats.completedCourses}</h3>
              <p>{studentData.stats.completedCoursesLabel}</p>
            </div>
            <div className="stat-item">
              <h3>{studentData.stats.progress}</h3>
              <p>{studentData.stats.progressLabel}</p>
            </div>
            <div className="stat-item">
              <h3>{studentData.stats.grade}</h3>
              <p>{studentData.stats.gradeLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-cards">
        <div className="card">
          <h2>Learning Progress</h2>
          <div className="card-content">
            <div className="icon-container">
              <span className="courses-icon">📚</span>
            </div>
            <div className="card-stats">
              <p>Courses completed:</p>
              <h3>
                {studentData.learningStats.coursesCompleted}
                <span className="suffix">courses</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Study Time</h2>
          <div className="card-content">
            <div className="icon-container">
              <span className="hours-icon">⏱️</span>
            </div>
            <div className="card-stats">
              <p>Hours studied:</p>
              <h3>
                {studentData.learningStats.hoursStudied}
                <span className="suffix">hours</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
