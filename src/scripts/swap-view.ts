// To avoid blinking when the page is loading we start with the grid and list view `hidden`
// After we call `init` to set the default view for the current path
export class SwapView extends HTMLElement {
  constructor() {
    super()

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

    function changeToGrid() {
      gridView?.classList.add('hidden')
      listView?.classList.remove('hidden')

      buttonSwapToGrid?.classList.remove('hidden')
      buttonSwapToList?.classList.add('hidden')

      upsertViewTypeForPath()
    }

    function changeToList() {
      gridView?.classList.remove('hidden')
      listView?.classList.add('hidden')

      buttonSwapToGrid?.classList.add('hidden')
      buttonSwapToList?.classList.remove('hidden')

      upsertViewTypeForPath()
    }

    function upsertViewTypeForPath() {
      const currentPath = window.location.pathname
      const currentView = gridView?.classList.contains('hidden')
        ? 'list'
        : 'grid'
      localStorage.setItem(currentPath, currentView)
    }

    // DefaultView: This is the default view when the page load for the first time
    // and there is no view saved in localStorage
    function init(defaultView: string | undefined) {
      const currentPath = window.location.pathname
      const currentView = localStorage.getItem(currentPath) ?? defaultView

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

    // Set the right view for the current path
    // Hide the no-used view and icon for the current view
    init(this.dataset.viewType)
  }
}

customElements.define('swap-view', SwapView)
