# Specification

## Summary
**Goal:** Port the Q2 ANSWERS trivia quiz into a mobile-friendly React single-page app with OpenTDB questions, leveling, persistence, sharing, and background audio controls.

**Planned changes:**
- Build the core game UI: header (logo/title, level badge, share button, mute/play toggle), progress bar, question card with four answer buttons, level-up overlay (Continue + Share), and a bottom ad placeholder banner.
- Fetch one multiple-choice question at a time from OpenTDB using a session token; renew token and retry on response_code 3/4; retry after a short delay on failures/non-0 codes; HTML-decode question/answers.
- Implement leveling/progression: goal = 5 + (level * 2); increment correctCount on correct answers; on reaching goal, level up, reset correctCount, and show overlay until Continue.
- Persist and restore level and correctCount in localStorage under the key `q2_official_save`.
- Add share functionality via Web Share API with clipboard fallback, using English-only messages; share available in header and level-up overlay.
- Add looping background music (muted/off by default) with a mute/play toggle that only attempts playback after user interaction.
- Apply an emerald/green primary theme with warm neutral background and a centered, card-like mobile container; ensure clear correct/wrong answer states and a prominent overlay.
- Include a generated static logo image asset in the header with a text fallback if the image fails to load.

**User-visible outcome:** Users can play an endless trivia quiz, see progress toward leveling up, persist progress across refreshes, share their current level, and control background music playback.
