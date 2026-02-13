// V1 (zero-risk): no injection, no API calls.
// Just open the existing TimeProofs page.
const FREEZE_URL = "https://timeproofs.io/verify.html";

chrome.action.onClicked.addListener(async () => {
  await chrome.tabs.create({ url: FREEZE_URL });
});
