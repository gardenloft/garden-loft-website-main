# Garden Loft Dashboard

The **Garden Loft Dashboard** is a real-time web interface that provides staff, supporters, and administrators with visibility into the daily routines, safety, and well-being of Garden Loft residents.

Designed for desktop and tablet, the dashboard integrates with the Garden Loft App, Home Assistant, Supabase, and Tochtech APIs to create a centralized view of smart living data, personalized insights, and home activity.

---

## Features

### Resident Monitoring
- Live room-based location tracking via motion sensors
- Sleep and bathroom activity summaries using Tochtech BPConnect
- AI-generated behavioral trends and anomalies
- Daily summaries and insights to support proactive care

### Activity Timelines
- Fridge, stove, and door usage logs
- Doorbell visitor detection and video event tracking
- TV media tracking with session history
- Away status and motion inactivity patterns

### Smart Home Integration
- Water usage session logging and fixture detection
- Power consumption summaries for key devices
- Real-time environment data from Home Assistant (temperature, lights, etc.)

### Admin Tools
- Resident overview panel
- Date-based filtering and trend comparison
- Expandable dashboard architecture for future modules

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend/Data:** Supabase (PostgreSQL, Edge Functions), Firebase Auth
- **IoT Integration:** Home Assistant REST API, WebSocket, MQTT
- **3rd-Party APIs:** Tochtech BPConnect (sleep, bed, bathroom)

---

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/garden-loft-dashboard.git
   cd garden-loft-dashboard
2. Install dependencies
   ```bash
   npm install
3. Start the local dev server
   ```bash
   npm run dev
