# 30 Seconds Game - Design Document

## Reference Analysis: ThirtyTicks.com (6 Screens)

This document analyzes each screen from the reference game, compares it with our
current implementation, and defines exactly what needs to be built.

---

## SCREEN 1: Landing Page

### Reference Design
- **Background**: Clean white, not dark
- **Hero section**:
  - Colorful gradient square icon (rainbow: orange, purple, blue, green)
  - Title: "30 Seconds Online" (bold, black, large)
  - Subtitle: "Free 30 Second Word Game Online" (gray, smaller)
  - Orange gradient "How to play" button
- **Language selector card** (white card, shadow):
  - Globe icon
  - "What language do you want to play at?"
  - Dropdown showing "English"
- **How to Play card** (white card, shadow):
  - "How to play?" heading
  - Description paragraph
  - 3 feature rows with colored icon badges:
    1. Orange icon -> "4+ Players" + description
    2. Purple icon -> "30 Seconds" + description
    3. Green icon -> "Score Points" + description
- **Gradient divider**: Horizontal bar (green -> yellow -> orange)
- **"Perfect for every occasion" card**:
  - 3 rows: Home with family, Parties and gatherings, School and work
- **Big orange "Start Game" button** with play icon
- **"Why 30 Seconds Online?" section** with bullet points
- **Footer**

### Current Implementation Differences
- We have the hero, how-to-play, categories, and occasions sections
- BUT we use dark theme with particles (reference is clean white)
- Decision: **Keep our dark theme** since the game lives within the portfolio site
  which is dark-themed. Adapt the reference layout to dark styling.
- Missing: Language selector (SKIP - not needed for our version)
- Missing: Gradient dividers between sections
- Missing: "Why 30 Seconds Online?" section (SKIP - not critical)

### Changes Needed
- Add gradient dividers between sections
- Keep dark-themed card styling consistent with portfolio
- The landing page structure is mostly correct, minor polish needed

---

## SCREEN 2: Add Players

### Reference Design
- **Heading**: "Add Players" (bold, centered)
- **Subtitle**: "Minimum 2 players, maximum 20"
- **Input field**: "Enter player name..." with orange "+" button on right
- **Players list** with count badge:
  - Each player row shows:
    - Colored circle avatar with first letter (R=purple, T=orange, J=green, M=purple)
    - Player name
    - Red trash/delete icon on right
  - Players listed: ron, tina, jon, motey
- **Team Creation section**:
  - Toggle switch: "Random" (selected, orange gradient) vs "Manual"
  - "Number of Teams": Purple "2 Teams" button
  - Auto-calculated note: "Automatically 2 teams with 2 players"
- **Orange "Create Random Teams" button** at bottom

### Current Implementation
- **COMPLETELY MISSING** - We have no player setup at all
- We skip straight from landing to gameplay

### Changes Needed (NEW SCREEN)
- Add player name input with add button
- Player list with colored avatars (auto-assign colors)
- Delete player functionality
- Team creation: Random vs Manual toggle
- Number of teams selector
- "Create Random Teams" button
- Minimum 2 players validation, maximum 20

---

## SCREEN 3: Teams Created

### Reference Design
- **Sparkle/confetti icon** at top
- **Heading**: "Teams Created!" (bold)
- **Subtitle**: "Ready to start the game!"
- **Team cards** (2 teams shown):
  - Team Sun (with sun emoji/icon):
    - Editable team name (pencil icon)
    - "2 players" count on right
    - Player name badges/chips below (ron, jon)
  - Team Moon (with moon emoji/icon):
    - Same structure (tina, motey)
- **Purple gradient "Start Game" button**
- **"Reshuffle Teams" link** below button

### Current Implementation
- **COMPLETELY MISSING**

### Changes Needed (NEW SCREEN)
- Show team assignments after random creation
- Team name display with player badges
- "Start Game" button to proceed to settings/gameplay
- "Reshuffle Teams" to re-randomize

---

## SCREEN 4: Game Settings

### Reference Design
- **Heading**: "Game Settings"
- **Subtitle**: "Customize the game to your preference"
- **Timer Duration**:
  - Slider control (range appears ~10s to 60s)
  - Orange badge showing current value "30s"
  - Default: 30 seconds
- **Win Condition**:
  - "Choose how the game ends"
  - Toggle: "Points" (orange, selected) vs "Rounds"
  - Point options: 30 (selected, purple), 60, 90, 120, 150
- **Words per Turn**:
  - Slider control
  - Badge showing count (default: 5)
- **Sound**: Toggle switch (on by default)
- **Vibration**: Toggle switch (on, "Phone vibration on timer")
- **Bottom**: "Back" text button + orange "Start Game!" button

### Current Implementation
- **COMPLETELY MISSING** - We hardcode 30s timer and 5 words

### Changes Needed (NEW SCREEN)
- Timer duration slider (15s, 30s, 45s, 60s)
- Win condition: Points mode (30, 60, 90, 120, 150) vs Rounds mode (3, 5, 10)
- Words per turn selector (3, 4, 5, 6, 7)
- Sound toggle (play a tick/buzzer sound)
- Skip vibration (web limitation)
- Back + Start Game buttons

---

## SCREEN 5: Turn Announcement

### Reference Design
- **Scoreboard bar at top**:
  - Left: "0" + "Team Sun" (orange text)
  - Center/Right: "0" + "Team Moon" (gray text)
  - Far right: "Round 1"
- **Purple circle avatar** with person icon (large, centered)
- **"tina's Turn"** (bold, large text)
- **"Team Sun - Describe the words below"** (subtitle)
- **Large orange circle play button** to start the timer/round

### Current Implementation
- **COMPLETELY MISSING** - We go directly into word display

### Changes Needed (NEW SCREEN)
- Scoreboard header showing both team scores and round number
- Current player avatar and name
- Team assignment text
- Large "Play" button to start the 30-second timer
- This screen pauses before gameplay so the describer can get ready

---

## SCREEN 6: Gameplay (Active Round)

### Reference Design
- **Scoreboard bar** (same as Screen 5, persistent at top)
- **Player info**: Purple avatar + "tina's Turn" + "Team Sun - Describe the words below"
- **Timer**: Large "21" centered, counting down (seconds remaining displayed as big number)
- **5 Word cards** (stacked vertically):
  - White/light cards with subtle colored left border
  - Words: "Liberation Day", "McDonald's", "pen", "bath", "Hobbit"
  - Cards appear tappable (to mark correct/incorrect)
  - Some cards have green left border (guessed correctly?)
- **Rules reminder box** (red/pink background):
  - "Rules - What you CANNOT do:"
  - X Say the word itself or parts of it
  - X Spell or translate the word to another language
  - X Use direct rhyming words (e.g. cat -> hat)
  - X Point to, write down or draw the word
  - X Make sounds that directly give away the word (e.g. "meow" for cat)
- **Bottom action buttons**:
  - "Pause" button (outline/ghost style)
  - "End Turn" button (red/orange filled)
- **"Stop Game & Analytics" link** at very bottom

### Current Implementation Differences
- We DO have word cards and a timer - but:
  - Our timer is a progress bar, not a large centered number
  - We show category labels on each word (reference does NOT)
  - We have checkmark circles on right (reference uses colored left borders)
  - We do NOT have the rules reminder box
  - We do NOT have Pause functionality
  - We do NOT have "End Turn" (we have "Done Early" which is similar)
  - We do NOT show player/team info during gameplay
  - We do NOT have the scoreboard header
  - We do NOT have "Stop Game & Analytics"

### Changes Needed
- Add persistent scoreboard header (team scores + round)
- Show current player name and team
- Change timer to large centered number (keep progress bar as secondary)
- Restyle word cards: remove category labels, add colored left border, make tappable
  to toggle green border (correct) vs default
- Add rules reminder box below words
- Add "Pause" and "End Turn" buttons at bottom
- Add "Stop Game & Analytics" link

---

## MISSING SCREEN: Round Results / Score Update

The reference likely has a results screen after each turn showing which words
were guessed correctly and updating the team score. We need:
- Show which words were correct/incorrect (checkmarks/crosses)
- Update team scores
- "Next Turn" button to move to next player
- When win condition is met, show final results

---

## COMPLETE GAME FLOW (Revised)

```
1. LANDING PAGE     -> Click "Start Game"
2. ADD PLAYERS      -> Enter names, click "Create Random Teams"
3. TEAMS CREATED    -> Review teams, click "Start Game"
4. GAME SETTINGS    -> Customize settings, click "Start Game!"
5. TURN ANNOUNCE    -> Shows who's turn it is, click Play button
6. GAMEPLAY         -> 30s timer, 5 words, tap correct ones
7. TURN RESULTS     -> Show results, update scores, "Next Turn"
   (Repeat 5-7 for each player, cycling through teams)
8. GAME OVER        -> Final scores, winner announcement
```

---

## COMPONENT ARCHITECTURE

```
ThirtySeconds.jsx (main container, manages game state)
  |
  |-- LandingPage       (Screen 1 - hero, how to play, start)
  |-- AddPlayers        (Screen 2 - player input, team config)
  |-- TeamsCreated      (Screen 3 - team review)
  |-- GameSettings      (Screen 4 - timer, win condition, words)
  |-- TurnAnnounce      (Screen 5 - who's turn, play button)
  |-- Gameplay          (Screen 6 - timer, words, rules)
  |-- TurnResults       (after each turn - results + scores)
  |-- GameOver          (final winner screen)
```

### State Management (single component, useState)
```
gameState:     "landing" | "addPlayers" | "teamsCreated" |
               "settings" | "turnAnnounce" | "playing" |
               "turnResults" | "gameOver"

players:       [{ name, color, id }]
teams:         [{ name, icon, players: [], score: 0 }]
settings:      { timerDuration, winCondition, winTarget, wordsPerTurn, sound }
currentRound:  number
currentTeamIndex: number
currentPlayerIndex: { [teamIndex]: playerIndex }
currentWords:  [{ word, category, guessed: bool }]
timeLeft:      number
turnHistory:   [{ player, team, words, score }]
```

---

## STYLING APPROACH

Since the game lives within the portfolio (dark theme), we adapt:
- Keep dark background from portfolio
- Use white/light semi-transparent cards (glass-morphism)
- Orange gradient for primary action buttons (matching reference)
- Purple for secondary elements (matching portfolio accent)
- Green for success/correct states
- Red for rules/warnings
- Colored avatar circles for players

---

## WORD BANK

Keep existing 6 categories with 30 words each (180 total).
Words are randomly selected without showing category to the player
(reference does NOT show categories during gameplay).

---

## SUMMARY OF ALL CHANGES FROM CURRENT IMPLEMENTATION

| Feature | Current | Needed |
|---------|---------|--------|
| Landing page | Basic hero + how to play | Polish, add gradient dividers |
| Add Players screen | MISSING | Full player input + list |
| Team creation | MISSING | Random/manual assignment |
| Teams review screen | MISSING | Show teams + reshuffle |
| Game settings | MISSING | Timer, win condition, words/turn |
| Turn announcement | MISSING | Player name + team + play button |
| Scoreboard | MISSING | Persistent team scores + round |
| Timer display | Progress bar only | Large number + progress bar |
| Word cards | Dark cards + categories | Clean cards, colored borders, no categories |
| Rules reminder | MISSING | Red box with 5 rules |
| Pause button | MISSING | Pause/resume timer |
| Turn results | Shows round score | Show per-word results + team score update |
| Game over | MISSING | Winner announcement + final scores |
| Multi-turn flow | MISSING | Cycle through players/teams |
