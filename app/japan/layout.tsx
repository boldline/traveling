import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '日本旅行攻略 · Traveling',
  description: '按目的地查找日本旅行攻略，查看福冈及九州亲子行程。',
};
export default function JapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
