// URL থেকে userid প্যারামিটার নেওয়া
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userid');

// ইউজার তথ্য ফেচ করা
fetch(`https://mdalazim0.github.io/TelegramLogin/user/${userId}`) // গিটহাব URL ব্যবহার করুন
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // HTML আইডি অনুযায়ী ডেটা আপডেট করা
        document.getElementById('username').textContent = data.username || 'N/A';
        document.getElementById('userId').textContent = data.userId || 'N/A';
        document.getElementById('balance').textContent = `$${data.balance || 0}`;
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
        document.getElementById('username').textContent = 'Error loading user info';
        document.getElementById('userId').textContent = 'N/A';
        document.getElementById('balance').textContent = '$0';
    });
