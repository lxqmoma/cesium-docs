(function () {
  const filterType = document.getElementById('filterType')
  const classFilter = document.getElementById('ClassFilter')
  const classList = document.getElementById('ClassList')

  function filter() {
    const value = classFilter.value.toLowerCase()

    const items = classList.getElementsByTagName('li')
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      let itemName = item.getAttribute('data-name') || ''
      itemName = itemName.toLowerCase().replace(/\s/g, '')
      if (itemName.includes(value)) {
        item.style.display = ''
      }
      else {
        item.style.display = 'none'
      }
    }
  }
  classFilter.onkeyup = filter

  function getQueryParameter(name) {
    const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }

  const show = getQueryParameter('show')
  if (show) {
    document.getElementById('filterType').value = show
  }

  const searchTerm = getQueryParameter('classFilter') || ''
  classFilter.value = searchTerm
  filter()

  function resetFilter() {
    classFilter.value = ''
    filter()
  }

  function updateMenuLinks() {
    const links = classList.getElementsByTagName('a')
    const searchTerm = classFilter.value
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      const prefix = link.href.split('?')[0]
      link.href = prefix + (searchTerm === '' ? '' : `?classFilter=${searchTerm}`)
    }
  }

  const menuLinks = classList.getElementsByTagName('a')
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = function () {
      updateMenuLinks()
    }
  }
})()
