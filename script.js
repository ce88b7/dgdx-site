
// タイマー機能の基本的な例
document.querySelector('.start').addEventListener('click', function() {
    alert('タイマーを開始します！');
});


function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.querySelector('.time').textContent = timeString;
}

// ページ読み込み時と1分ごとに時刻を更新
updateTime();
setInterval(updateTime, 60000);
