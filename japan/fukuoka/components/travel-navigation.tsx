'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Backpack,
  BedDouble,
  CalendarDays,
  Compass,
  Globe2,
  TrainFront,
  Utensils,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/japan/fukuoka/components/ui/sidebar';

const links = [
  { id: 'journey', label: '每日行程', short: '行程', icon: CalendarDays },
  { id: 'stays', label: '酒店住宿', short: '酒店', icon: BedDouble },
  { id: 'food', label: '美食餐厅', short: '美食', icon: Utensils },
  { id: 'transport', label: '交通出行', short: '交通', icon: TrainFront },
  { id: 'essentials', label: '行前锦囊', short: '锦囊', icon: Backpack },
];

export default function TravelNavigation() {
  const [active, setActive] = useState('journey');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(180, window.innerHeight * 0.25);
      let current = links[0].id;
      for (const { id } of links) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= readingLine
        )
          current = id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        current = links[links.length - 1].id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const resize = new ResizeObserver(schedule);
    const main = document.getElementById('top');
    if (main) resize.observe(main);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      resize.disconnect();
    };
  }, []);

  return (
    <>
      <Sidebar collapsible="none" className="travel-sidebar">
        <SidebarHeader className="travel-sidebar-header">
          <Link href="/japan/" className="world-back-link">
            <Globe2 size={15} />
            返回日本目录
          </Link>
          <a href="#journey" className="travel-brand">
            <Compass size={30} />
            <span>
              九州慢旅<small>亲子旅行手册</small>
            </span>
          </a>
          <p className="travel-dates">
            2026.09.25 — 10.01<span>7 天 6 晚 · 福冈 / 由布院 / 别府</span>
          </p>
        </SidebarHeader>
        <SidebarContent className="travel-sidebar-content">
          <SidebarGroup>
            <SidebarGroupLabel>旅行目录</SidebarGroupLabel>
            <SidebarGroupContent>
              <nav aria-label="固定侧边导航">
                <SidebarMenu>
                  {links.map(({ id, label, icon: Icon }) => (
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton
                        render={
                          <a
                            href={'#' + id}
                            aria-label={label}
                            aria-current={
                              active === id ? 'location' : undefined
                            }
                          />
                        }
                        isActive={active === id}
                        className="travel-nav-link"
                      >
                        <Icon size={20} />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </nav>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="sidebar-route">
            <SidebarGroupLabel>六晚住宿路线</SidebarGroupLabel>
            <ol>
              {[
                ['福冈', '9/25–27 · 2 晚'],
                ['由布院', '9/27–28 · 1 晚'],
                ['别府', '9/28–30 · 2 晚'],
                ['福冈', '9/30–10/1 · 1 晚'],
              ].map(([city, stay], i) => (
                <li key={stay}>
                  <span>{i + 1}</span>
                  <div>
                    <b>{city}</b>
                    <small>{stay}</small>
                  </div>
                </li>
              ))}
            </ol>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="travel-sidebar-footer">
          <p>旅行建议方案</p>
          <span>机酒及门票未确认预订</span>
        </SidebarFooter>
      </Sidebar>
      <nav className="mobile-nav" aria-label="手机快捷导航">
        {links.map(({ id, short, icon: Icon }) => (
          <a
            href={'#' + id}
            key={id}
            aria-current={active === id ? 'location' : undefined}
          >
            <Icon size={20} />
            <span>{short}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
