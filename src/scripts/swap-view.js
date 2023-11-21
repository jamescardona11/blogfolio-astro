// To avoid blinking when the page is loading we hide the grid and list view
// After we call `readViewForPath` to set the default view for the current path

// icon-grid-button: This are the selector for the svg grid-icon
// icon-list-button: This are the selector for the svg list-icon
const buttonSwapList = document.querySelector('[icon-list-button]')
const buttonSwapGrid = document.querySelector('[icon-grid-button]')

// grid-view: This are the selector for the div that contains the grid
// list-view: This are the selector for the div that contains the list
const gridView = document.querySelector('[grid-view]')
const listView = document.querySelector('[list-view]')

buttonSwapList?.addEventListener('click', changeToGrid)
buttonSwapGrid?.addEventListener('click', changeToList)

// Set the view for the current path
// Hide the view and icon for the current view
readViewForPath()

function changeToGrid() {
  gridView?.classList.add('hidden')
  listView?.classList.remove('hidden')

  buttonSwapGrid?.classList.remove('hidden')
  buttonSwapList?.classList.add('hidden')

  saveViewForPath()
}

function changeToList() {
  gridView?.classList.remove('hidden')
  listView?.classList.add('hidden')

  buttonSwapGrid?.classList.add('hidden')
  buttonSwapList?.classList.remove('hidden')

  saveViewForPath()
}

// Default view is grid when the never visited the page
// to change the default view move the currentView === null to the else statement
function readViewForPath() {
  const currentPath = window.location.pathname
  const currentView = localStorage.getItem(currentPath)

  if (currentView === 'list') {
    // By default we hide the list view and grid icon
    buttonSwapList?.classList.add('hidden')
    buttonSwapGrid?.classList.remove('hidden')
    gridView?.classList.add('hidden')
    listView?.classList.remove('hidden')
  } else if (currentView == null || currentView === 'grid') {
    // By default we hide the list view and grid icon
    buttonSwapGrid?.classList.add('hidden')
    buttonSwapList?.classList.remove('hidden')
    listView?.classList.add('hidden')
    gridView?.classList.remove('hidden')
  }
}

function saveViewForPath() {
  const currentPath = window.location.pathname
  const currentView = gridView?.classList.contains('hidden') ? 'list' : 'grid'
  localStorage.setItem(currentPath, currentView)
}
