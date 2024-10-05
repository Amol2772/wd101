
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesBody = document.getElementById('entriesBody');
    entriesBody.innerHTML = ''; 

    entries.forEach((entry, index) => {
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


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

    
    saveEntry(name, email, password, dob, termsAccepted);

    
    this.reset();
});


document.addEventListener('DOMContentLoaded', loadEntries);
