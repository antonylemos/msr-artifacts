import "./App.css";

const App = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns and Performance",
      description:
        "Master React's advanced patterns including hooks, context, suspense, and performance optimization techniques for building scalable applications.",
      image: "https://placehold.co/600x400/4299E1/ffffff?text=React",
      author: {
        name: "Sarah Mitchell",
        avatar: "https://placehold.co/32x32",
        role: "Senior React Developer",
      },
    },
    {
      id: 2,
      title: "Next.js 14: From Zero to Production",
      description:
        "Learn the latest Next.js features including app router, server components, server actions, and deployment strategies.",
      image: "https://placehold.co/600x400/000000/ffffff?text=Next.js",
      author: {
        name: "Michael Chen",
        avatar: "https://placehold.co/32x32",
        role: "Full Stack Developer",
      },
    },
    {
      id: 3,
      title: "Node.js Microservices Architecture",
      description:
        "Build robust and scalable microservices with Node.js, including service discovery, load balancing, and fault tolerance.",
      image: "https://placehold.co/600x400/43853D/ffffff?text=Node.js",
      author: {
        name: "David Wilson",
        avatar: "https://placehold.co/32x32",
        role: "Backend Architect",
      },
    },
    {
      id: 4,
      title: "Mastering Nx Monorepo Tooling",
      description:
        "Deep dive into Nx workspace, learn to manage multiple applications and libraries with efficient build system and code sharing.",
      image: "https://placehold.co/600x400/143055/ffffff?text=Nx",
      author: {
        name: "Emily Parker",
        avatar: "https://placehold.co/32x32",
        role: "DevOps Engineer",
      },
    },
    {
      id: 5,
      title: "TailwindCSS: Design to Development",
      description:
        "Create beautiful and responsive UIs with TailwindCSS, including custom themes, animations, and component systems.",
      image: "https://placehold.co/600x400/38B2AC/ffffff?text=Tailwind",
      author: {
        name: "Alex Turner",
        avatar: "https://placehold.co/32x32",
        role: "UI/UX Developer",
      },
    },
    {
      id: 6,
      title: "Modern Form Management with React Hook Form",
      description:
        "Build efficient forms with React Hook Form, including validation, error handling, and complex form state management.",
      image: "https://placehold.co/600x400/EC4899/ffffff?text=React+Forms",
      author: {
        name: "Lisa Anderson",
        avatar: "https://placehold.co/32x32",
        role: "Frontend Specialist",
      },
    },
  ];

  return (
    <div className="courses-container">
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <span className="tech-tag">Tech</span>
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="author-info">
                <img
                  src={course.author.avatar}
                  alt={course.author.name}
                  className="author-avatar"
                />
                <div className="author-details">
                  <span className="author-name">{course.author.name}</span>
                  <span className="author-role">{course.author.role}</span>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
