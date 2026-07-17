let currentOTP = ""; 
let currentType = ""; // Keeps track of if they chose Email or Phone

function showInput(type) {
    currentType = type; // Store the choice
    document.getElementById('step-0').style.display = 'none';
    const step1 = document.getElementById('step-1');
    step1.style.display = 'block';
    step1.classList.add('fade-in');

    document.getElementById('user-input').placeholder = `Enter your ${type}`;
    document.getElementById('input-label').innerText = type;
}

function handleSend() {
    const userInput = document.getElementById('user-input').value.trim();

    // --- VALIDATION LOGIC ---
    if (currentType === 'Email') {
        // Checks for @ and at least one dot
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
            alert("Dumbass Invalid Format: Please enter a valid Email address containing '@'.");
            return;
        }
    } else if (currentType === 'Phone Number') {
        // Removes any spaces or dashes to check length
        const cleanPhone = userInput.replace(/\D/g, "");
        // Checks for 10 digits + 2 digits for country code (12 total)
        if (cleanPhone.length < 12) {
            alert("Dumbass Invalid Format: Use country code + 10 digit number (e.g., +919876543210)");
            return;
        }
    }

    // --- TRANSITION TO OTP ---
    document.getElementById('step-1').style.display = 'none';
    const step2 = document.getElementById('step-2');
    step2.style.display = 'block';
    step2.classList.add('fade-in');

    currentOTP = Math.floor(100000 + Math.random() * 900000).toString();

    document.getElementById('sent-text').innerHTML = 
        `we have sent the OTP <b style="color:var(--cyan)">${currentOTP}</b> to <b style="color:var(--purple)">${userInput}</b>`;
}

function handleVerify() {
    const enteredCode = document.getElementById('otp-input').value;

    if (enteredCode === currentOTP) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; 
    } else {
        alert("Bitch! Verification Mismatch: Connection Reset.");
        location.reload();
    }
}