const imageInput = document.getElementById('imageInput');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const adOverlay = document.getElementById('adOverlay');
const countdown = document.getElementById('countdown');
const dlFree = document.getElementById('dlFree');

let resultUrl = ""; // Global variable for download

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show Ad & Start Initial Timer
    adOverlay.style.display = 'flex';
    startTimer(5, async () => {
        // 2. Call API after 5s
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://anilkava-remove-bg-api.hf.space/remove-bg', {
                method: 'POST',
                body: formData
            });

            const blob = await response.blob();
            resultUrl = URL.createObjectURL(blob);

            // 3. Hide Overlay & Show Result
            adOverlay.style.display = 'none';
            resultArea.style.display = 'block';
            resultImg.src = resultUrl;

            // 4. AUTO SCROLL TO RESULT (Khatarnak smooth scroll)
            setTimeout(() => {
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);

        } catch (err) {
            alert("Server Error! Trying to wake up...");
            adOverlay.style.display = 'none';
        }
    });
});

// 5. Download Button with 5s Ad
dlFree.addEventListener('click', () => {
    adOverlay.style.display = 'flex';
    startTimer(5, () => {
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = "AK_HD_Removed.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        adOverlay.style.display = 'none';
    });
});

// Helper Function for Timer
function startTimer(seconds, callback) {
    let time = seconds;
    countdown.innerText = time;
    const interval = setInterval(() => {
        time--;
        countdown.innerText = time;
        if (time <= 0) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}