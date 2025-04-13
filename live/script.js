    
        fetch('https://api.jsonstorage.net/v1/json/fb951061-1e19-4471-8529-e237adf98d50/686fd633-1b7a-4864-833f-5b69e52b040b')
            .then(response => response.text())
            .then(data => {
                document.getElementById('marquee').innerHTML = data;
            })
            .catch(error => {
                document.getElementById('error-message').innerText = 'Error loading text file: ' + error;
                new bootstrap.Modal(document.getElementById('errorModal')).show();
            });
    
