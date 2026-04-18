const imageInput = document.getElementById('imageInput');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const timerText = document.getElementById('timerText');
const dlTimerText = document.getElementById('dlTimerText');
const processingTimer = document.getElementById('processingTimer');
const finalContent = document.getElementById('finalContent');
const dlFree = document.getElementById('dlFree');
const downloadOverlay = document.getElementById('downloadOverlay');

let blobUrl = "";

// 1. Upload & Processing
imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    resultArea.style.display = 'block';
    finalContent.style.display = 'none';
    processingTimer.style.display = 'block';
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('https://anilkava-remove-bg-api.hf.space/remove-bg', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        blobUrl = URL.createObjectURL(blob);
        resultImg.src = blobUrl;

        // Initial 5s Timer
        let seconds = 5;
        timerText.innerText = seconds;
        const interval = setInterval(() => {
            seconds--;
            timerText.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(interval);
                processingTimer.style.display = 'none';
                finalContent.style.display = 'block';
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1000);

    } catch (err) {
        alert("API Busy! Refreshing...");
        resultArea.style.display = 'none';
    }
});

// 2. Download Button with 3s Pop-up Ad
dlFree.addEventListener('click', () => {
    if (!blobUrl) return;

    // Show Pop-up
    downloadOverlay.style.display = 'flex';
    let dlSeconds = 3;
    dlTimerText.innerText = dlSeconds;

    const dlInterval = setInterval(() => {
        dlSeconds--;
        dlTimerText.innerText = dlSeconds;

        if (dlSeconds <= 0) {
            clearInterval(dlInterval);
            downloadOverlay.style.display = 'none'; // Hide Pop-up

            // Trigger Download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = "AK-HD-Result.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, 1000);
});