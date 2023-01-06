chrome.action.onClicked.addListener(function (tab) {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id, allFrames: true },
  //     files: ['/build/static/js/main.js'],
  //   });

  chrome.tabs.sendMessage(tab.id, { method: 'ping' }, function (response) {
    console.log(response);
  });
});
