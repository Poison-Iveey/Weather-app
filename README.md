# Weather App 🌤️

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Poison-Iveey/Weather-app/ci.yml?branch=master)](https://github.com/Poison-Iveey/Weather-app/actions)  
[![License](https://img.shields.io/github/license/Poison-Iveey/Weather-app)](LICENSE)

A simple weather forecast web application that allows users to search for any location and view current weather information. It uses the **Visual Crossing Weather API** for real-time weather data and the **GIPHY API** to display a related GIF for the current weather condition.

This project also demonstrates **junior-level DevOps practices** like containerization, automation, and CI/CD.

---

## Features

- Search for any location (city/town)
- Toggle between Celsius (°C) and Fahrenheit (°F)
- Displays:
  - Current temperature
  - Weather condition (e.g., "Rain", "Sunny")
  - Weather icon
  - A related GIF from GIPHY
- Changes background based on weather (sunny, rainy, cloudy, snow)
- Loading state while fetching data
- Responsive design for mobile and desktop

---

##  Technologies Used

**Frontend:**
- HTML, CSS, JavaScript (ES6)
- Visual Crossing Weather API
- GIPHY API

**Deployment:**
- **Docker** – Containerized the app for consistency across machines  
- **Ansible** – Automated installation of Docker and deployment of container  
- **GitHub Actions** – CI workflow runs on every push to build and verify container  
- `.dockerignore` to optimize build context  

---

##  Automation Flow

1. **Docker Build:** The app is packaged into a lightweight container using `nginx:alpine`.  
2. **Ansible Deployment:** 
   - Installs Docker if missing  
   - Stops and removes any existing container  
   - Builds and runs the new container on a configurable port  
3. **Continuous Integration (CI):**
   - GitHub Actions workflow runs on each push  
   - Ensures container builds successfully  
   - Verifies deployment setup  

This ensures the application is **reproducible, portable, and easy to deploy**.

---


