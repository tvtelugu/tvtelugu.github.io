    function toggleLyrics() {
        const lyricsContainer = document.getElementById("lyrics-container");
        lyricsContainer.style.display = lyricsContainer.style.display === "flex" ? "none" : "flex";
    }

    const queries = [
        'Telugu', 'SBP', 'Devi Sri Prasad', 'Mani Sharma','Anoop Rubens',
        'S. P. Balasubrahmanyam', 'Ilaiyaraaja', 'K.J. Yesudas', 'M. M. Keeravani',
        'Annamayya Keerthana', 'G.V. Prakash Kumar', 'Anurag Kulkarni', 'Mahesh Babu',
        'Thaman S', 'Ram Miriyala', 'Bheems Ceciroleo', 'Yuvan Shankar Raja',
        'Ramajogayya Sastry','balagam', 'latest telugu', 'telugu folk', 'new telugu remix'
    ];

    let audio = document.getElementById("audio");
    let playIcon = document.getElementById("play-icon");
    let songList = document.getElementById("song-list");
    let progressBar = document.getElementById("progress-bar");
    let timeDisplay = document.getElementById("time-display");
    let qualitySelect = document.getElementById("quality-select");
    let currentSongIndex = 0;
    let songs = []; // Store song data from API response
    let currentQuality = "160"; // Default to 160 kbps

    // Auto-fetch random query and play the first song on page load
    window.onload = async function () {
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        await searchSongs(randomQuery);
        document.getElementById("loader").classList.add('hide-loader');
        document.getElementById("content").classList.remove('hide-loader');
    };

    // Fetch songs based on search query
    async function searchSongs(query) {
        if (!query) return;

        let url = `https://saavn.dev/api/search/songs?query=${query}&page=1&limit=50`;
        const response = await fetch(url);
        const data = await response.json();
        songs = data.data.results;
        updateSongList();
    }

    // Fetch lyrics for the song and handle smart scrolling
    async function fetchLyrics(songId) {
        const url = `https://saavn.dev/api/songs/${songId}/lyrics`;
        const response = await fetch(url);
        const data = await response.json();

        const lyricsContainer = document.getElementById("lyrics-container");
        const lyricsText = document.getElementById("lyrics-text");

        if (data.data) {
            const lyrics = data.data.lyrics.split('\n');
            let formattedLyrics = lyrics.map((line, index) => 
                `<p class="lyrics-line" id="line-${index}">${line}</p>`
            ).join('');
            lyricsText.innerHTML = formattedLyrics;
            lyricsContainer.style.display = 'block';

            // Initialize the first line as highlighted
            highlightCurrentLine(0);
        } else {
            lyricsText.innerText = 'Lyrics not available.';
            lyricsContainer.style.display = 'none';
        }
    }

    // Highlight the current line based on the song's current time
    function highlightCurrentLine(lineIndex) {
        const lines = document.querySelectorAll('.lyrics-line');

        // Remove highlight from all lines
        lines.forEach(line => line.classList.remove('highlight'));

        // Add highlight to the current line
        const currentLine = lines[lineIndex];
        if (currentLine) {
            currentLine.classList.add('highlight');
            scrollToLine(currentLine);
        }
    }

    // Scroll to the current line
    function scrollToLine(line) {
        const lyricsContainer = document.getElementById("lyrics-container");
        const offsetTop = line.offsetTop;
        const lineHeight = line.offsetHeight;

        // Adjust scroll position to center the current line in the container
        lyricsContainer.scrollTop = offsetTop - (lyricsContainer.offsetHeight / 2) + (lineHeight / 2);
    }

    // Update the highlighted line and scroll as the song progresses
    audio.ontimeupdate = function () {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Determine which line to highlight based on the current time of the song
        const currentTimeInSeconds = Math.floor(audio.currentTime);
        const lyricsLines = document.querySelectorAll('.lyrics-line');
        let lineIndex = 0;

        // Find the line corresponding to the current time
        for (let i = 0; i < lyricsLines.length; i++) {
            const line = lyricsLines[i];
            const lineTime = parseInt(line.getAttribute('data-time'), 10); // Assuming each line has a data-time attribute
            if (lineTime <= currentTimeInSeconds) {
                lineIndex = i;
            }
        }

        highlightCurrentLine(lineIndex);
    };

    // Update song list dropdown
    function updateSongList() {
        songList.innerHTML = "<option value=''>Select a song</option>";
        songs.forEach((song, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.innerHTML = song.name;
            songList.appendChild(option);
        });

        if (songs.length > 0) {
            currentSongIndex = 0;
            loadSong();
            audio.play();
        }
    }

    // Play selected song
    function playSong() {
        if (songList.value !== "") {
            currentSongIndex = songList.value;
            loadSong();
            audio.play();
        }
    }

    // Load song info
    function loadSong() {
        const song = songs[currentSongIndex];
        const selectedQuality = qualitySelect.value;
        const qualityUrl = song.downloadUrl.find(url => url.quality === `${selectedQuality}kbps`).url;

        audio.src = qualityUrl;
       // Remove quotes and HTML entities from song name, artist name, and album name
        document.getElementById("song-name").innerText = removeQuotes(song.name);
        document.getElementById("song-artist").innerText = removeQuotes(song.artists.primary[0].name);
        document.getElementById("album-name").innerText = removeQuotes(song.album.name);
        document.getElementById("album-poster").style.backgroundImage = `url(${song.image[2].url})`;
        playIcon.innerText = "pause";

        // Fetch lyrics
        fetchLyrics(song.id);
    }
       
// Function to decode HTML entities and remove quotes
function decodeHtmlEntities(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value; // This decodes HTML entities
}

// Function to remove quotes after decoding HTML entities
function removeQuotes(str) {
    const decodedStr = decodeHtmlEntities(str); // Decode the HTML entities
    return decodedStr.replace(/"/g, ''); // Remove the actual quotes
}


    // Toggle play/pause
    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playIcon.innerText = "pause";
        } else {
            audio.pause();
            playIcon.innerText = "play_arrow";
        }
    }

    // Seek song based on progress bar
    function seekSong() {
        const seekTo = audio.duration * (progressBar.value / 100);
        audio.currentTime = seekTo;
    }

    // Update progress bar as song plays
    audio.ontimeupdate = function () {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Switch audio quality
    function changeQuality() {
        if (audio.src) {
            loadSong();
            audio.play();
        }
    }

    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong();
        audio.play();
    }

    // Next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong();
        audio.play();
    }

    // Shuffle playlist
    function shufflePlaylist() {
        songs.sort(() => Math.random() - 0.5);
        updateSongList();
    }

 //downloadAudio function
    function downloadAudio() {
    const song = songs[currentSongIndex];
    if (!song) return;

    const audioUrl = song.downloadUrl.find(url => url.quality === `${currentQuality}kbps`).url;
    fetch(audioUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch audio.');
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${removeQuotes(song.name)}.mp3`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading audio:', error));
}

    // Automatically play the next song when the current song ends
    audio.addEventListener('ended', function () {
        nextSong(); // Automatically play the next song when the current song ends
    });
</script>
