document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mitteilungForm');
    const mitteilungList = document.getElementById('mitteilungList');

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        mitteilungList.innerHTML = messages.map(msg => `<li>${msg.title}: ${msg.message}</li>`).join('');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.title.value;
        const message = form.message.value;
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ title, message });
        localStorage.setItem('messages', JSON.stringify(messages));
        form.reset();
        loadMessages();
    });

    loadMessages();
});
