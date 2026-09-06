'use client';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker, LatLngBounds } from 'leaflet';
import {
  MapPinned,
  Expand,
  Navigation,
  RotateCw,
  ExternalLink,
} from 'lucide-react';
import { dayRoutes, routePoints, type RoutePoint } from '@/japan/lib/routes';
const googleMap = (p: RoutePoint) =>
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(p.query);
export default function DayRouteMap({ dayIndex }: { dayIndex: number }) {
  const container = useRef<HTMLElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const boundsRef = useRef<LatLngBounds | null>(null);
  const markers = useRef<Record<string, Marker>>({});
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'partial' | 'error'
  >('loading');
  const [attempt, setAttempt] = useState(0);
  const route = dayRoutes[dayIndex];
  const unique = [...new Set(route.stops.map((s) => s.id))];
  useEffect(() => {
    if (!container.current) return;
    const element = container.current;
    let disposed = false;
    let current: LeafletMap | undefined;
    let observer: ResizeObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    void import('leaflet')
      .then((L) => {
        if (disposed) return;
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        const map = L.map(element, {
          scrollWheelZoom: false,
          zoomControl: false,
          attributionControl: true,
          zoomAnimation: !reduced,
          fadeAnimation: !reduced,
          markerZoomAnimation: !reduced,
        });
        current = map;
        mapRef.current = map;
        L.control
          .zoom({ zoomInTitle: '放大地图', zoomOutTitle: '缩小地图' })
          .addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
        map.attributionControl.setPrefix(false);
        let loaded = 0,
          failed = 0;
        const tiles = L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
            referrerPolicy: 'strict-origin-when-cross-origin',
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
        tiles.addTo(map);
        timeout = setTimeout(() => {
          if (!disposed && !loaded) setStatus('error');
        }, 15000);
        route.stops.slice(1).forEach((stop, i) => {
          const from = routePoints[route.stops[i].id],
            to = routePoints[stop.id];
          if (from === to) return;
          const optional = stop.optional || route.stops[i].optional;
          L.polyline(
            [
              [from.lat, from.lng],
              [to.lat, to.lng],
            ],
            {
              color: optional ? '#b87921' : '#1b6157',
              weight: 4,
              opacity: 0.85,
              dashArray:
                stop.mode === 'train' ? '9 7' : optional ? '3 7' : '2 5',
              lineCap: 'round',
            },
          )
            .bindTooltip(
              stop.mode === 'train'
                ? '铁路段 · 方向示意'
                : optional
                  ? '可选停靠 · 顺序示意'
                  : '按游览顺序连线',
            )
            .addTo(map);
        });
        [...new Set(route.stops.map((s) => s.id))].forEach((id) => {
          const p = routePoints[id];
          const visits = route.stops.flatMap((s, i) =>
            s.id === id ? [i + 1] : [],
          );
          const optional = route.stops
            .filter((s) => s.id === id)
            .every((s) => s.optional);
          const label = visits.join('·');
          const markerWidth = label.length > 3 ? 54 : 34;
          const icon = L.divIcon({
            className: 'route-marker-shell',
            html:
              '<span class="route-marker' +
              (optional ? ' route-marker-optional' : '') +
              '">' +
              label +
              '</span>',
            iconSize: [markerWidth, 34],
            iconAnchor: [markerWidth / 2, 17],
          });
          const popup = document.createElement('div');
          popup.className = 'route-popup';
          const title = document.createElement('strong');
          title.textContent = label + ' · ' + p.name;
          popup.appendChild(title);
          const subtitle = document.createElement('p');
          subtitle.textContent = p.query;
          popup.appendChild(subtitle);
          const note = document.createElement('p');
          note.textContent = route.stops
            .filter((s) => s.id === id)
            .map((s) => s.note)
            .filter(Boolean)
            .join(' / ');
          if (note.textContent) popup.appendChild(note);
          const link = document.createElement('a');
          link.textContent = '打开地图导航 ↗';
          link.href = googleMap(p);
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          popup.appendChild(link);
          const source = document.createElement('a');
          source.textContent = '位置来源 ↗';
          source.href = p.source;
          source.target = '_blank';
          source.rel = 'noopener noreferrer';
          source.className = 'route-location-source';
          popup.appendChild(source);
          const marker = L.marker([p.lat, p.lng], {
            icon,
            title: label + ' ' + p.name,
            alt: label + ' ' + p.name,
            keyboard: true,
          })
            .bindPopup(popup, { maxWidth: 260 })
            .addTo(map);
          marker.bindTooltip(p.name, { direction: 'top', offset: [0, -12] });
          markers.current[id] = marker;
        });
        const bounds = L.latLngBounds(
          route.stops.map((s) => [
            routePoints[s.id].lat,
            routePoints[s.id].lng,
          ]),
        );
        boundsRef.current = bounds;
        const fit = () =>
          map.fitBounds(bounds, {
            padding: [32, 32],
            maxZoom: 15,
            animate: false,
          });
        fit();
        observer = new ResizeObserver(() => {
          if (!disposed) {
            map.invalidateSize({ pan: false });
            fit();
          }
        });
        observer.observe(element);
      })
      .catch(() => {
        if (!disposed) setStatus('error');
      });
    return () => {
      disposed = true;
      if (timeout) clearTimeout(timeout);
      observer?.disconnect();
      current?.remove();
      mapRef.current = null;
      markers.current = {};
      boundsRef.current = null;
    };
  }, [route, attempt]);
  function focusStop(id: string) {
    const p = routePoints[id],
      map = mapRef.current;
    if (!map) return;
    map.setView([p.lat, p.lng], Math.max(map.getZoom(), 15), {
      animate: false,
    });
    markers.current[id]?.openPopup();
  }
  function fitRoute() {
    if (mapRef.current && boundsRef.current)
      mapRef.current.fitBounds(boundsRef.current, {
        padding: [32, 32],
        maxZoom: 15,
        animate: false,
      });
  }
  return (
    <section
      className="daily-map"
      aria-label={'第' + (dayIndex + 1) + '天真实地图与行程路线'}
    >
      <div className="daily-map-heading">
        <div>
          <MapPinned size={19} />
          <h3>这一天，怎么走</h3>
        </div>
        <button type="button" onClick={fitRoute}>
          <Expand size={15} />
          查看全程
        </button>
      </div>
      <p className="daily-map-subtitle">
        {route.title} · {unique.length} 个地点
      </p>
      <div className="daily-map-canvas-wrap">
        <section
          ref={container}
          className="daily-map-canvas"
          aria-label="行程地图，可拖动、双指缩放，或点击加减按钮"
        />
        {status === 'loading' && (
          <output className="map-status">正在加载地图…</output>
        )}
      </div>
      {(status === 'partial' || status === 'error') && (
        <output className="map-error">
          <span>
            {status === 'partial'
              ? '部分地图图块未加载，可稍后重试。'
              : '地图底图暂时无法加载，请联网后重试。下方地点导航仍可使用。'}
          </span>
          <button
            type="button"
            onClick={() => {
              setStatus('loading');
              setAttempt((v) => v + 1);
            }}
          >
            <RotateCw size={14} />
            重试
          </button>
        </output>
      )}
      <div className="map-legend">
        <span>
          <i />
          行程顺序
        </span>
        {route.stops.some((s) => s.mode === 'train') && (
          <span>
            <i className="rail-line" />
            铁路方向
          </span>
        )}
        {route.stops.some((s) => s.optional) && (
          <span>
            <i className="optional-line" />
            可选 / 待确认
          </span>
        )}
        <span className="map-hint">点击编号查看地点</span>
      </div>
      <p className="map-disclaimer">
        {route.note} 连线仅表示到访顺序与方向，不是道路或铁路的精确轨迹。
      </p>
      <ol className="map-stop-list">
        {route.stops.map((s, i) => (
          <li key={s.id + '-' + i}>
            <button
              type="button"
              className={s.optional ? 'optional-stop' : ''}
              onClick={() => focusStop(s.id)}
              aria-label={
                '在地图中查看第' + (i + 1) + '站：' + routePoints[s.id].name
              }
            >
              <b>{i + 1}</b>
              <span>
                {routePoints[s.id].name}
                {s.optional && <small>可选</small>}
                {s.note && <em>{s.note}</em>}
              </span>
            </button>
            <a
              href={googleMap(routePoints[s.id])}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={'导航到' + routePoints[s.id].name}
            >
              <Navigation size={15} />
            </a>
          </li>
        ))}
      </ol>
      <a
        className="map-source"
        href="https://www.openstreetmap.org/fixthemap"
        target="_blank"
        rel="noopener noreferrer"
      >
        地图数据：OpenStreetMap · 反馈地点问题
        <ExternalLink size={12} />
      </a>
    </section>
  );
}
