import React from 'react'
import './TechStack.css'

const techData = [
  { name: 'HTML', icon: 'devicon-html5-plain colored' },
  { name: 'CSS', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'Java', icon: 'devicon-java-plain colored' },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
  { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
  { name: 'Python', icon: 'devicon-python-plain colored' },
  { name: 'ReactJS', icon: 'devicon-react-original colored' },
  { name: 'NodeJS', icon: 'devicon-nodejs-plain colored' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
  { name: 'Git', icon: 'devicon-git-plain colored' },
  { name: 'GitHub', icon: 'devicon-github-original' },
]

function TechStack() {
  return (
    <section className="techstack" id="techstack">
      <div className="container">
        <h2 className="section-title fade-in"><span>Tech Stack</span></h2>

        <div className="tech-grid">
          {techData.map((tech, i) => (
            <div
              className="tech-card fade-in"
              key={tech.name}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <i className={tech.icon} />
              <h3 className="tech-name">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
