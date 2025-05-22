"use client"

import { useState } from "react"
import axios from "axios"
import "./chat.css"

const Chat = () => {
  const [visible, setVisible] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const toggleChat = () => {
    setVisible(!visible)
    setAnswer("")
    setQuestion("")
  }

  const askAI = async () => {
    if (!question.trim()) return
    setLoading(true)
    try {
      const { data } = await axios.post("/api/v1/ai/ask", { prompt: question })
      setAnswer(data.answer)
    } catch (err) {
      setAnswer("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button className="chat-toggle-btn" onClick={toggleChat}>
         🤖 Ask your Doubt
      </button>

      {visible && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>AI Assistant</span>
            <button className="close-btn" onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            <textarea
              className="chat-textarea"
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
            />
            <button className={`chat-submit-btn ${loading ? "loading" : ""}`} onClick={askAI} disabled={loading}>
              {loading ? "Thinking..." : "Submit"}
            </button>

            {answer && (
              <div className="answer-box">
                <strong>AI:</strong>
                <div className="answer-content">{answer}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Chat
