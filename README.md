# Scrappy v2 — Reviewer-Ready Update

This version directly addresses the reviewer feedback.

## Problems solved

1. Dashboard opens first
- The app starts on the dashboard, immediately showing today's meals, expiring items, pantry summary, savings, and shopping guidance.

2. App Store / Android explanation
- The "App Store Plan" page explains how Scrappy would be built with React Native + Expo, then submitted through App Store Connect and Google Play Console.

3. Camera scanner explanation
- The Scanner page explains that scanning is not a simple plugin. It uses camera access plus an AI vision model such as Google Gemini Vision or OpenAI Vision.

4. Recipe Builder improvement
- Users can select expiring ingredients first, then add optional pantry items like chicken, rice, cheese, and garlic to create better recipes.

5. Not only expiring food
- Recipe logic now combines food-waste prevention with enjoyable recipe building.

6. Professional UI
- Emojis are removed from the interface. The app uses inline SVG icons for a cleaner and more serious look.

## Files
- index.html
- styles.css
- app.js

## Deploy
Upload these files to the GitHub repository connected to Vercel. Vercel will redeploy automatically.


## Planned v3 Features
- User authentication (Sign Up / Login)
- Admin dashboard
- Password reset approval workflow
- Firebase Authentication integration
- Dashboard opens first
- AI camera scanner using Gemini Vision/OpenAI Vision
- Recipe Builder with optional pantry ingredients
- Professional icon-only interface
- Pantry cloud sync
- Shopping list and weekly meal planner
- Push notifications
- Family pantry sharing
- Statistics dashboard
- App Store / Google Play ready architecture

### Password Reset Workflow
1. User taps "Forgot Password".
2. User submits email and username.
3. Admin receives an email notification.
4. Admin approves or rejects the request.
5. If approved, the user receives a secure password reset link.
6. User creates a new password.
