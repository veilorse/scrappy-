# Scrappy v2 — Reviewer-Ready Update

This version directly addresses the reviewer feedback.

## Problems solved

1. Dashboard opens first
- The app starts on the dashboard, immediately showing today's meals, expiring items, pantry summary, savings, and shopping guidance.

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

## Scrappy v4 Enhancements

### Advanced Recipe Builder
Users first select expiring ingredients, then optionally add any other pantry ingredients such as chicken, rice, pasta, cheese, garlic or mushrooms before generating recipes.

Users can filter by:
- Meal type
- Cooking time
- Difficulty
- Dietary preference

### Step-by-Step Cooking Mode
Every generated recipe includes:
- Preparation time
- Cooking time
- Servings
- Nutrition facts
- Ingredient checklist
- Interactive cooking steps
- AI cooking tips

### Smart Pantry
Every ingredient displays:
- Quantity
- Expiry date
- Storage location
- Category
- Suggested recipes
- Edit/Delete controls

### Why This Recipe?
The AI explains why each recipe was selected:
- Uses ingredients close to expiry
- Includes ingredients already available
- Matches selected cooking time
- Minimises food waste
- Reduces shopping

### Weekly Meal Planner
Plan breakfast, lunch and dinner for every day of the week using pantry ingredients.

### Family Pantry
Invite family members to share one pantry, shopping list and meal planner.

### Sustainability Dashboard
Track:
- Money saved
- Food waste prevented
- Estimated CO₂ avoided
- Water saved

