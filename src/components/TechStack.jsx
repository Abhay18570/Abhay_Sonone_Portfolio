import React from 'react'
import './TechStack.css'
import javaImage from '../images/java (1).png'
import nodeImage from '../images/nodejs.png'
import pythonImage from '../images/python (1).png'
import springBootImage from '../images/springboot.png'

const techData = [
  { name: 'HTML', icon: 'devicon-html5-plain colored', role: 'Structure', orbit: 1 },
  { name: 'CSS', icon: 'devicon-css3-plain colored', role: 'Styling', orbit: 1 },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', role: 'Frontend', orbit: 1 },
  { name: 'ReactJS', icon: 'devicon-react-original colored', role: 'UI Library', orbit: 1 },
  { name: 'Java', image: javaImage, role: 'Backend', orbit: 2 },
  { name: 'Python', image: pythonImage, role: 'Programming', orbit: 2 },
  { name: 'NodeJS', image: nodeImage, role: 'Runtime', orbit: 2 },
  { name: 'Firebase', icon: 'devicon-firebase-plain colored', role: 'Cloud Backend', orbit: 2 },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored', role: 'Database', orbit: 3 },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', role: 'Database', orbit: 3 },
  { name: 'Git', icon: 'devicon-git-plain colored', role: 'Version Control', orbit: 3 },
  { name: 'GitHub', icon: 'devicon-github-original', role: 'Code Hosting', orbit: 3 },
  { name: 'Spring Boot', image: springBootImage, role: 'Backend Framework', orbit: 4 },
]

const orbitConfig = {
  1: { radius: 180, duration: 30 },
  2: { radius: 270, duration: 42 },
  3: { radius: 350, duration: 56 },
  4: { radius: 430, duration: 68 },
}

const renderTechVisual = (tech) => {
  if (tech.image) {
    const imageClassName = `tech-image tech-image-${tech.name.toLowerCase().replace(/\s+/g, '-')}`

    return <img src={tech.image} alt="" className={imageClassName} aria-hidden="true" />
  }

  return <i className={tech.icon} aria-hidden="true" />
}

function TechStack() {
  return (
    <section className="techstack" id="techstack">
      <div className="container">
        <h2 className="section-title fade-in"><span>Tech Stack</span></h2>

        <div className="tech-galaxy fade-in" aria-label="Tech Galaxy">
          <div className="galaxy-grid" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-1" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-2" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-3" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-4" aria-hidden="true" />

          <div className="galaxy-core">
            <span className="core-kicker">My</span>
            <h3>Tech Universe</h3>
            <span className="core-pulse" />
          </div>

          <div className="tech-orbits">
            {techData.map((tech, index) => {
              const sameOrbitItems = techData.filter((item) => item.orbit === tech.orbit)
              const orbitIndex = sameOrbitItems.findIndex((item) => item.name === tech.name)
              const angle = (360 / sameOrbitItems.length) * orbitIndex + tech.orbit * 10
              const orbit = orbitConfig[tech.orbit]

              return (
                <div
                  className={`tech-orbit-path orbit-path-${tech.orbit}`}
                  key={tech.name}
                  style={{
                    '--angle': `${angle}deg`,
                    '--orbit-radius': `${orbit.radius}px`,
                    '--orbit-duration': `${orbit.duration}s`,
                    '--orbit-delay': `${index * -1.4}s`,
                  }}
                >
                  <div className="tech-node-position">
                    <div className="tech-node" aria-label={`${tech.name}, ${tech.role}`}>
                      <span className="node-ring" />
                      <span className="node-orb">
                        {renderTechVisual(tech)}
                      </span>
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-tooltip">{tech.role}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mobile-tech-grid">
            {techData.map((tech) => (
              <div className="mobile-tech-node" key={`mobile-${tech.name}`}>
                <span className="node-ring" />
                <span className="node-orb">
                  {renderTechVisual(tech)}
                </span>
                <span className="tech-name">{tech.name}</span>
                <span className="tech-tooltip">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
