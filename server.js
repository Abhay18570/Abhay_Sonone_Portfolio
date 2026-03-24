import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000
const dataDir = path.join(__dirname, 'data')
const messagesFile = path.join(dataDir, 'messages.json')
const testimonialsFile = path.join(dataDir, 'testimonials.json')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://abhay-sonone-portfolio.vercel.app',
  ],
  methods: ['GET', 'POST'],
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

app.get('/', (req, res) => {
  res.send('Backend is running on Render')
})

app.get('/messages', (req, res) => {
  const data = getMessagesData()
  res.json(data.messages)
})

app.post('/messages', (req, res) => {
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

  return res.status(201).json(newMessage)
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

app.post('/api/messages', (req, res) => {
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

  return res.status(201).json(newMessage)
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
