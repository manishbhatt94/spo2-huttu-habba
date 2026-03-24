export interface Slide {
  id: number
  name: string
  desktop: string
  mobile: string
  captionKannada: string
  captionEnglish: string
}

const pathPrefix = "/spo2-huttu-habba/assets/images/";

export const slides: Slide[] = [
  {
    id: 1,
    name: "BTS",
    desktop: pathPrefix + "01--BTS--Desktop.webp",
    mobile: pathPrefix + "01--BTS--Mobile.webp",
    captionKannada: "ಇವರು ನಿನ್ನ ಫೇವರಿಟ್, ಆದರೆ ವಿಶ್ ಮಾಡೋದು ನಾನೇ!",
    captionEnglish: "They are your favorites, but I'm the one wishing you!",
  },
  {
    id: 2,
    name: "Seventeen",
    desktop: pathPrefix + "02--Seventeen--Desktop.webp",
    mobile: pathPrefix + "02--Seventeen--Mobile.webp",
    captionKannada: "ಹದಿಮೂರು ಜನ ಇದ್ದಾರೆ... ಹೆಸರು ಮರೆತು ಹೋಯಿತು!",
    captionEnglish: "There are thirteen of them... I already forgot the names!",
  },
  {
    id: 3,
    name: "Sloth",
    desktop: pathPrefix + "03--Sloth--Desktop.webp",
    mobile: pathPrefix + "03--Sloth--Mobile.webp",
    captionKannada: "ಭಾನುವಾರ ನೀನು ಹೀಗೆ ಇರ್ತೀಯಾ?",
    captionEnglish: "Is this you on a Sunday?",
  },
  {
    id: 4,
    name: "Cat",
    desktop: pathPrefix + "04--Cat--Desktop.webp",
    mobile: pathPrefix + "04--Cat--Mobile.webp",
    captionKannada: "ಈ ಬೆಕ್ಕು ನಿನ್ನ ತರಾನೇ ಹಠಮಾರಿ!",
    captionEnglish: "This cat is stubborn, just like you!",
  },
  {
    id: 5,
    name: "Dog",
    desktop: pathPrefix + "05--Dog--Desktop.webp",
    mobile: pathPrefix + "05--Dog--Mobile.webp",
    captionKannada: "ಈ ನಾಯಿ ನಿನಗಿಂತ ಹೆಚ್ಚು ಊಟ ಮಾಡುತ್ತೆ!",
    captionEnglish: "This dog eats more than you do!",
  },
  {
    id: 6,
    name: "BLR-Breakfast",
    desktop: pathPrefix + "06--BLR-Breakfast--Desktop.webp",
    mobile: pathPrefix + "06--BLR-Breakfast--Mobile.webp",
    captionKannada: "ಒಂದು ದೋಸೆ ಸಾಲದು, ನನಗೂ ಒಂದು ಬೇಕು!",
    captionEnglish: "One Dosa is not enough, I want one too!",
  },
  {
    id: 7,
    name: "Snacks",
    desktop: pathPrefix + "07--Snacks--Desktop.webp",
    mobile: pathPrefix + "07--Snacks--Mobile.webp",
    captionKannada: "ಇಂದೇ ತಿನ್ನು, ಡಯಟ್ ನಾಳೆ ಮಾಡು!",
    captionEnglish: "Eat today, start the diet tomorrow!",
  },
  {
    id: 8,
    name: "Get-Ready",
    desktop: pathPrefix + "08--Get-Ready--Desktop.webp",
    mobile: pathPrefix + "08--Get-Ready--Mobile.webp",
    captionKannada: "ಒಂದು ಲಕ್ಷ ರೂಪಾಯಿ? ಕೂದಲು ಒಣಗಿಸೋಕೆ ಇಷ್ಟೊಂದು ಹಣವಾ?",
    captionEnglish: "One lakh rupees? This much money just to dry hair?!",
  },
  {
    id: 9,
    name: "Fidget",
    desktop: pathPrefix + "09--Fidget--Desktop.webp",
    mobile: pathPrefix + "09--Fidget--Mobile.webp",
    captionKannada: "ಕೆಲಸ ಮಾಡು, ಇದನ್ನ ಆಟ ಆಡಬೇಡ!",
    captionEnglish: "Go do some work, stop playing with these!",
  },
]
