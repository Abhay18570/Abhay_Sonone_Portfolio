import React from 'react'
import './Projects.css'
import nagarseva from '../project_images/nagarseva.png'
import talentflow from '../project_images/talentflow.png'

const projects = [
  {
    title: 'NagarSeva',
    image: nagarseva,
    description:
      'A smart civic issue reporting system where citizens can report problems like potholes using images and location, while authorities manage and resolve them through an admin dashboard.',
    link: 'https://nagar-seva-beta.vercel.app/',
  },
  {
    title: 'TalentFlow',
    image: talentflow,
    description:
      'An internship and career guidance platform that connects students with recruiters, analyzes skills, and suggests personalized career paths.',
    link: 'https://talent-flow-black.vercel.app/',
  },
]

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-heading fade-in">
          <h2 className="section-title">
            <span>My Projects</span>
          </h2>
          <p className="projects-subtitle">Some of my real-world solutions and platforms</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="project-card-shell">
                <div className="project-image-wrap">
                  <img src={project.image} alt={`${project.title} preview`} className="project-image" />
                </div>

                <div className="project-content">
                  <div>
                    <p className="project-eyebrow">Featured Build</p>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>

                  <a
                    className="btn project-button"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
