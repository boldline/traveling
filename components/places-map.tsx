'use client';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { Expand, MapPinned, Navigation, RotateCw } from 'lucide-react';

export type MapPlace = {
  id: string;
  name: string;
  city: string;
  query: string;
  lat: number;
  lng: number;
  source: string;
  number: string;
  detailId: string;
  note?: string;
  alternative?: boolean;
};
export type MapFocus = { id: string } | null;
const navigation = (p: MapPlace) =>
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(p.query);

export default function PlacesMap({
  id,
  title,
  places,
  focus,
}: {
  id: string;
  title: string;
  places: MapPlace[];
  focus: MapFocus;
}) {
  const container = useRef<HTMLElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Record<string, Marker>>({});
  const pendingFocus = useRef<MapFocus>(null);
  const [enabled, setEnabled] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'partial' | 'error'
  >('loading');

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    pendingFocus.current = focus;
    if (focus && map.current) {
      const marker = markers.current[focus.id];
      if (marker) {
        map.current.setView(marker.getLatLng(), 16, { animate: false });
        marker.openPopup();
      }
    }
  }, [focus]);

  useEffect(() => {
    if (!enabled || !container.current) return;
    const element = container.current;
    let disposed = false;
    let instance: LeafletMap | undefined;
    let resize: ResizeObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    void import('leaflet')
      .then((L) => {
        if (disposed) return;
        const m = L.map(element, {
          scrollWheelZoom: false,
          zoomControl: false,
          zoomAnimation: false,
          fadeAnimation: false,
          markerZoomAnimation: false,
        });
        instance = m;
        map.current = m;
        L.control
          .zoom({ zoomInTitle: '放大地图', zoomOutTitle: '缩小地图' })
          .addTo(m);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(m);
        m.attributionControl.setPrefix(false);
        let loaded = 0,
          failed = 0;
        const tiles = L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
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
        timeout = setTimeout(() => {
          if (!disposed && !loaded) setStatus('error');
        }, 15000);
        places.forEach((p) => {
          const popup = document.createElement('div');
          popup.className = 'route-popup place-popup';
          const title = document.createElement('strong');
          title.textContent = p.number + ' · ' + p.name;
          popup.appendChild(title);
          const note = document.createElement('p');
          note.textContent = p.city + ' · ' + (p.note || p.query);
          popup.appendChild(note);
          const detail = document.createElement('a');
          detail.href = '#' + p.detailId;
          detail.textContent = '查看照片与明细 ↓';
          detail.addEventListener('click', () => {
            const card = document.getElementById(p.detailId);
            const collapsed = card?.closest('details');
            if (collapsed) collapsed.open = true;
            m.closePopup();
          });
          popup.appendChild(detail);
          const link = document.createElement('a');
          link.href = navigation(p);
          link.textContent = '地图导航 ↗';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          popup.appendChild(link);
          const source = document.createElement('a');
          source.href = p.source;
          source.textContent = '位置来源 ↗';
          source.className = 'route-location-source';
          source.target = '_blank';
          source.rel = 'noopener noreferrer';
          popup.appendChild(source);
          const icon = L.divIcon({
            className: 'route-marker-shell',
            html:
              '<span class="route-marker place-marker' +
              (p.alternative ? ' route-marker-optional' : '') +
              '">' +
              p.number +
              '</span>',
            iconSize: [38, 38],
            iconAnchor: [19, 19],
          });
          markers.current[p.id] = L.marker([p.lat, p.lng], {
            icon,
            title: p.number + ' ' + p.name,
            alt: p.name,
            keyboard: true,
          })
            .bindPopup(popup, { maxWidth: 280 })
            .bindTooltip(p.name, { direction: 'top', offset: [0, -14] })
            .addTo(m);
        });
        const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
        m.fitBounds(bounds, { padding: [35, 35], maxZoom: 15, animate: false });
        if (pendingFocus.current) {
          const marker = markers.current[pendingFocus.current.id];
          if (marker) {
            m.setView(marker.getLatLng(), 16, { animate: false });
            marker.openPopup();
          }
        }
        resize = new ResizeObserver(() => {
          if (!disposed) m.invalidateSize({ pan: false });
        });
        resize.observe(element);
      })
      .catch(() => {
        if (!disposed) setStatus('error');
      });
    return () => {
      disposed = true;
      if (timeout) clearTimeout(timeout);
      resize?.disconnect();
      instance?.remove();
      map.current = null;
      markers.current = {};
    };
  }, [enabled, attempt, places]);

  function fit(city?: string) {
    const ps = city ? places.filter((p) => p.city === city) : places;
    map.current?.closePopup();
    map.current?.fitBounds(
      ps.map((p) => [p.lat, p.lng]),
      { padding: [35, 35], maxZoom: 15, animate: false },
    );
  }
  function locate(p: MapPlace) {
    if (!map.current) return;
    map.current.setView([p.lat, p.lng], 16, { animate: false });
    markers.current[p.id]?.openPopup();
  }
  return (
    <section className="daily-map places-map" id={id} aria-label={title}>
      <div className="daily-map-heading">
        <div>
          <MapPinned size={20} />
          <h3>{title}</h3>
        </div>
        <button type="button" onClick={() => fit()}>
          <Expand size={16} />
          查看全部
        </button>
      </div>
      <div className="places-map-toolbar">
        <p>{places.length} 个地点 · 编号对应下方明细</p>
        <div aria-label="放大城市范围">
          {['福冈', '由布院', '别府'].map((city) => (
            <button type="button" key={city} onClick={() => fit(city)}>
              放大{city}
            </button>
          ))}
        </div>
      </div>
      <div className="daily-map-canvas-wrap">
        <section
          ref={container}
          className="daily-map-canvas"
          aria-label="地点地图，可拖动、缩放和点击编号"
        />
        {status === 'loading' && (
          <output className="map-status">正在加载地图…</output>
        )}
      </div>
      {(status === 'error' || status === 'partial') && (
        <output className="map-error">
          <span>
            地图底图{status === 'partial' ? '部分' : '暂时'}
            无法加载，下方导航仍可使用。
          </span>
          <button
            type="button"
            onClick={() => {
              setStatus('loading');
              setAttempt((n) => n + 1);
            }}
          >
            <RotateCw size={14} />
            重试
          </button>
        </output>
      )}
      {places.some((p) => p.alternative) && (
        <p className="places-map-key">
          <span />
          主方案酒店 <span className="alternative-key" />
          备选酒店
        </p>
      )}
      <ol className="map-stop-list">
        {places.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={p.alternative ? 'optional-stop' : ''}
              onClick={() => locate(p)}
              aria-label={'在地图中查看' + p.name}
            >
              <b>{p.number}</b>
              <span>
                {p.name}
                <em>
                  {p.city}
                  {p.alternative ? ' · 备选' : ''}
                </em>
              </span>
            </button>
            <a
              href={navigation(p)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={'导航到' + p.name}
            >
              <Navigation size={15} />
            </a>
          </li>
        ))}
      </ol>
      <p className="map-disclaimer">
        地图标注建筑或场所位置；店铺楼层、酒店入口请同时查看明细与导航。
      </p>
    </section>
  );
}
