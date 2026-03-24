import React from 'react'
import './Education.css'

const educationData = [
  {
    id: 1,
    degree: 'State School Certificate',
    field: 'General Studies',
    institution: 'Sanskar English Medium School, Anjur',
    period: '2022',
    grade: 'SSC Completed',
    side: 'right',
    icon: '🏫',
    color: 'blue',
    highlights: ['Strong Geography foundation', 'STEM focused', 'Cultural activities'],
  },
  {
    id: 2,
    degree: 'Diploma in Information Technology',
    field: 'Information Technology',
    institution: 'Shivajirao S Jondhle Polytechnic, Asangaon',
    period: '2022 – 2025',
    grade: 'Percentage: 91.00%',
    side: 'left',
    icon: '📚',
    color: 'purple',
    highlights: ['Graduated with distinction: 91.00%', 'Java & Web experience', 'Technical events'],
  },
  {
    id: 3,
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    institution: 'Vidyalankar Institute of Technology',
    period: '2025 – 2028',
    grade: 'CGPA: 8.99',
    side: 'right',
    icon: '🎓',
    color: 'cyan',
    highlights: ['Current CGPA: 8.99', 'Active in hackathons', 'Web & AI projects'],
  },
]

function Education() {
  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title fade-in"><span>Education</span></h2>

        <div className="timeline">
          {/* Central spine */}
          <div className="timeline-spine" />
          <div className="timeline-spine-glow" />

          {educationData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item ${item.side} fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connector dot */}
              <div className={`timeline-dot dot-${item.color}`}>
                <span>{item.icon}</span>
              </div>

              {/* Connector line */}
              <div className={`timeline-connector connector-${item.color}`} />

              {/* Card */}
              <div className={`edu-card glass-card card-${item.color}`}>
                <div className="edu-card-header">
                  <div>
                    <h3 className="edu-degree">{item.degree}</h3>
                    <p className="edu-field">{item.field}</p>
                  </div>
                  <span className={`edu-period period-${item.color}`}>{item.period}</span>
                </div>

                <p className="edu-institution">🏛️ {item.institution}</p>
                <p className={`edu-grade grade-${item.color}`}>📊 {item.grade}</p>

                <div className="edu-highlights">
                  {item.highlights.map((h) => (
                    <span className={`edu-tag tag-${item.color}`} key={h}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom node */}
          <div className="timeline-end">
            <div className="timeline-end-dot">🌟</div>
            <p>Journey Continues...</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
