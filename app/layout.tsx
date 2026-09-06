import type { Metadata } from 'next';
import '@/japan/app/globals.css';
import 'leaflet/dist/leaflet.css';
import '@/japan/components/day-route-map.css';
import '@/japan/components/places.css';
import '@/japan/components/travel-navigation.css';
import './world.css';
export const metadata: Metadata = {
  icons: { icon: '/japan/favicon.svg' },
  title: 'Traveling · 我的旅行地图',
  description:
    '在世界地图上查看旅行目的地。从日本福冈出发，打开九州亲子旅行的每日路线、酒店、美食和交通手册。',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
