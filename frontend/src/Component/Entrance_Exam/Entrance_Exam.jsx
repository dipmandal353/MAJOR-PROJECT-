"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "./Entrance_Exam.css"
import { useNavigate } from "react-router-dom"
import Header from '../Header/Header'


// Icons as SVG components
const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
)

const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
)

const LineChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
)

const GraduationCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
)

const MicroscopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 18h8"></path>
    <path d="M3 22h18"></path>
    <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
    <path d="M9 14h2"></path>
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
  </svg>
)

const SchoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m4 6 8-4 8 4"></path>
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"></path>
    <path d="M14 22v-4a2 2 0 0 0-4 0v4"></path>
    <path d="M18 5v17"></path>
    <path d="M6 5v17"></path>
    <circle cx="12" cy="9" r="2"></circle>
  </svg>
)

const FlaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2v7.31"></path>
    <path d="M14 9.3V2"></path>
    <path d="M8.5 2h7"></path>
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
    <path d="M5.52 16h12.96"></path>
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
)
const ExamPage = () => {

const examData = [
  {
    id: 1,
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    description:
      "a national-level entrance exam in India for admission to postgraduate programs (M.Tech and PhD) in engineering and technology at institutions like IITs, NITs, IIITs etc.",
    icon: <CodeIcon />,
    color: "exam-portal-blue-gradient",
    url: "https://gate.iitk.ac.in/",
    path: "/gate",
  },
  {
    id: 2,
    name: "NET",
    fullName: "National Eligibility Test",
    description:
      "Determines eligibility for assistant professor positions and Junior Research Fellowship in Indian universities and colleges.",
    icon: <BookOpenIcon />,
    color: "exam-portal-purple-gradient",
    url: "https://ugcnet.nta.nic.in/",
    path: "/net",
  },
  {
    id: 3,
    name: "NIMCET",
    fullName: "Common Admission Test",
    description:
      "Entrance Test for MCA in NITs.",
    icon: <LineChartIcon />,
    color: "exam-portal-red-gradient",
    url: "https://nimcet.admissions.nic.in",
    path: "/cat",
  },
  {
    id: 4,
    name: "JEE",
    fullName: "Joint Entrance Examination",
    description: "Engineering entrance assessment conducted for admission to various engineering colleges in India.",
    icon: <GraduationCapIcon />,
    color: "exam-portal-green-gradient",
    url: "https://jeemain.nta.nic.in/",
    path: "/jee",
  },
  {
    id: 5,
    name: "CUET-UG",
    fullName: "Common University Entrance Test",
    description: "For: B.Sc. / B.Tech programs in central universities",
    icon: <GraduationCapIcon />,
    color: "exam-portal-pink-gradient",
    url: " https://cuet.nta.nic.in",
  },
  {
    id: 6,
    name: "CUET-PG",
    fullName: "Common University Entrance Test",
    description:
      "For: M.Sc.(in CS) / MCA programs in central universities",
    icon: <GraduationCapIcon />,
    color: "exam-portal-yellow-gradient",
    url: "https://exams.nta.ac.in/CUET-PG",
  },
  
]


  const [activeId, setActiveId] = useState(null)
  const canvasRef = useRef(null)
  const navigate = useNavigate()

  const handleNavigate=(path)=>{
  navigate(path)
}
  // Handle card navigation
  const navigateToExam = (url, e) => {
    e.stopPropagation() // Prevent triggering hover effect
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles = []
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Create a purple/blue color palette
        const hue = Math.floor(Math.random() * 60) + 220 // 220-280 is blue to purple
        const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 40 // 40-60%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      if (!ctx) return
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(120, 100, 255, ${opacity * 0.5})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="exam-portal-page">
      <Header/>
      <canvas ref={canvasRef} className="exam-portal-animated-background"></canvas>

      <div className="exam-portal-container">
        <h1 className="exam-portal-title">Entrance Examination Guide</h1>
        {/* <p className="exam-portal-subtitle">
          Explore comprehensive information about various competitive examinations in India. Hover over each card to
          learn more about the exam.
        </p> */}

        <div className="exam-portal-grid">
          {examData.map((exam) => (
            <motion.div
              key={exam.id}
              className={`exam-portal-card ${exam.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: exam.id * 0.1 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setActiveId(exam.id)}
              onHoverEnd={() => setActiveId(null)}
              onClick={() => handleNavigate(exam.path)}
            >
              <div className="exam-portal-card-content">
                <div className="exam-portal-card-header">
                  <div className="exam-portal-icon-container">{exam.icon}</div>
                  <motion.div
                    className="exam-portal-badge"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Entrance Exam
                  </motion.div>
                </div>

                <div className="exam-portal-card-body">
                  <h3 className="exam-portal-exam-name">{exam.name}</h3>
                  <p className="exam-portal-exam-fullname">{exam.fullName}</p>

                  <motion.div
                    className="exam-portal-exam-description"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeId === exam.id ? 1 : 0,
                      height: activeId === exam.id ? "auto" : 0,
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.1,
                      ease: "easeInOut"
                    }}
                  >
                    {exam.description}
                  </motion.div>


                  <motion.button
                    className="exam-portal-nav-button"
                    onClick={(e) => navigateToExam(exam.url, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeId === exam.id ? 1 : 0,
                      y: activeId === exam.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Visit Official Website <ArrowRightIcon />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamPage
