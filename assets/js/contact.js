alert("JS File is connected successfully!");

// Use a single, matching form ID ('form')
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');

// 1. Strict Typing Filter & Real-Time Auto-Formatting
phoneInput.addEventListener('input', function (e) {
    let digits = e.target.value.replace(/\D/g, '');
    digits = digits.substring(0, 10);

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

    // Instantly clear errors if they hit exactly 10 digits
    if (digits.length === 10) {
        phoneError.textContent = '';
        phoneInput.setCustomValidity('');
    }
});

// 2. Format Validation Check Function
function validatePhoneNumber() {
    const digits = phoneInput.value.replace(/\D/g, '');

    if (digits.length === 0) {
        phoneError.textContent = 'Phone number is required.';
        phoneInput.setCustomValidity('Required.');
        return false;
    } else if (digits.length !== 10) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        phoneInput.setCustomValidity('Invalid.');
        return false;
    } else {
        phoneError.textContent = '';
        phoneInput.setCustomValidity('');
        return true;
    }
}

// Run validation when user clicks out of the phone field
phoneInput.addEventListener('blur', validatePhoneNumber);

// 3. Web3Forms Submission Logic (Merged with Phone Validation)
form.addEventListener('submit', async (e) => {
    // ALWAYS validate the phone number first
    const isPhoneValid = validatePhoneNumber();

    // If the phone or any other HTML required attribute is invalid, stop immediately
    if (!isPhoneValid || !form.checkValidity()) {
        e.preventDefault();
        return; 
    }

    // If valid, prevent the standard HTML page reload and proceed with Web3Forms API
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
