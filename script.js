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

        let seconds = 5;
        const countdown = setInterval(() => {
            seconds--;
            timerText.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(countdown);
                processingTimer.style.display = 'none';
                finalContent.style.display = 'block';
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1000);
    } catch (err) {
        alert("Try again!");
        resultArea.style.display = 'none';
    }
});

dlFree.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = "AK-Result.png";
    a.click();
});