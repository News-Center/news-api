# News API

The news api is an endpoint which is used to aggregate news data

## Getting Started

### Prerequisite 

- Node.js Version 16
- npm Version 8

### Installation

1. Clone the repo
```bash
  git clone git@github.com:News-Center/news-api.git
```
2. Install dependencies
```bash
  npm install
```
3. Setup your .env file (For a Quickstart copy the example from the `.env.example` file)
4. Start the application
```bash
  make up
```
5. While the Application is running run the migrations against your database
```bash
  npx prisma migrate dev
```
