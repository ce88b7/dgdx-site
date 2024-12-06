let screenTime = 0; // 経過時間を秒でカウント
let intervalId = null; // setIntervalのID
let isScreenActive = true; // スクリーンがアクティブかどうか
let logInterval = 60; // 初期ログ記録間隔を60秒（1分）に設定
let imageDisplayTime = 60; // 初期値を1分（60秒）に設定

const screenTimeElement = document.getElementById("screen-time");
const logElement = document.getElementById("screen-time-log");
const startButton = document.getElementById("start-screen-time-btn");
const stopButton = document.getElementById("stop-screen-time-btn");
const intervalInput = document.getElementById("log-interval-input"); // ログ間隔を設定する入力フィールド
const imageTimeInput = document.getElementById("image-display-time-input"); // 画像表示秒数の入力フィールド
const imageDisplaySection = document.getElementById("image-display-section"); // 画像表示セクション

let images = ["cat_sleep.png", "cat_sleep_white.png", "cat_sleep_gray.png", "cat_sleep_chatora.png","cat_sleep_kijitora.png", "cat_sleep_sabatora.png","cat_sleep_gray_siro.png", "cat_sleep_chatora_siro.png","cat_sleep_kijitora_siro.png", "cat_sleep_sabatora_siro.png","cat_sleep_kijitora_siro.png"]; // 画像リスト

// スクリーンタイムを開始するボタンのイベントリスナー
startButton.addEventListener("click", () => {
    startScreenTime();
    startButton.style.display = "none";
    stopButton.style.display = "inline-block";
});

// スクリーンタイムを停止するボタンのイベントリスナー
stopButton.addEventListener("click", () => {
    stopScreenTime();
    startButton.style.display = "inline-block";
    stopButton.style.display = "none";
});

// 画像表示時間の入力値を更新するイベントリスナー
imageTimeInput.addEventListener("input", () => {
    const inputMinutes = parseInt(imageTimeInput.value, 10); // 入力値を整数に変換
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        imageDisplayTime = inputMinutes * 60; // 分数を秒に変換して設定
        console.log(`画像表示間隔が ${imageDisplayTime} 秒に設定されました。`);
    } else {
        alert("1分以上の値を入力してください。"); // 無効な値の場合の警告
    }
});

// ログ記録間隔の入力値を更新するイベントリスナー
intervalInput.addEventListener("input", () => {
    const inputMinutes = parseInt(intervalInput.value, 10); // 入力値を整数に変換
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        logInterval = inputMinutes * 60; // 分数を秒に変換して記録間隔に設定
        console.log(`ログ記録間隔が ${logInterval} 秒に設定されました。`);
    }
});

function startScreenTime() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            if (isScreenActive) {
                screenTime++;
                screenTimeElement.textContent = `スクリーンタイム: ${screenTime}秒`;

                // ユーザー指定の間隔ごとにログを記録
                if (screenTime % logInterval === 0) {
                    logScreenTime(screenTime);
                }

                // 指定秒数が経過したら画像をランダムに表示
                if (screenTime % imageDisplayTime === 0) {
                    displayRandomImage();
                }
            }
        }, 1000);
    }
}

// スクリーンタイムを停止する関数
function stopScreenTime() {
    clearInterval(intervalId);
    intervalId = null;
}

// スクリーンタイムのログを記録する関数
function logScreenTime(time) {
    const minutes = Math.floor(time / 60);
    const logEntry = document.createElement("div");
    logEntry.textContent = `スクリーンタイム経過: ${minutes}分 (${time}秒)`;
    logElement.appendChild(logEntry);
}

// ランダムに画像を表示する関数
function displayRandomImage() {
    if (images.length === 0) {
        console.log("すべての画像が表示されました。");
        return;
    }

    // ランダムなインデックスを取得
    const randomIndex = Math.floor(Math.random() * images.length);

    // ランダムに選ばれた画像を表示
    const imageSrc = images[randomIndex];
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.alt = "Displayed Image";
    imgElement.classList.add("displayed-image"); // CSSでスタイル設定可能
    imageDisplaySection.appendChild(imgElement);

    // 選ばれた画像をリストから削除
    images.splice(randomIndex, 1);
}

const resetButton = document.getElementById("reset-screen-time-btn"); // リセットボタンの取得

// リセットボタンのイベントリスナー
resetButton.addEventListener("click", () => {
    // スクリーンタイムをリセット
    screenTime = 0;
    screenTimeElement.textContent = `スクリーンタイム: ${screenTime}秒`;

    // カウントを停止
    clearInterval(intervalId);
    intervalId = null;

    // ボタン表示をリセット
    startButton.style.display = "inline-block";
    stopButton.style.display = "none";
});
