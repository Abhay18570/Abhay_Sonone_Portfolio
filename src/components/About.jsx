import React from 'react'
import './About.css'
import vitImage from '../images/Abhay-vit.jpeg'
import teamImage from '../images/team.jpeg'

const aboutCards = [
  {
    image: vitImage,
    title: 'Computer Engineering Student – VIT',
    points: [
      'Pursuing B.Tech at Vidyalankar Institute of Technology',
      'Current CGPA: 8.99 (Till Semester 3)',
    ],
  },
  {
    image: teamImage,
    title: "Founder & Team Lead – HackOps Hero's",
    points: [
      'Founded tech-focused student community',
      'Leading a team of 5+ developers',
    ],
  },
]

function AboutCard({ card }) {
  return (
    <div className="about-image-card glass-card">
      <div className="about-image-card-img">
        <img src={card.image} alt={card.title} />
      </div>
      <div className="about-image-card-body">
        <h3>{card.title}</h3>
        <ul>
          {card.points.map((point) => (
            <li key={point}>✔ {point}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title fade-in"><span>About Me</span></h2>

        <div className="about-badge fade-in">Who I Am</div>

        <div className="about-image-cards fade-in">
          {aboutCards.map((card) => (
            <AboutCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
