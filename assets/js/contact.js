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

// Auto-format while typing
phoneInput.addEventListener('input', function (e) {
    // Strip everything except numbers
    let digits = e.target.value.replace(/\D/g, '');

    // Limit to 10 digits
    digits = digits.substring(0, 10);

    let formatted = '';

    if (digits.length > 0) {
        formatted = '(' + digits.substring(0, 3);
    }

    if (digits.length >= 3) {
        formatted = '(' + digits.substring(0, 3) + ')';
    }

    if (digits.length > 3) {
        formatted += ' ' + digits.substring(3, 6);
    }

    if (digits.length > 6) {
        formatted += '-' + digits.substring(6, 10);
    }

    e.target.value = formatted;
});

// Validate when leaving field
phoneInput.addEventListener('blur', function () {
    const digits = this.value.replace(/\D/g, '');

    if (digits.length === 0) {
        phoneError.textContent = 'Phone number is required.';
        this.setCustomValidity('Phone number is required.');
    } else if (digits.length !== 10) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        this.setCustomValidity('Invalid phone number.');
    } else {
        phoneError.textContent = '';
        this.setCustomValidity('');
    }
});