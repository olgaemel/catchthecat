const screens = document.querySelectorAll('.screen')
const choose_cat_btns = document.querySelectorAll('.choose-cat-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

start_btn.addEventListener('click', () => {
  screens[0].classList.add('up')
})

let score = 0
let seconds = 0
let selected_cat = {}

choose_cat_btns.forEach((btn) =>
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selected_cat = { src, alt }
    screens[1].classList.add('up')
    setTimeout(createCat, 1000)
    startGame()
  })
)

function startGame() {
  setInterval(increaseTime, 1000)
}

function increaseTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function createCat() {
  const cat = document.createElement('div')
  cat.classList.add('cat')
  const { x, y } = createRandomLocation()
  cat.style.top = `${y}px`
  cat.style.left = `${x}px`
  cat.innerHTML = `<img src="${selected_cat.src}" alt="${
    selected_cat.alt
  }" style="transform:rotate(${Math.random() * 360}deg)"/>`

  cat.addEventListener('click', catchCat)

  game_container.appendChild(cat)
}

function createRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchCat() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  addCats()
}

function addCats() {
  setTimeout(createCat, 1000)
  setTimeout(createCat, 1500)
}

function increaseScore() {
  score++
  if (score > 19) {
    message.classList.add('visible')
  }
  scoreEl.innerHTML = `Score: ${score}`
}
