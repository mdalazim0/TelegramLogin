const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId'); // ইউজার আইডি এখানে সংগ্রহ হবে

fetch(`/user/${userId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').textContent = data.username;
        document.getElementById('userId').textContent = data.userId;
        document.getElementById('balance').textContent = `$${data.balance}`;
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
