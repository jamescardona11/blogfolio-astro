let copyButtonLabel = 'copy'
let codeBlocks = Array.from(document.querySelectorAll('pre'))

for (let codeBlock of codeBlocks) {
  let wrapper = document.createElement('div')
  wrapper.style.position = 'relative'

  let copyButton = document.createElement('button')
  copyButton.className = 'copy-code'
  copyButton.innerHTML = copyButtonLabel

  codeBlock.setAttribute('tabindex', '0')
  codeBlock.appendChild(copyButton)
  // wrap codebock with relative parent element
  codeBlock.parentNode.insertBefore(wrapper, codeBlock)
  wrapper.appendChild(codeBlock)

  copyButton.addEventListener('click', async () => {
    await copyCode(codeBlock, copyButton)
  })
}

async function copyCode(block, button) {
  let code = block.querySelector('code')
  let text = code.innerText

  await navigator.clipboard.writeText(text)

  // visual feedback that task is completed
  button.innerText = 'code copied'

  setTimeout(() => {
    button.innerText = copyButtonLabel
  }, 700)
}
