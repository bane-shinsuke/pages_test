const inputTextArea = document.getElementById('inputTextArea');
const englishResultTextArea = document.getElementById('englishResultTextArea');
const japaneseResultTextArea = document.getElementById('japaneseResultTextArea');
const copyEnglishResultButton = document.getElementById('copyEnglishResultButton');
const copyJapaneseResultButton = document.getElementById('copyJapaneseResultButton');
const translateButton = document.getElementById('translateButton');

const loadingSpinner = document.querySelector('.loading-spinner');



const copySuccessMessage = document.querySelector('.copy-success-message');

function showCopySuccessMessage() {
  copySuccessMessage.classList.add('show');
  setTimeout(() => {
    copySuccessMessage.classList.remove('show');
  }, 2000);
}

/*
const copySuccessAlert = document.getElementById('copySuccessAlert');


function showCopySuccessMessage() {
  copySuccessAlert.classList.add('show');
  setTimeout(() => {
    copySuccessAlert.classList.remove('show');
  }, 2000);
}
*/


document.getElementById('inputTextArea').focus();

function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}

// 英語の翻訳結果をコピー
//new ClipboardJS(copyEnglishResultButton);


// 日本語に再翻訳した結果をコピー
//new ClipboardJS(copyJapaneseResultButton);
//copySuccessAlert.classList.remove('show');


// 英語の翻訳結果をコピー
new ClipboardJS(copyEnglishResultButton).on('success', showCopySuccessMessage);

// 日本語に再翻訳した結果をコピー
new ClipboardJS(copyJapaneseResultButton).on('success', showCopySuccessMessage);

// 翻訳ボタンが押されたときに呼び出される関数
function handleTranslateButtonClick() {
  const text = inputTextArea.value;
  englishResultTextArea.value = "";
  japaneseResultTextArea.value = "";

  if (text === '') {
    return;
  }

  showLoadingSpinner();

  // 翻訳APIのエンドポイントURL
  const endpointUrl = 'https://nl62hxhnolv4lj234owxrxog6m0keudi.lambda-url.ap-northeast-1.on.aws/';

  // 翻訳APIにリクエストを送信
  fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: text
  })
  .then(response => response.json())
  .then(data => {
    // 翻訳結果をテキストエリアに表示
    englishResultTextArea.value = data.english;
    japaneseResultTextArea.value = data.japanese;
    hideLoadingSpinner();
  });
}

function keyPressed(e) {
    if (e.keyCode === 13) {
       handleTranslateButtonClick();
  }  
}

// 翻訳ボタンのクリックイベントを設定
translateButton.addEventListener('click', handleTranslateButtonClick);
inputTextArea.addEventListener('keypress', keyPressed);


