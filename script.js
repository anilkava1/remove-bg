const imageInput = document.getElementById('imageInput');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const timerText = document.getElementById('timerText');
const processingTimer = document.getElementById('processingTimer');
const finalContent = document.getElementById('finalContent');
const dlFree = document.getElementById('dlFree');

let blobUrl = "";

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset UI
    resultArea.style.display = 'block';
    finalContent.style.display = 'none';
    processingTimer.style.display = 'block';
    
    // Auto Scroll to Timer
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Call API
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

        // Start 5s Timer
        let seconds = 5;
        timerText.innerText = seconds;
        const countdown = setInterval(() => {
            seconds--;
            timerText.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(countdown);
                // Show Result and Scroll Again
                processingTimer.style.display = 'none';
                finalContent.style.display = 'block';
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1000);

    } catch (err) {
        alert("Server busy, try again.");
        resultArea.style.display = 'none';
    }
});

dlFree.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = "AK-HD-Result.png";
    a.click();
});