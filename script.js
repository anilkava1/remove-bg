imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show Ad & Start Timer
    adOverlay.style.display = 'flex';
    let time = 5;
    countdown.innerText = time;

    const timer = setInterval(() => {
        time--;
        if (time >= 0) {
            countdown.innerText = time;
        }
        if (time <= 0) {
            clearInterval(timer);
            countdown.innerText = "Processing AI..."; // 0 ke baad ye dikhega
        }
    }, 1000);

    // 2. Call API
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://remove-bg-api-7737.onrender.com/remove-bg', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Backend is waking up...');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // 3. Jab backend se result aa jaye tabhi overlay hatao
        adOverlay.style.display = 'none';
        resultArea.style.display = 'block';
        resultImg.src = url;
        
        document.querySelector('.image-container').classList.add('scanning');
        
        document.getElementById('dlFree').onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = "bg_removed.png";
            a.click();
        };

    } catch (err) {
        console.error(err);
        // Agar 1 minute tak response na aaye toh error dikhao
        alert("Server is waking up. Please try uploading again in 10 seconds.");
        adOverlay.style.display = 'none';
    }
});