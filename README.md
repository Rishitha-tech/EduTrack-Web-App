# EduTrack – AI-Assisted Learning Analytics

> Heatmap-based video engagement insights for educators

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-blue?style=for-the-badge)](https://edutrack.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Rishitha--tech/EduTrack-black?style=for-the-badge&logo=github)](https://github.com/Rishitha-tech/EduTrack)

</div>

## 🚀 Features

- **Attention Drop-Off Detection** – Visualize where students rewatch, pause, or skip content
- **Real-Time Event Tracking** – Capture seek, pause, and play events during video playback
- **Interactive Heatmap Dashboard** – See engagement patterns at a glance with Recharts visualization
- **AI-Powered Suggestions** – Get actionable recommendations to improve content based on viewership data
- **MongoDB Integration** – Persistent storage for analytics data with MongoDB Atlas
- **Teacher-Friendly UI** – Clean, intuitive interface built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Data Visualization**: Recharts
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas
- **Video Integration**: YouTube API (react-youtube)
- **Development Platform**: Replit
- **Version Control**: GitHub

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishitha-tech/EduTrack.git
   cd EduTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   PORT=5000
   HOST=0.0.0.0
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=edutrack
   CORS_ORIGIN=*
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:5000](http://localhost:5000)

## 📂 Folder Structure

```
EduTrack/
├── pages/              # Next.js pages and API routes
│   ├── api/           # Backend API endpoints (event, heatmap, suggestions)
│   ├── index.js       # Main dashboard page
│   └── _app.js        # App wrapper
├── lib/               # Database connection utilities
├── public/            # Static assets
├── styles/            # Global CSS and Tailwind config
├── .env              # Environment variables
└── package.json      # Project dependencies
```

## 🗺️ Roadmap

- [ ] Deploy to Vercel with production-ready database
- [ ] Add support for multiple video platforms (Vimeo, custom uploads)
- [ ] Implement user authentication for multi-teacher support
- [ ] Generate PDF reports with engagement insights
- [ ] Add real-time collaboration features for team analytics

## 📧 Contact

**Rishitha** – [Your Email]

---

<div align="center">
  Made with ❤️ for educators everywhere
</div>
