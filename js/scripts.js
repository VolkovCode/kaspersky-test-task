const platformList = document.querySelectorAll('.platforms-list')
let platformButtons // Кнопки выбора платформы
const slider = document.querySelector('.cards__wrapper')
const cardsList = slider.querySelectorAll('.card') // Список карточек
const sliderRightButton = document.querySelector('.right-arrow') // Праввая кнопка слайдера
const sliderLeftButton = document.querySelector('.left-arrow') // Левая кнопка слайдера
const dotsList = document.querySelector('.dots-list')
const dotsButtons = dotsList.querySelectorAll('.dot') // Точки под карточками

let currentPlatform = 'all' // выбранная платформа в списке платфом
const cardsCount = cardsList.length // количество карточек продуктов
let windowWidth // ширина экрана
let visibleCardsCount // количество отображаемых карточек в зависимости от разрешения экрана
let dotsCount // количество точек под карточками в зависимости от разрешения экрана
let firstActiveCard = 0 // Первая отображаемая карточка
let lastActiveCard // Последняя отображаемая карточка
let currentDot = dotsButtons[0] // Текущая подсвеченная точка
let platformsCardsState // состояние карточек в зависимости от платформы

/**
 Проверяет состояние кнопок слайдера при смене платформы и
 разрешения экрана, а так же при переключении карточек
 **/
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

/**
 Меняет выбранную платформу
 **/
const choosePlatformHandler = (platformButton) => {
  platformButton.addEventListener('click', () => {
      for (let i=0; i < platformButtons.length; i++) {
        platformButtons[i].classList.remove('platform--active')
      }
      platformButton.classList.add('platform--active')
      currentPlatform = platformButton.classList[1]
      checkButtonsState()
      checkDotsStatus()
    }
  )
}

/**
 Проверяет состояние точек под карточками при смене платформы и разрешения экрана
 **/
const checkDotsStatus = () => {
  currentDot.classList.remove('dot--active')
  currentDot = dotsButtons[platformsCardsState[currentPlatform].firstActiveCard]
  currentDot.classList.add('dot--active')
}

/**
 Задает состояние при загрузке и смене разрешения экрана
 **/
const onLoadAndResizeHandler = () => {
  windowWidth = window.innerWidth
  if (windowWidth < 768) {
    dotsCount = 6
    visibleCardsCount = 2
    platformButtons = platformList[1].querySelectorAll('.platform')
  } else if (767 < windowWidth && windowWidth < 1200) {
    dotsCount = 5
    lastActiveCard = 1
    visibleCardsCount = 2
    platformButtons = platformList[0].querySelectorAll('.platform')
  } else {
    dotsCount = 3
    lastActiveCard = 3
    visibleCardsCount = 4
    platformButtons = platformList[0].querySelectorAll('.platform')
  }

  // Делаем все карточки и точки невидимыми
  for (let i = 0; i < cardsCount; i++) {
    cardsList[i].classList.add('visually-hidden')
  }

  for (let i = 0; i < dotsButtons.length; i++) {
    dotsButtons[i].classList.add('visually-hidden')
    console.log(dotsButtons[i].classList)
  }

  // а потом отображаем их количество в зависимости от разрешения экрана
  for (let i = 0; i < dotsCount; i++) {
    dotsButtons[i].classList.remove('visually-hidden')
  }

  for (let i = 0; i < visibleCardsCount; i++) {
    cardsList[i].classList.remove('visually-hidden')
  }

  platformsCardsState = {
    'all': {firstActiveCard, lastActiveCard},
    'windows': {firstActiveCard, lastActiveCard},
    'macos': {firstActiveCard, lastActiveCard},
    'android': {firstActiveCard, lastActiveCard},
    'ios': {firstActiveCard, lastActiveCard},
    'free-tools': {firstActiveCard, lastActiveCard},
  }

  for (let i=0; i < platformButtons.length; i++) {
    choosePlatformHandler(platformButtons[i])
  }
  checkButtonsState()
  checkDotsStatus()
}

const rightButtonClickHandler = () => {
  cardsList[platformsCardsState[currentPlatform].firstActiveCard].classList.add('visually-hidden')
  cardsList[platformsCardsState[currentPlatform].lastActiveCard+1].classList.remove('visually-hidden')
  platformsCardsState[currentPlatform].firstActiveCard++
  platformsCardsState[currentPlatform].lastActiveCard++
  checkButtonsState()
  checkDotsStatus()
}

const leftButtonClickHandler = () => {
  cardsList[platformsCardsState[currentPlatform].firstActiveCard-1].classList.remove('visually-hidden')
  cardsList[platformsCardsState[currentPlatform].lastActiveCard].classList.add('visually-hidden')
  platformsCardsState[currentPlatform].firstActiveCard--
  platformsCardsState[currentPlatform].lastActiveCard--
  checkButtonsState()
  checkDotsStatus()
  console.log(platformsCardsState[currentPlatform].firstActiveCard, platformsCardsState[currentPlatform].lastActiveCard)
}

sliderLeftButton.addEventListener('click', () => {leftButtonClickHandler()})
sliderRightButton.addEventListener('click', () => {rightButtonClickHandler()})

onLoadAndResizeHandler()
window.addEventListener('resize', () => onLoadAndResizeHandler()
)
