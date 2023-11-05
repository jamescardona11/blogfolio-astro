// Detect system preference change
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    setTheme(event.matches ? 'dark' : 'light')
  })

// Set theme
function setTheme(newTheme) {
  localStorage.setItem('theme', newTheme)
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(newTheme)
  document
    .querySelector('button[aria-label="Toggle Dark Mode"] .sun')
    .classList.toggle('hidden', newTheme !== 'dark')
  document
    .querySelector('button[aria-label="Toggle Dark Mode"] .moon')
    .classList.toggle('hidden', newTheme !== 'light')
}

// Toggle theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
}

// Detect system preference
if (!localStorage.getItem('theme')) {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // if (SITE_METADATA.theme !== 'system') {
  //     isDark = SITE_METADATA.theme === 'dark'
  // }
  setTheme(isDark ? 'dark' : 'light')
}

// Set initial theme
setTheme(localStorage.getItem('theme'))

// Add event listener
document
  .querySelector('button[id="switch-theme"]')
  .addEventListener('click', toggleTheme)
document.addEventListener('astro:after-swap', () =>
  setTheme(localStorage.getItem('theme'))
)
