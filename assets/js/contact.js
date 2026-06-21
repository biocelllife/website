const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "c219ab6d-363c-4377-b464-fb4791802fbb");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Phone number validation and formatting

const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');
const form = document.getElementById('myForm');

// 1. Strict Typing Filter & Real-Time Auto-Formatting
phoneInput.addEventListener('input', function (e) {
    // Strip everything except raw digits
    let digits = e.target.value.replace(/\D/g, '');
    
    // Cap it strictly at 10 digits
    digits = digits.substring(0, 10);

    // Build the formatted string step-by-step as they type
    let formatted = '';
    if (digits.length === 0) {
        formatted = '';
    } else if (digits.length <= 3) {
        formatted = `(${digits}`;
    } else if (digits.length <= 6) {
        formatted = `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
    } else {
        formatted = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
    }

    e.target.value = formatted;

    // Real-time error clearing: If they type a valid 10-digit number, clear errors instantly
    if (digits.length === 10) {
        phoneError.textContent = '';
        phoneInput.setCustomValidity('');
    }
});

// 2. Format Validation Check (When leaving the field or submitting)
function validatePhoneNumber() {
    const digits = phoneInput.value.replace(/\D/g, '');

    if (digits.length === 0) {
        phoneError.textContent = 'Phone number is required.';
        phoneInput.setCustomValidity('Required.');
    } else if (digits.length !== 10) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        phoneInput.setCustomValidity('Invalid.');
    } else {
        phoneError.textContent = '';
        phoneInput.setCustomValidity('');
    }
}

// Run validation when user finishes typing and clicks away
phoneInput.addEventListener('blur', validatePhoneNumber);

// 3. Final Form Submission Safeguard
form.addEventListener('submit', function (e) {
    validatePhoneNumber(); // Force final check

    if (!form.checkValidity()) {
        e.preventDefault(); // Stop form submission if invalid
    }
});
