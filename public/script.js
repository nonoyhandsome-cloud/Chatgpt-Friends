const apiUrl = '/api/friends';

// Load friends on page startup
document.addEventListener('DOMContentLoaded', fetchFriends);

async function fetchFriends() {
    const search = document.getElementById('search-input').value;
    const response = await fetch(`${apiUrl}?search=${search}`);
    const friends = await response.json();
    
    const tableBody = document.getElementById('friends-table-body');
    tableBody.innerHTML = '';

    friends.forEach(friend => {
        tableBody.innerHTML += `
            <tr>
                <td>${friend.name}</td>
                <td>${friend.email}</td>
                <td>${friend.phone}</td>
                <td>${friend.website}</td>
                <td>
                    <button class="edit-btn" onclick="editFriend(${friend.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteFriend(${friend.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function saveFriend() {
    const id = document.getElementById('friend-id').value;
    const friendData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value
    };

    if (id) {
        // Update
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(friendData)
        });
    } else {
        // Create
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(friendData)
        });
    }

    resetForm();
    fetchFriends();
}

async function editFriend(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const friend = await response.json();

    document.getElementById('friend-id').value = friend.id;
    document.getElementById('name').value = friend.name;
    document.getElementById('email').value = friend.email;
    document.getElementById('phone').value = friend.phone;
    document.getElementById('website').value = friend.website;

    document.getElementById('form-title').innerText = 'Edit Friend';
    document.getElementById('cancel-btn').style.display = 'inline-block';
}

async function deleteFriend(id) {
    if (confirm('Are you sure?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchFriends();
    }
}

function resetForm() {
    document.getElementById('friend-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('website').value = '';
    document.getElementById('form-title').innerText = 'Add Friend';
    document.getElementById('cancel-btn').style.display = 'none';
}