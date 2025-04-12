import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ZeroWaste?",
      answer: "ZeroWaste is an AI-powered, geo-intelligent food donation and rescue platform that connects food donors like households, restaurants, and canteens with verified NGOs and individuals in need, minimizing food waste and enabling efficient food redistribution."
    },
    {
      question: "Who can use the platform?",
      answer: "Donors (individuals, restaurants, caterers), Receivers (NGOs, shelters, volunteers), and Admins (platform moderators) all have role-based access."
    },
    {
      question: "How does the AI estimate food quantity?",
      answer: "When a donor uploads an image of the food, our AI model analyzes it and estimates the quantity in kilograms to reduce manual effort and improve accuracy."
    },
    {
      question: "How does geolocation work in ZeroWaste?",
      answer: "GPS location is auto-fetched during donation posting. The system maps it in real-time so receivers nearby can find and request food donations quickly."
    },
    {
      question: "What happens after a donation is posted?",
      answer: "Each donation progresses through these stages: Pending → Accepted → Picked → Verified. Status updates are visible in the user dashboard."
    },
    {
      question: "Can users track their donations or pickups?",
      answer: "Yes. Donors and receivers can view the full lifecycle and history of their donations or pickups on their dashboard."
    },
    {
      question: "What mapping tools are used?",
      answer: "We use Google Maps or OpenStreetMap for plotting and the Google Directions API for routing and pickup paths."
    },
    {
      question: "How are NGOs and volunteers verified?",
      answer: "Admins verify each NGO/volunteer during onboarding through document review or historical credibility checks."
    },
    {
      question: "How does ZeroWaste help the environment?",
      answer: "By redistributing surplus food, we reduce landfill waste and CO₂ emissions—contributing to sustainability and community welfare."
    },
    {
      question: "What technologies power ZeroWaste?",
      answer: "Frontend: React.js | Backend: Firebase | AI: Food quantity estimation from images | Maps: Google Maps, OpenStreetMap | Routing: Google Directions API"
    }
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div style={styles.container}>
      <div style={styles.faqWrapper}>
        <h2 style={styles.header}>❓ Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <button 
              style={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span style={styles.icon}>{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div style={styles.answer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        <div style={styles.ctaWrapper}>
          <a href="mailto:bojja0192@gmail.com" style={styles.emailLink}>✉ Email Us</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F0F9F4',  // Very light green background
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    animation: 'fadeIn 1s ease-out',
  },
  faqWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '700px',
    width: '100%',
    animation: 'slideIn 0.8s ease-out',
    border: '1px solid #e0e0e0',  // Light gray border
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',  // Dark green for title
    marginBottom: '20px',
  },
  faqItem: {
    marginBottom: '15px',
  },
  question: {
    width: '100%',
    padding: '15px',
    textAlign: 'left',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    backgroundColor: '#A8E6A3',  // Light green for questions
    color: '#000000',  // Black text for questions
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    animation: 'fadeIn 1s ease-out',
  },
  icon: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  answer: {
    marginTop: '10px',
    paddingLeft: '20px',
    fontSize: '1rem',
    color: '#000000',  // Black text for answers
    animation: 'slideDown 0.5s ease-out',
  },
  ctaWrapper: {
    textAlign: 'center',
    marginTop: '30px',
  },
  emailLink: {
    display: 'inline-block',
    backgroundColor: '#388E3C',  // Dark green for email button
    color: '#ffffff',
    padding: '12px 25px',
    borderRadius: '25px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
    animation: 'fadeIn 2s ease-out',
  },
  emailLinkHover: {
    backgroundColor: '#2C6B32',  // Darker green on hover
  },
};

export default FAQs;