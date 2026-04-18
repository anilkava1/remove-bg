const imageInput = document.getElementById('imageInput');
const adOverlay = document.getElementById('adOverlay');
const countdown = document.getElementById('countdown');
const resultArea = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const dl4K = document.getElementById('dl4K');

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show Ad & Start Timer
    adOverlay.style.display = 'flex';
    let time = 5;
    const timer = setInterval(() => {
        time--;
        countdown.innerText = time;
        if(time <= 0) clearInterval(timer);
    }, 1000);

    // 2. Call API
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Is line ko check karo aur replace karo:
         const response = await fetch('https://remove-bg-api-v1.onrender.com/remove-bg', {
        method: 'POST',
        body: formData
    });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // 3. Wait for Ad, then show result
        setTimeout(() => {
            adOverlay.style.display = 'none';
            resultArea.style.display = 'block';
            resultImg.src = url;
            
            // Trigger Animation
            document.querySelector('.image-container').classList.add('scanning');
            
            // Download Free Logic
            document.getElementById('dlFree').onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = "bg_removed_1080p.png";
                a.click();
            };

            // 4K Logic (Paused)
            dl4K.onclick = () => {
                alert("Premium 4K Download is currently paused. Please check back later!");
            };

        }, 5000);

    } catch (err) {
        alert("Server Error! Make sure Backend is running.");
        adOverlay.style.display = 'none';
    }
});