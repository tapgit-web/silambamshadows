//  OBJECTIVE in EventCards.js
import React from 'react';
import './EventCards.css';

const events = [
  {
    title: 'Physical Fitness and Health',
    color: 'blue-card',
    items: [
      'Improve overall strength, flexibility, endurance, and coordination.',
      'Promote healthy habits and active lifestyles.',
      'Enhance cardiovascular health and body awareness.'
    ],
  },
  {
    title: 'Self-Defense Skills',
    color: 'yellow-card',
    items: [
      'Teach practical self-defense techniques and strategies',
      'Develop awareness of surroundings and risk assessment',
      'Build confidence in handling real-life confrontations'
    ],
  },
  {
    title: 'Discipline and Focus',
    color: 'blue-card',
    items: ['Cultivate self-control, perseverance, and mental focus',
      'Promote respect for instructors, peers, and the art itself',
      'Encourage goal-setting and consistent practice.'
    ],
  },
  {
    title: 'Personal Development',
    color: 'yellow-card',
    items: ['Boost confidence and self-esteem.',
      'Develop leadership and communication skills',
      'Foster resilience, patience, and humility'
    ],
  },
  {
    title: 'Technical Proficiency',
    color: 'blue-card',
    items: ['Master fundamental stances, strikes, blocks, and forms',
      'Progress through belt or rank systems with competence',
      'Understand the history, philosophy, and ethics of the martial art'
    ],
  },
  {
    title: 'Social Interaction and Teamwork',
    color: 'yellow-card',
    items: ['Promote camaraderie and respect among peers.',
      'Practice cooperative drills and sparring with control.',
      'Learn to give and receive constructive feedback'
    ],
  },
  {
    title: 'Stress Relief and Emotional Control',
    color: 'blue-card',
    items: ['Use physical activity to reduce stress and anxiety.',
      'Practice breathing, meditation, or mindfulness as part of training',
      'Channel emotions into positive action and calm responses.'
    ],
  },
];

const EventCards = () => {
  return (
    <div className="Eventcards-container">
      {events.map((event, index) => (
        <div key={index} className={`Eventcard ${event.color}`}>
          <h2 className="Eventcard-title">{event.title}</h2>
          <hr className="Eventcard-divider" />
          <ul className="Eventcard-list">
            {event.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
