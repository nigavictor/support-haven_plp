✅ PHASE 1: Define Core Features (MVP Scope)

Focus on the simplest version you can build during a hackathon.

Core MVP Features

Anonymous Story Submission

Victims can write and submit stories anonymously.

No account required (optional nickname).

Basic moderation pipeline (manual or automated).

Story Library / Feed

Readers can browse stories.

Filter by category (e.g., domestic violence, school bullying, online harassment).

Simple search.

Private Support Chat

Chat interface where victims can talk to:

Counselors

Psychologists

Experts (real or simulated for demo)

Anonymous login.

Non-negotiable Safety Features

Terms of Use + Safety Disclaimer

Auto-hide personal info (phone, location) using simple regex filters

"Report Content" button

✅ PHASE 2: System Architecture

Choose fast, realistic technologies for hackathon:

Frontend (Web App)

React / Next.js (fast, modern)

TailwindCSS (quick styling)

Backend (API)

Node.js + Express, or Django REST Framework

Endpoints:

POST story

GET stories

POST chat message

Database

Firebase Firestore (fastest to set up)
OR

PostgreSQL (if you want relational structure)

Chat System

Options:

Firebase Realtime Database

Socket.io (Node.js)

Third-party API (e.g., CometChat or Stream Chat for fast setup)

✅ PHASE 3: UI/UX Planning

Design simple, clean pages.

Pages to build

Landing Page

Mission statement

"Share your story" button

"Read stories" button

"Talk to an expert" button

Story Submission Page

Story text field

Category selector

Optional pseudonym

Publish button

Story Feed Page

List of stories

Filters

Click to read full story

Private Chat Page

Anonymous login

Chat window

Automated “expert” or real volunteer support

Admin Page (internal use)

Approve / decline stories

Monitor chats (non-personal info only)

✅ PHASE 4: Build the MVP

Order of development to stay on track:

1. Data Structure

Stories collection:

story_id
content
category
timestamp
pseudonym
status (approved/pending)


Chats collection:

chat_id
messages[]
expert_id
user_id (anonymous hash)

2. Backend Endpoints

/submitStory

/getStories

/openChat

/sendMessage

3. Frontend Integration

Hook up forms to backend

Display stories in feed

Integrate chat

✅ PHASE 5: Safety & Moderation

This project deals with heavy, sensitive topics. Protect users.

Add:

Basic profanity filter

Personal info filter (detect numbers, names, addresses)

Manual moderation queue

Warning that the website is not a replacement for emergency services

✅ PHASE 6: Testing

Focus on:

Functional Testing

Can submit a story?

Can read stories?

Can chat anonymously?

Usability Testing

Is the interface simple and calming?

Is it easy to find help?

Security Testing

Anonymous submissions

No personal data stored

Stories are sanitized (prevent code injection)

✅ PHASE 7: Pitch / Presentation Prep

For hackathon presentation:

Show:

Problem: GBV is widespread, victims lack safe anonymous spaces.

Your solution: A platform offering stories + support + anonymity.

Demo workflow:

Submit a story

See story appear in feed

Start anonymous chat with expert

Future enhancements