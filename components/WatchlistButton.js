import { StarIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../utils/api';

export default function WatchlistButton() {
  const { id } = useRouter().query;
  const { data, mutate } = useSWR(`/api/watchlist/${id}`);

  return (
    <Tooltip label={data?.found ? 'Remove from watchlist' : 'Add to watchlist'}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'orange' : 'gray'}
        size="sm"
        onClick={() => {
          mutate(() =>
            fetcher(`/api/watchlist/${id}`, {
              // If movie is in history, remove it from history, else, add it to history
              method: data.found ? 'DELETE' : 'PUT',
            })
          );
        }}
      >
        <StarIcon />
      </IconButton>
    </Tooltip>
  );
}
