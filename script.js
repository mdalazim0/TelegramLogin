const userId = new URLSearchParams(window.location.search).get('userid');

// টেলিগ্রাম API ইউজ করে ডেটা ফেচ করা
const token = '7489104395:AAG4fcBvkqzi9fN9w_cqBXYaPxTBQ0nt1qI'; // এখানে আপনার টেলিগ্রাম বোট টোকেন দিন

fetch(`https://api.telegram.org/bot${token}/getChat?chat_id=${userId}`)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            const user = data.result;
            document.getElementById('first-name').textContent = user.first_name || 'N/A';
            document.getElementById('last-name').textContent = user.last_name || 'N/A';
            document.getElementById('username').textContent = user.username || 'N/A';
            document.getElementById('balance').textContent = '100'; // উদাহরণস্বরূপ
        } else {
            console.error('Error fetching user info:', data.description);
            document.getElementById('user-info').textContent = 'User not found.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('user-info').textContent = 'Error loading user info.';
    });
