import type { Metadata } from 'next';
import { sitePath } from '@/lib/site-path';
export const metadata: Metadata = {
  icons: { icon: sitePath('/japan/fukuoka/favicon.svg') },
  title: '九州慢旅 · 7日亲子旅行手册',
  description:
    '2026年9月25日至10月1日，福冈、由布院与别府亲子之旅。每日路线、酒店、美食、交通及预约提醒。',
};
export default function JapanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
