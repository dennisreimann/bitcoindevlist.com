// shuffle
const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * i); const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp; }; return arr }
const lists = document.querySelectorAll('.donatees')
lists.forEach(list => {
  const donatees = Array.from(list.querySelectorAll('li'))
  list.innerHTML = ""
  shuffle(donatees).forEach(li => list.appendChild(li))
})
// more
const more = document.querySelectorAll('.showMore')
more.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    link.parentNode.parentNode.classList.add('expanded')
  })
})
