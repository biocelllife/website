// Wait for the HTML elements to load fully into memory
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');

    // Safety check: Exit if elements aren't found on the page
    if (!form || !phoneInput || !phoneError) return;

    // 1. Strict Typing Filter & Real-Time Auto-Formatting
    phoneInput.addEventListener('input', function (e) {
        // Track original length and cursor position to prevent jumping
        let cursorPosition = e.target.selectionStart;
        let oldLength = e.target.value.length;

        // Strip everything except raw digits
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

        // Keep the cursor positioned correctly instead of jumping to the end
        let newLength = formatted.length;
        cursorPosition = cursorPosition + (newLength - oldLength);
        e.target.setSelectionRange(cursorPosition, cursorPosition);

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

    // Run validation when user clicks away from the phone field
    phoneInput.addEventListener('blur', validatePhoneNumber);

    // 3. Web3Forms Submission Logic (Merged with Phone Validation)
    form.addEventListener('submit', async (e) => {
        // Run phone validation checks
        const isPhoneValid = validatePhoneNumber();

        // Check overall form validation status (phone check + required dropdown selection)
        if (!isPhoneValid || !form.checkValidity()) {
            e.preventDefault();
            form.reportValidity(); // Directs browser to show native hints if needed
            return; 
        }

        // Complete form is valid, block page refresh and run AJAX request
        e.preventDefault();

        const formData = new FormData(form);
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
});
