// shuffle
const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * i); const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp; }; return arr }
document.querySelectorAll('.donatees').forEach(list => {
  const donatees = Array.from(list.querySelectorAll('li'))
  list.innerHTML = ""
  shuffle(donatees).forEach(li => list.appendChild(li))
})
// more
document.querySelectorAll('.showMore').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    link.parentNode.parentNode.classList.add('expanded')
  })
})
// bolt12
document.querySelectorAll('.bolt12').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    link.nextSibling.classList.toggle('expanded')
  })
})
// clipboard
const copyToClipboard = (e, text) => {
  if (navigator.clipboard) {
    e.preventDefault()
    var item = e.currentTarget
    var data = text || item.getAttribute('data-clipboard')
    var confirm = item.querySelector('[data-clipboard-confirm]') || item
    var message = confirm.getAttribute('data-clipboard-confirm') || 'Copied ✔'
    if (!confirm.dataset.clipboardInitialText) {
      confirm.dataset.clipboardInitialText = confirm.innerText
      confirm.style.minWidth = confirm.getBoundingClientRect().width + 'px'
    }
    navigator.clipboard.writeText(data).then(() => {
      confirm.innerText = message
      setTimeout(() => { confirm.innerText = confirm.dataset.clipboardInitialText }, 2500)
    })
    item.blur()
  }
}

document.querySelectorAll("[data-clipboard]").forEach(item => {
  item.addEventListener("click", copyToClipboard)
})
