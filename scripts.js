const platformList = document.querySelector('.platforms-list')
const platformButtons = platformList.querySelectorAll('.platform')
const slider = document.querySelector('.cards__wrapper')
const cardsList = slider.querySelectorAll('.card')
const sliderRightButton = document.querySelector('.right-arrow')
const sliderLeftButton = document.querySelector('.left-arrow')
const dotsList = document.querySelector('.dots-list')
const dotsButtons = dotsList.querySelectorAll('.dot')

let currentDot = dotsButtons[0]
let currentPlatform = 'all'

const cardsCount = cardsList.length // количество карточек продуктов
let firstActiveCard = 0
let lastActiveCard = 3
const platformsCardsState = {
  'all': {firstActiveCard, lastActiveCard},
  'windows': {firstActiveCard, lastActiveCard},
  'macos': {firstActiveCard, lastActiveCard},
  'android': {firstActiveCard, lastActiveCard},
  'ios': {firstActiveCard, lastActiveCard},
  'free-tools': {firstActiveCard, lastActiveCard},
}
console.log(cardsCount)



const choosePlatformHandler = (platformButton) => {
  platformButton.addEventListener('click', () => {
    for (let i=0; i < platformButtons.length; i++) {
      platformButtons[i].classList.remove('platform--active')
    }
    platformButton.classList.add('platform--active')
    currentPlatform =platformButton.classList[1]
    checkButtonsState()
    checkDotsStatus()
  }
  )
}

for (let i=0; i < platformButtons.length; i++) {
  choosePlatformHandler(platformButtons[i])
}

const checkButtonsState = () => {
  if (platformsCardsState[currentPlatform].firstActiveCard === 0) {
    sliderLeftButton.disabled = true
  } else if (platformsCardsState[currentPlatform].firstActiveCard !== 0) {
    sliderLeftButton.disabled = false
  }
  if (platformsCardsState[currentPlatform].lastActiveCard === cardsCount - 1) {
    sliderRightButton.disabled = true
  } else if (platformsCardsState[currentPlatform].lastActiveCard !== cardsCount - 1) {
    sliderRightButton.disabled = false
  }
}

const checkDotsStatus = () => {
  currentDot.classList.remove('dot--active')
  currentDot = dotsButtons[platformsCardsState[currentPlatform].firstActiveCard]
  currentDot.classList.add('dot--active')
}
// checkButtonsState()
const rightButtonClickHandler = () => {
  cardsList[platformsCardsState[currentPlatform].firstActiveCard].hidden = true
  cardsList[platformsCardsState[currentPlatform].lastActiveCard+1].hidden = false
  platformsCardsState[currentPlatform].firstActiveCard++
  platformsCardsState[currentPlatform].lastActiveCard++
  checkButtonsState()
  checkDotsStatus()
  console.log(platformsCardsState[currentPlatform].firstActiveCard, platformsCardsState[currentPlatform].lastActiveCard)
}

const leftButtonClickHandler = () => {
  cardsList[platformsCardsState[currentPlatform].firstActiveCard-1].hidden = false
  cardsList[platformsCardsState[currentPlatform].lastActiveCard].hidden = true
  platformsCardsState[currentPlatform].firstActiveCard--
  platformsCardsState[currentPlatform].lastActiveCard--
  checkButtonsState()
  checkDotsStatus()
  console.log(platformsCardsState[currentPlatform].firstActiveCard, platformsCardsState[currentPlatform].lastActiveCard)
}

sliderLeftButton.addEventListener('click', () => {leftButtonClickHandler()})
sliderRightButton.addEventListener('click', () => {rightButtonClickHandler()})



