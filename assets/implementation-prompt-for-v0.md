# The Master Implementation Prompt

- Project Title: SpO2 Birthday Tribute
- Aesthetic: Nostalgic, Warm, Minimalist, Glassmorphism.
- Tech Stack: React, Tailwind CSS, Framer Motion (for animations), Lucide React (for icons).

- Goal: Create a single-page static React application that serves as an interactive, cinematic birthday wish. The app must be fully responsive, switching between Mobile and Desktop image assets based on the user's viewport.

## 1. Asset Mapping & Responsive Logic:

Images: I have 9 sets of images (18 total) stored in /assets/images/.

Logic: Create an array of objects. Each object represents a "Slide" containing a desktop path and a mobile path.

Filenames: Follow the pattern XX--Name--Desktop.png and XX--Name--Mobile.png.

(XX - Ranges from 01 to 09 - There are 9 sets of images, 2 per set, one for mobile, one for desktop.)

Implementation: Use a custom hook or window.innerWidth listener to ensure the correct image is loaded. Use a "cross-fade" transition when switching images.
(Use responsive HTML5 elements like picture which have feature to load a specific dimension image based on matched
screen dimension).

### Note (Image performance):

Performance Optimization: All image assets are in .webp format and stored in /assets/images/. Please use the loading='lazy' attribute for all images except the first slide to ensure the page feels instant. For the first slide, use priority or loading='eager'.


## 2. Core Features to Implement:

### Hero Intro:
A soft, blurred overlay that says "For SpO2..." with a "Step Inside" button. Clicking this triggers the music and starts the slideshow.

### Cinematic Slideshow:

Autoplay with a 6-second duration per slide.

Smooth opacity cross-fade transitions.

Scrub-bar / Seek-bar: A sleek, thin progress bar at the bottom. The user can click/drag this bar to seek to a specific slide or part of the slideshow.

Controls: Minimalist Play/Pause, Next, and Previous buttons (visible on hover or tap).

### Lightbox Functionality:

A "Zoom" icon on each slide.

Clicking it opens the current image in a high-quality Modal (Lightbox) with a blur-background.

Include "Pinch-to-zoom" or a "Zoom In" button within the Lightbox.

### Music Player:

Embed the YouTube video for "River Flows In You - Yiruma"
( Link: https://www.youtube.com/watch?v=7maJOI3QMu0 ).

Style it as a small, floating glassmorphism card in the bottom-left.

Keep it unobtrusive but accessible.


## 3. Content & Localization:

Main Greeting: "ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು (Huttu habbada shubhashayagalu): Happy Birthday, SpO2!"

The "Vibe" Note: Include a small footer or side-text: "From the Mountains of Uttarakhand to the Plateau of Bengaluru."

Captions: For each image set, provide a placeholder for a Kannada caption (I will fill these in later).


## 4. Visual Specs:

Color Palette: Deep earthy greens, soft creams, and golden accents.

Typography: A combination of a clean Sans-serif for UI and a warm Serif for the Kannada text.

Mobile UX: Ensure the scrub-bar is touch-friendly and the Lightbox supports swipe-to-close.


## 5. Deployment Readiness:

The code must be compatible with a static build (Vite/React) for GitHub Pages.

Ensure all paths are relative so the images load correctly from the repository root.


## 1-(a). Image File Names:

01--BTS--Desktop.webp ,
01--BTS--Mobile.webp ,
02--Seventeen--Desktop.webp ,
02--Seventeen--Mobile.webp ,
03--Sloth--Desktop.webp ,
03--Sloth--Mobile.webp ,
04--Cat--Desktop.webp ,
04--Cat--Mobile.webp ,
05--Dog--Desktop.webp ,
05--Dog--Mobile.webp ,
06--BLR-Breakfast--Desktop.webp ,
06--BLR-Breakfast--Mobile.webp ,
07--Snacks--Desktop.webp ,
07--Snacks--Mobile.webp ,
08--Get-Ready--Desktop.webp ,
08--Get-Ready--Mobile.webp ,
09--Fidget--Desktop.webp ,
09--Fidget--Mobile.webp .


## 3-(a). Image captions:

01 — BTS
Kannada: ಇವರು ನಿನ್ನ ಫೇವರಿಟ್, ಆದರೆ ವಿಶ್ ಮಾಡೋದು ನಾನೇ!

English: They are your favorites, but I’m the one wishing you!

02 — Seventeen
Kannada: ಹದಿಮೂರು ಜನ ಇದ್ದಾರೆ... ಹೆಸರು ಮರೆತು ಹೋಯಿತು!

English: There are thirteen of them... I already forgot the names!

03 — Sloth
Kannada: ಭಾನುವಾರ ನೀನು ಹೀಗೆ ಇರ್ತೀಯಾ?

English: Is this you on a Sunday?

04 — Cat
Kannada: ಈ ಬೆಕ್ಕು ನಿನ್ನ ತರಾನೇ ಹಠಮಾರಿ!

English: This cat is stubborn, just like you!

05 — Dog
Kannada: ಈ ನಾಯಿ ನಿನಗಿಂತ ಹೆಚ್ಚು ಊಟ ಮಾಡುತ್ತೆ!

English: This dog eats more than you do!

06 — BLR-Breakfast
Kannada: ಒಂದು ದೋಸೆ ಸಾಲದು, ನನಗೂ ಒಂದು ಬೇಕು!

English: One Dosa is not enough, I want one too!

07 — Snacks
Kannada: ಇಂದೇ ತಿನ್ನು, ಡಯಟ್ ನಾಳೆ ಮಾಡು!

English: Eat today, start the diet tomorrow!

08 — Get-Ready
Kannada: ಒಂದು ಲಕ್ಷ ರೂಪಾಯಿ? ಕೂದಲು ಒಣಗಿಸೋಕೆ ಇಷ್ಟೊಂದು ಹಣವಾ?

English: One lakh rupees? This much money just to dry hair?!

09 — Fidget
Kannada: ಕೆಲಸ ಮಾಡು, ಇದನ್ನ ಆಟ ಆಡಬೇಡ!

English: Go do some work, stop playing with these!


## 3-(b). Slide Captions instructions:

For the slide captions, use the provided list of Kannada and English pairs. Display the Kannada text in a larger, elegant Serif font and the English translation underneath in a smaller, subtle Sans-serif font.

Each slide image must have both the Kannada caption (more prominent) as well as the English caption (less prominent and
beneath the Kannada caption) - respective to the image set number XX.
