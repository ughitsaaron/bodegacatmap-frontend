import { useRouter } from 'next/router';
import { useMap } from 'react-leaflet';
import { useGetCatsQuery } from '../generated/graphql';
import { EmojiMarker } from './EmojiMarker';

type Props = { emoji?: string };

export function CatMarkersList({ emoji }: Props) {
  const { push } = useRouter();
  const { data } = useGetCatsQuery();
  const map = useMap();

  return (
    <>
      {data?.cats.map((cat) => (
        <EmojiMarker
          emoji={emoji}
          key={cat.id}
          onClick={() => {
            map.panTo([cat.lat, cat.lng], { animate: false });
            push(`/cat/${cat.id}`);
          }}
          position={[cat.lat, cat.lng]}
        />
      ))}
    </>
  );
}
