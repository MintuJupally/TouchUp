alert('Hello world from content.js');

window.addEventListener('FromComponent', () => {
  const imgSrc = chrome.runtime.getURL('logo.svg');

  // Send response
  var event = new CustomEvent('ToComponent', { detail: imgSrc });
  window.dispatchEvent(event);
});
