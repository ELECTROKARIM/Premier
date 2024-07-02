
document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.github.com/users';

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            var users = JSON.parse(xhr.responseText);
            displayUsers(users);
        } else {
            console.error('Error fetching GitHub users:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();

    function displayUsers(users) {
        var container = document.getElementById('users-container');

        users.forEach(function(user) {
            var userCard = document.createElement('div');
            userCard.classList.add('user-card');

            var avatar = document.createElement('div');
            avatar.classList.add('user-avatar');
            avatar.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}">`;

            var login = document.createElement('p');
            login.textContent = user.login;
            login.classList.add('user-login');

            userCard.appendChild(avatar);
            userCard.appendChild(login);

            container.appendChild(userCard);
        });
    }

    document.getElementById('search-button').addEventListener('click', function() {
        var username = document.getElementById('search-input').value;
        if (username) {
            window.open('https://github.com/' + username, '_blank');
        }
    });

    document.getElementById('search-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
});
