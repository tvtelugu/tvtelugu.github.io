    
        fetch('https://raw.githubusercontent.com/tvtelugu/tvtelugu.github.io/refs/heads/main/live/scroll1.json')
            .then(response => response.text())
            .then(data => {
                document.getElementById('marquee').innerHTML = data;
            })
            .catch(error => {
                document.getElementById('error-message').innerText = 'Error loading text file: ' + error;
                new bootstrap.Modal(document.getElementById('errorModal')).show();
            });
    
