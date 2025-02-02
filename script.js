// script.js

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('movieInput').value;
    
    if (!query) {
        alert('Please enter a movie preference!');
        return;
    }

    fetch(`http://www.omdbapi.com/?t=Interstellar&apikey=free`)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            const movie = {
                title: data.Title,
                description: data.Plot,
                genres: data.Genre.split(", "), // Разделяем жанры по запятой
                rating: data.imdbRating,
                age_restriction: data.Rated, // Возрастной рейтинг из OMDb
                poster_url: data.Poster
            };
            displayMovies(JSON.stringify([movie])); // Оборачиваем в массив, чтобы совместить с форматом
        } else {
            console.error('Error: Movie not found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_TMDB_API_KEY&query=${query}`)
    // .then(response => response.json())
    // .then(data => {
    //     const movies = data.results.map(movie => ({
    //         title: movie.title,
    //         description: movie.overview,
    //         genres: movie.genre_ids, // Нужно преобразовать ID в названия жанров
    //         rating: movie.vote_average,
    //         age_restriction: "N/A", // TMDb не предоставляет возрастной рейтинг напрямую
    //         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    //     }));
    //     displayMovies(JSON.stringify(movies));
    // })
    // .catch(error => console.error('Error fetching data:', error));

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

function displayMovies(moviesJson) {
    const resultsDiv = document.getElementById('movieResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    const movies = JSON.parse(moviesJson);  // Данные, которые я отправляю обратно, должны быть в формате JSON
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
