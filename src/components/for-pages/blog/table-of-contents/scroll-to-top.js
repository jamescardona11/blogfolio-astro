import { TOP_SCROLL_ID, TOP_ID } from './toc'

const scrollLink = document.getElementById(TOP_SCROLL_ID)

scrollLink.addEventListener('click', function (e) {
  e.preventDefault()

  const targetElement = document.getElementById(TOP_ID)
  const offset = targetElement.offsetTop - 80

  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })
})
