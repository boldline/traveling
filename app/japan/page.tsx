import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Compass } from 'lucide-react';
import { destinations } from '@/japan/destinations';
import { sitePath } from '@/lib/site-path';
import LegacyJapanLink from '@/japan/legacy-link';
import './directory.css';

export default function JapanDirectory() {
  return (
    <div className="atlas-page">
      <LegacyJapanLink />
      <header className="atlas-header">
        <Link className="atlas-brand" href="/">
          <Compass size={29} />
          <span>
            TRAVELING<small>我的旅行地图</small>
          </span>
        </Link>
        <Link className="atlas-header-link" href="/">
          返回世界地图 <ArrowUpRight size={17} />
        </Link>
      </header>
      <main className="japan-directory">
        <div className="atlas-title">
          <div>
            <span>JAPAN</span>
            <h1>日本旅行攻略</h1>
          </div>
          <p>{destinations.length} 个目的地</p>
        </div>
        <p className="directory-intro">
          按目的地打开旅行手册，查看每日路线、酒店、美食和交通。
        </p>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <article className="destination-card" key={destination.slug}>
              <Image
                src={sitePath(destination.photo.src)}
                alt={destination.photo.caption}
                width={destination.photo.width}
                height={destination.photo.height}
                unoptimized
              />
              <div className="destination-body">
                <span>{destination.label}</span>
                <h2>{destination.name}</h2>
                <p>{destination.summary}</p>
                <p className="destination-date">{destination.dates}</p>
                <Link className="atlas-open-trip" href={destination.href}>
                  打开{destination.city}攻略 <ArrowUpRight size={18} />
                </Link>
                <a
                  className="destination-credit"
                  href={destination.photo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  照片来源：{destination.photo.credit} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
