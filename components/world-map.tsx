'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Map as LeafletMap, Marker } from 'leaflet';
import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  Globe2,
  LocateFixed,
  MapPin,
  RotateCw,
} from 'lucide-react';
import { Button } from '@/japan/fukuoka/components/ui/button';
import photos from '@/japan/fukuoka/lib/place-photos.json';
import { sitePath } from '@/lib/site-path';

// Fukuoka is represented by Hakata Station, the start/end hub of this trip.
// Coordinate source: https://www.openstreetmap.org/way/72653571
const destination = {
  lat: 33.5900413,
  lng: 130.4199026,
  name: '日本 · 福冈',
  href: '/japan/fukuoka/',
};
const worldBounds: [[number, number], [number, number]] = [
  [-60, -180],
  [78, 180],
];

export default function WorldMap() {
  const container = useRef<HTMLElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const marker = useRef<Marker | null>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'partial' | 'error'
  >('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    // Preserve bookmarks from the original one-page travel guide.
    if (
      /^#(?:journey|stays|food|transport|essentials|hotel-map|food-map|hotel-[a-z-]+|food-[a-z-]+|day-[1-7])$/.test(
        window.location.hash,
      )
    ) {
      window.location.replace(sitePath('/japan/fukuoka/') + window.location.hash);
      return;
    }
    if (!container.current) return;
    const element = container.current;
    let disposed = false;
    let instance: LeafletMap | undefined;
    let resize: ResizeObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    void import('leaflet')
      .then((L) => {
        if (disposed) return;
        const m = L.map(element, {
          zoomControl: false,
          scrollWheelZoom: false,
          minZoom: 0,
          maxZoom: 18,
          zoomAnimation: false,
          fadeAnimation: false,
          markerZoomAnimation: false,
        });
        instance = m;
        map.current = m;
        L.control
          .zoom({
            position: 'topright',
            zoomInTitle: '放大地图',
            zoomOutTitle: '缩小地图',
          })
          .addTo(m);
        L.control.scale({ imperial: false, position: 'bottomright' }).addTo(m);
        m.attributionControl.setPrefix(false);
        let loaded = 0,
          failed = 0;
        const tiles = L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            noWrap: true,
            maxZoom: 19,
            referrerPolicy: 'strict-origin-when-cross-origin',
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
          },
        );
        tiles.on('tileload', () => {
          loaded++;
          if (!disposed) setStatus(failed ? 'partial' : 'ready');
        });
        tiles.on('tileerror', () => {
          failed++;
          if (!disposed) setStatus(loaded ? 'partial' : 'error');
        });
        tiles.addTo(m);
        timer = setTimeout(() => {
          if (!disposed && !loaded) setStatus('error');
        }, 15000);
        const popup = document.createElement('div');
        popup.className = 'atlas-popup';
        const title = document.createElement('strong');
        title.textContent = destination.name;
        popup.appendChild(title);
        const text = document.createElement('p');
        text.textContent = '2026.09.25 — 10.01 · 九州亲子 7 日';
        popup.appendChild(text);
        const link = document.createElement('a');
        link.href = sitePath(destination.href);
        link.textContent = '打开福冈旅行手册 ↗';
        popup.appendChild(link);
        const icon = L.divIcon({
          className: 'atlas-marker-shell',
          html: '<span class="atlas-marker-dot"></span><span class="atlas-marker-label"><b>福冈</b><small>JAPAN · 九州亲子 7 日</small></span>',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
        marker.current = L.marker([destination.lat, destination.lng], {
          icon,
          keyboard: true,
          title: '福冈：点击查看日本九州亲子行程',
          alt: '日本福冈旅行目的地',
        })
          .bindPopup(popup, { maxWidth: 280 })
          .addTo(m);
        m.fitBounds(worldBounds, {
          padding: [22, 22],
          maxZoom: 3,
          animate: false,
        });
        resize = new ResizeObserver(() => {
          if (!disposed) m.invalidateSize({ pan: false });
        });
        resize.observe(element);
        setReady(true);
      })
      .catch(() => {
        if (!disposed) setStatus('error');
      });
    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      resize?.disconnect();
      instance?.remove();
      map.current = null;
      marker.current = null;
    };
  }, [attempt]);
  function focusFukuoka() {
    map.current?.setView([destination.lat, destination.lng], 7, {
      animate: false,
    });
    marker.current?.openPopup();
  }
  return (
    <div className="atlas-page">
      <header className="atlas-header">
        <Link
          className="atlas-brand"
          href="/"
          aria-label="Traveling 世界地图首页"
        >
          <Compass size={29} />
          <span>
            TRAVELING<small>我的旅行地图</small>
          </span>
        </Link>
        <Link className="atlas-header-link" href="/japan/">
          日本攻略目录
          <ArrowUpRight size={17} />
        </Link>
      </header>
      <main className="atlas-main">
        <div className="atlas-title">
          <div>
            <span>WORLD MAP</span>
            <h1>下一站，日本福冈</h1>
          </div>
          <p>
            <span />1 个旅行计划
          </p>
        </div>
        <section className="atlas-map-panel" aria-label="世界地图与旅行计划">
          <div className="atlas-map-controls">
            <Button
              variant="outline"
              className="atlas-control"
              disabled={!ready}
              onClick={() =>
                map.current?.fitBounds(worldBounds, {
                  padding: [22, 22],
                  maxZoom: 3,
                  animate: false,
                })
              }
            >
              <Globe2 size={17} />
              全世界
            </Button>
            <Button
              variant="outline"
              className="atlas-control"
              disabled={!ready}
              onClick={focusFukuoka}
            >
              <LocateFixed size={17} />
              定位福冈
            </Button>
          </div>
          <section
            ref={container}
            className="atlas-map"
            aria-label="真实世界地图，可拖动缩放；福冈标记可以打开旅行手册"
          />
          {status === 'loading' && (
            <output className="atlas-loading">正在加载世界地图…</output>
          )}
          {(status === 'error' || status === 'partial') && (
            <output className="atlas-error">
              <span>
                地图底图{status === 'partial' ? '部分' : '暂时'}
                未加载，可以直接打开日本行程。
              </span>
              <Button
                variant="outline"
                onClick={() => {
                  setReady(false);
                  setStatus('loading');
                  setAttempt((n) => n + 1);
                }}
              >
                <RotateCw size={14} />
                重试
              </Button>
            </output>
          )}
          <article className="atlas-trip-card">
            <figure>
              <Image
                src={sitePath(photos.miyako.src)}
                alt={photos.miyako.caption}
                width={photos.miyako.width}
                height={photos.miyako.height}
                unoptimized
              />
              <figcaption>
                <a
                  href={photos.miyako.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  福冈 · 都酒店博多 / 照片来源 ↗
                </a>
              </figcaption>
            </figure>
            <div className="atlas-trip-body">
              <span className="atlas-country">
                <MapPin size={15} />
                日本 JAPAN
              </span>
              <h2>福冈 · 九州慢旅</h2>
              <p className="atlas-trip-route">福冈 → 由布院 → 别府 → 福冈</p>
              <p className="atlas-trip-date">
                <CalendarDays size={16} />
                2026.09.25 — 10.01<span>7 天 6 晚</span>
              </p>
              <Link className="atlas-open-trip" href={destination.href}>
                打开福冈旅行手册
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </article>
        </section>
        <footer className="atlas-footer">
          <p>点击福冈标记，查看每日路线、酒店、美食与交通。</p>
          <a
            href="https://www.openstreetmap.org/way/72653571"
            target="_blank"
            rel="noopener noreferrer"
          >
            福冈标记位置：博多站
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </main>
    </div>
  );
}
