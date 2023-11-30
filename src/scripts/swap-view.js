// To avoid blinking when the page is loading we hide the grid and list view
// After we call `readViewForPath` to set the default view for the current path

// icon-grid-button: This are the selector for the svg grid-icon
// icon-list-button: This are the selector for the svg list-icon
const buttonSwapToList = document.querySelector('[icon-list-button]')
const buttonSwapToGrid = document.querySelector('[icon-grid-button]')

// grid-view: This are the selector for the div that contains the grid
// list-view: This are the selector for the div that contains the list
const gridView = document.querySelector('[grid-view]')
const listView = document.querySelector('[list-view]')

buttonSwapToList?.addEventListener('click', changeToGrid)
buttonSwapToGrid?.addEventListener('click', changeToList)

// Set the view for the current path
// Hide the view and icon for the current view
init()

function changeToGrid() {
  gridView?.classList.add('hidden')
  listView?.classList.remove('hidden')

  buttonSwapToGrid?.classList.remove('hidden')
  buttonSwapToList?.classList.add('hidden')

  saveViewForPath()
}

function changeToList() {
  gridView?.classList.remove('hidden')
  listView?.classList.add('hidden')

  buttonSwapToGrid?.classList.add('hidden')
  buttonSwapToList?.classList.remove('hidden')

  saveViewForPath()
}

// Default view is grid when the never visited the page
// to change the default view move the currentView === null to the else statement
function init() {
  const currentPath = window.location.pathname
  const currentView = localStorage.getItem(currentPath)

  if (currentView === 'list') {
    // By default we hide the list view and grid icon
    buttonSwapToList?.classList.add('hidden')
    buttonSwapToGrid?.classList.remove('hidden')
    gridView?.classList.add('hidden')
    listView?.classList.remove('hidden')
  } else if (currentView == null || currentView === 'grid') {
    // By default we hide the list view and grid icon
    buttonSwapToGrid?.classList.add('hidden')
    buttonSwapToList?.classList.remove('hidden')
    listView?.classList.add('hidden')
    gridView?.classList.remove('hidden')
  }
}

function saveViewForPath() {
  const currentPath = window.location.pathname
  const currentView = gridView?.classList.contains('hidden') ? 'list' : 'grid'
  localStorage.setItem(currentPath, currentView)
}
