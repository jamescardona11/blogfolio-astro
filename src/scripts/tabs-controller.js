const tabElements = document.querySelectorAll('button[role="tab"]')
const panelElements = document.querySelectorAll('[role="tabpanel"]')
let activeIndex = 0

// Listen to clicks on tabs
tabElements.forEach(function (tab, index) {
  tab.addEventListener('click', function (event) {
    setActiveTab(index)
  })
})

function setActiveTab(index) {
  // Make currently active tab inactive
  tabElements[activeIndex].setAttribute('aria-selected', 'false')

  tabElements[activeIndex].tabIndex = -1

  // Set the new tab as active
  tabElements[index].setAttribute('aria-selected', 'true')

  tabElements[index].tabIndex = 0

  setActivePanel(index)
  activeIndex = index
}

function setActivePanel(index) {
  // Hide currently active panel
  panelElements[activeIndex].setAttribute('hidden', '')

  panelElements[activeIndex].tabIndex = -1

  // Show the new active panel
  panelElements[index].removeAttribute('hidden')

  panelElements[index].tabIndex = 0
}
