export const MovieCard = ({movie, key}) => {
    return (
        <article className="max-w-md group mx-auto mt-4 shadow-md shadow-gray-700 rounded-md duration-300 hover:shadow-red-600" key={movie.id}>
            <a href={movie.id}>
                <img src={movie.poster_url} loading="lazy" alt={movie.title} className="w-full rounded-t-md"/>
                <div className="pt-3 ml-4 mr-2 mb-3">
                    <h3 className="text-xl group-hover:text-red-600 hover-transition font-bold text-gray-100">
                        {movie.title}
                    </h3>
                    <p className="text-gray-100 text-sm mt-1">Age rating: <span className="font-semibold">{movie.age_rating}</span></p>
                </div>
            </a>
        </article>
    )
}
