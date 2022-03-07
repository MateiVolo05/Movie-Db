import { fetcher } from '../../../../utils/api';
const getSearchMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl(req.query.id));
  const items=[]
  if(results.results[req.query.ln]["flatrate"]===undefined){
    results.results[req.query.ln]["flatrate"]="";
  }
  if(results.results[req.query.ln]["buy"]===undefined){
    results.results[req.query.ln]["buy"]="";
  }
  if(results.results[req.query.ln]["rent"]===undefined){
    results.results[req.query.ln]["rent"]="";
  }
  items.push(...results.results[req.query.ln]["flatrate"], ...results.results[req.query.ln]["buy"], ...results.results[req.query.ln]["rent"])
  res.json(items)
}