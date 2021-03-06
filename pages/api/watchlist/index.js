import { fetcher } from '../../../utils/api';
import Watchlist from '../../../models/Watchlist';
import dbConnect from '../../../utils/dbConnect';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    const watchlist = await Watchlist.find().sort({date:"desc"});
    const results=[]
    for(let i=0;i<watchlist.length;i++){
        const id=watchlist[i].id
        const result = await fetcher(getMovieUrl(id));
        results.push(result)
    }
    if (watchlist) {
      res.json(results);
    } else {
      res.json({ found: false });
    }
  }
  else if (method === 'PUT') {
    const movie = await fetcher(getMovieUrl(id));

    const watchlist = new Watchlist({ id, title: movie.title });
    await watchlist.save();

    res.status(200).json({ found: true });
  }
  else if (method === 'DELETE') {
    await Watchlist.deleteOne({ id });
    res.status(200).json({ found: false });
  }
}