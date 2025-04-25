document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('benutzerForm');
    const userList = document.getElementById('userList');

    const loadUsers = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = users.map((user, index) => 
            `<li>${user.username} (${user.role}) 
                <button onclick="deleteUser(${index})">Löschen</button>
                <button onclick="toggleStatus(${index})">${user.isActive ? 'Sperren' : 'Entsperren'}</button>
            </li>`
        ).join('');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        const role = form.role.value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password, role, isActive: true });
        localStorage.setItem('users', JSON.stringify(users));
        form.reset();
        loadUsers();
    });

    window.deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    window.toggleStatus = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users[index].isActive = !users[index].isActive;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    loadUsers();
});
