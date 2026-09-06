import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import photos from '@/japan/fukuoka/lib/place-photos.json';
import { sitePath } from '@/lib/site-path';
type Photo = {
  src: string;
  width: number;
  height: number;
  caption: string;
  sourceUrl: string;
  credit: string;
};
export default function PlacePhoto({ id }: { id: string }) {
  const photo = (photos as Record<string, Photo>)[id];
  if (!photo) return null;
  return (
    <figure className="place-photo">
      <Image
        src={sitePath(photo.src)}
        alt={photo.caption}
        width={photo.width}
        height={photo.height}
        unoptimized
        loading="lazy"
        className={
          photo.width / photo.height < 1.2 ? 'photo-contain' : undefined
        }
      />
      <figcaption>
        <span>
          {photo.caption}
          <small>{photo.credit}</small>
        </span>
        <a
          href={photo.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={'照片来源：' + photo.credit}
        >
          来源
          <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  );
}
