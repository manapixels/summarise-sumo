const insert = (content) => {
   const element = document.createElement('div')
   const p = document.createElement('p')
   p.style.cssText = 'margin:0;'

   if (content === '') {
      const br = document.createElement('br')
      p.appendChild(br)
   } else {
      p.textContent = content
   }
   element.appendChild(p)

   element.style.cssText =
      'position:fixed;right:.5rem;top:0.5rem;width:300px;max-width:100%;height:fit-content;z-index:10000;background:rgba(0,0,0,0.9);color:#FFF;border-radius:.3rem;padding:1rem;cursor:pointer;'

   element.onclick = function () {
      document.execCommand('copy')
   }

   element.addEventListener('copy', function (event) {
      event.preventDefault()
      if (event.clipboardData) {
         event.clipboardData.setData('text/plain', p.textContent)
        //  console.log(event.clipboardData.getData('text'))
      }
   })

   setTimeout(function () {
      element.removeEventListener('copy', () => {})
      element.parentNode.removeChild(element)
   }, 8000)

   document.body.appendChild(element)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.message === 'inject') {
      const { content } = request
      const result = insert(content)

      if (!result) {
         sendResponse({ status: 'failed' })
      }

      sendResponse({ status: 'success' })
   }
})
