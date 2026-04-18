const imageInput = document.getElementById('imageInput');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const adOverlay = document.getElementById('adOverlay');
const countdown = document.getElementById('countdown');
const dlFree = document.getElementById('dlFree');

let finalBlobUrl = "";

// 1. Upload Logic
imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show 5s Timer Ad before processing
    adOverlay.style.display = 'flex';
    runTimer(5, async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('https://anilkava-remove-bg-api.hf.space/remove-bg', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error("API Error");

            const blob = await res.blob();
            finalBlobUrl = URL.createObjectURL(blob);

            // Hide Ad and Show Result
            adOverlay.style.display = 'none';
            resultImg.src = finalBlobUrl;
            resultArea.style.display = 'block';

            // AUTO SCROLL TO RESULT
            setTimeout(() => {
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);

        } catch (err) {
            alert("Server is waking up. Please try again in 10 seconds.");
            adOverlay.style.display = 'none';
        }
    });
});

// 2. Download Logic with 5s Timer Ad
dlFree.addEventListener('click', () => {
    if (!finalBlobUrl) return;

    adOverlay.style.display = 'flex';
    runTimer(5, () => {
        adOverlay.style.display = 'none';
        const link = document.createElement('a');
        link.href = finalBlobUrl;
        link.download = "AK-HD-Removed.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Helper Function: Timer Logic
function runTimer(seconds, callback) {
    let timeLeft = seconds;
    countdown.innerText = timeLeft;
    
    const timerId = setInterval(() => {
        timeLeft--;
        countdown.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            callback();
        }
    }, 1000);
}