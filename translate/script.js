const inputTextArea = document.getElementById('inputTextArea');
const englishResultTextArea = document.getElementById('englishResultTextArea');
const japaneseResultTextArea = document.getElementById('japaneseResultTextArea');
const copyEnglishResultButton = document.getElementById('copyEnglishResultButton');
const copyJapaneseResultButton = document.getElementById('copyJapaneseResultButton');
const translateButton = document.getElementById('translateButton');

// 英語の翻訳結果をコピー
new ClipboardJS(copyEnglishResultButton);

// 日本語に再翻訳した結果をコピー
new ClipboardJS(copyJapaneseResultButton);

// 翻訳ボタンが押されたときに呼び出される関数
function handleTranslateButtonClick() {
  const text = inputTextArea.value;

  if (text === '') {
    return;
  }

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
  });
}

// 翻訳ボタンのクリックイベントを設定
translateButton.addEventListener('click', handleTranslateButtonClick);

