import express from 'express'
import cors from 'cors'
import fs from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000
const dataDir = path.join(__dirname, 'data')
const messagesFile = path.join(dataDir, 'messages.json')
const testimonialsFile = path.join(dataDir, 'testimonials.json')
const recipientEmail = 'abhaysonone0@gmail.com'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://abhay-sonone-portfolio.vercel.app',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function ensureDataFile(filePath, defaultData) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
  }
}

function readJsonFile(filePath, defaultData) {
  ensureDataFile(filePath, defaultData)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

function writeJsonFile(filePath, data) {
  ensureDataFile(filePath, data)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function getMessagesData() {
  return readJsonFile(messagesFile, { messages: [] })
}

function getTestimonialsData() {
  return readJsonFile(testimonialsFile, { testimonials: [] })
}

function createTransporter() {
  console.log('EMAIL_USER present:', Boolean(process.env.EMAIL_USER))
  console.log('EMAIL_PASS present:', Boolean(process.env.EMAIL_PASS))

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
}

async function sendContactEmail({ name, email, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials are missing. Set EMAIL_USER and EMAIL_PASS.')
    return 'not_configured'
  }

  const submittedAt = new Date().toLocaleString()
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    replyTo: email,
    subject: `New Portfolio Contact Message from ${name}`,
    text: `New Portfolio Contact Message

Name: ${name}
Email: ${email}
Message:
${message}

Submitted At: ${submittedAt}`,
  }

  try {
    const transporter = createTransporter()
    try {
      await transporter.verify()
      console.log('Nodemailer transporter verified successfully.')
    } catch (verifyError) {
      console.error('Nodemailer transporter verification failed:', verifyError?.message || verifyError)
      console.error('Transporter verify error code:', verifyError?.code || 'UNKNOWN')
      return 'failed'
    }

    console.log('Contact email sending started for:', email)
    await transporter.sendMail(mailOptions)
    console.log('Contact email sent successfully to:', recipientEmail)
    return 'sent'
  } catch (error) {
    console.error('Failed to send contact message email:', error?.message || error)
    console.error('Email error code:', error?.code || 'UNKNOWN')
    return 'failed'
  }
}

app.get('/', (req, res) => {
  res.send('Backend is running on Render')
})

app.get('/messages', (req, res) => {
  const data = getMessagesData()
  res.json(data.messages)
})

app.post('/messages', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const data = getMessagesData()
  const newMessage = {
    id: data.messages.length > 0 ? data.messages[data.messages.length - 1].id + 1 : 1,
    name,
    email,
    message,
    date: new Date().toISOString(),
  }

  data.messages.push(newMessage)
  writeJsonFile(messagesFile, data)

  const emailStatus = await sendContactEmail({ name, email, message })

  return res.status(201).json({
    ...newMessage,
    emailStatus,
  })
})

app.get('/testimonials', (req, res) => {
  const data = getTestimonialsData()
  res.json(data.testimonials)
})

app.post('/testimonials', (req, res) => {
  const { name, message } = req.body

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' })
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' })
  }

  const data = getTestimonialsData()
  const newTestimonial = {
    id: data.testimonials.length > 0 ? data.testimonials[data.testimonials.length - 1].id + 1 : 1,
    name,
    message,
    date: new Date().toISOString(),
  }

  data.testimonials.push(newTestimonial)
  writeJsonFile(testimonialsFile, data)

  return res.status(201).json(newTestimonial)
})

app.get('/api/messages', (req, res) => {
  const data = getMessagesData()
  res.json(data.messages)
})

app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const data = getMessagesData()
  const newMessage = {
    id: data.messages.length > 0 ? data.messages[data.messages.length - 1].id + 1 : 1,
    name,
    email,
    message,
    date: new Date().toISOString(),
  }

  data.messages.push(newMessage)
  writeJsonFile(messagesFile, data)

  const emailStatus = await sendContactEmail({ name, email, message })

  return res.status(201).json({
    ...newMessage,
    emailStatus,
  })
})

app.get('/api/testimonials', (req, res) => {
  const data = getTestimonialsData()
  res.json(data.testimonials)
})

app.post('/api/testimonials', (req, res) => {
  const { name, message } = req.body

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' })
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' })
  }

  const data = getTestimonialsData()
  const newTestimonial = {
    id: data.testimonials.length > 0 ? data.testimonials[data.testimonials.length - 1].id + 1 : 1,
    name,
    message,
    date: new Date().toISOString(),
  }

  data.testimonials.push(newTestimonial)
  writeJsonFile(testimonialsFile, data)

  return res.status(201).json(newTestimonial)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
