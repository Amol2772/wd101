function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesBody = document.getElementById('entriesBody');
    entriesBody.innerHTML = ''; 

    entries.forEach((entry) => {
        const row = document.createElement('tr');

        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        entriesBody.appendChild(row);
    });
}

function saveEntry(name, email, password, dob, termsAccepted) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const newEntry = { name, email, password, dob, termsAccepted };
    entries.push(newEntry);
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();
}

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

    const age = calculateAge(dob);
    const ageError = document.getElementById('ageError');

    // Clear previous error message
    ageError.textContent = '';

    // Validate age between 18 and 55
    if (age < 18 || age > 55) {
        ageError.textContent = 'Age must be between 18 and 55 years.';
        return;
    }

    saveEntry(name, email, password, dob, termsAccepted);
    this.reset();
});

if (typeof(Storage) === "undefined") {
    alert("Local storage is not supported in this browser.");
}

document.addEventListener('DOMContentLoaded', loadEntries);
