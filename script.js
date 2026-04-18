const imageInput = document.getElementById('imageInput');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const timerText = document.getElementById('timerText');
const processingTimer = document.getElementById('processingTimer');
const finalContent = document.getElementById('finalContent');
const dlFree = document.getElementById('dlFree');

let finalUrl = "";

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. UI Reset & Scroll to Box
    resultArea.style.display = 'block';
    finalContent.style.visibility = 'hidden';
    finalContent.style.height = '0';
    processingTimer.style.display = 'block';
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. Call API Immediately
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('https://anilkava-remove-bg-api.hf.space/remove-bg', {
            method: 'POST',
            body: formData
        });
        const blob = await res.blob();
        finalUrl = URL.createObjectURL(blob);
        resultImg.src = finalUrl;

        // 3. Start 5s Countdown (Even if API is fast, for UX)
        let timeLeft = 5;
        const interval = setInterval(() => {
            timeLeft--;
            timerText.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(interval);
                showResult();
            }
        }, 1000);

    } catch (err) {
        alert("Server error, please try again.");
        resultArea.style.display = 'none';
    }
});

function showResult() {
    processingTimer.style.display = 'none';
    finalContent.style.visibility = 'visible';
    finalContent.style.height = 'auto';
    // Final Auto-Scroll
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Download with Timer logic
dlFree.addEventListener('click', () => {
    // Direct download since we already showed timer once
    const link = document.createElement('a');
    link.href = finalUrl;
    link.download = "AK-HD-Image.png";
    link.click();
});