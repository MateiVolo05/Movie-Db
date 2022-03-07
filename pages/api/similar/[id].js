import { fetcher } from '../../../utils/api';

const getRecomandationsUrl = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  const results = await fetcher(getRecomandationsUrl(req.query.id));

  res.status(200).json(results);
}