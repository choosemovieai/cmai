// script.js
const mockData = [
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        rating: 8.6,
        age_restriction: "PG-13",
        poster_url: "https://example.com/poster.jpg"
    },
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into a target's mind.",
        genres: ["Sci-Fi", "Action", "Thriller"],
        rating: 8.8,
        age_restriction: "PG-13",
        poster_url: "https://example.com/poster2.jpg"
    }
];

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('movieInput').value;
    
    if (!query) {
        alert('Please enter a movie preference!');
        return;
    }

    return displayMovies(mockData); // передаем уже массив mockData напрямую

    // Отправляем запрос на мое API
    // fetch(`https://api.deepseek.com/v1/chat/completions`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer YOUR_DEEPSEEK_API_KEY`  // Вставьте ваш ключ API
    //     },
    //     body: JSON.stringify({
    //         model: "deepseek-v3",  // или другой доступный модель
    //         messages: [
    //             {
    //                 role: "user",
    //                 content: `Find me a movie based on this description: ${query}`
    //             }
    //         ]
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => displayMovies(data.choices[0].message.content))
    //     .catch(error => console.error('Error fetching data:', error));
});

function displayMovies(movies) { // убрал JSON.parse, потому что это уже не строка JSON
    const resultsDiv = document.getElementById('movieResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No movies found. Try a different query!</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const movieImage = document.createElement('img');
        movieImage.src = movie.poster_url || 'default-poster.jpg';  // Default if no poster
        movieImage.alt = movie.title;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        const title = document.createElement('h3');
        title.textContent = movie.title;
        
        const description = document.createElement('p');
        description.textContent = movie.description;

        const genres = document.createElement('p');
        genres.textContent = `Genres: ${movie.genres.join(', ')}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${movie.rating}`;
        rating.classList.add('rating');

        const ageRestriction = document.createElement('p');
        ageRestriction.textContent = `Age: ${movie.age_restriction}`;

        movieInfo.append(title, description, genres, ageRestriction, rating);
        movieDiv.append(movieImage, movieInfo);
        resultsDiv.append(movieDiv);
    });
}
