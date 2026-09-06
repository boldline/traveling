'use client';
import { useEffect } from 'react';
import { sitePath } from '@/lib/site-path';
export default function LegacyJapanLink() {
  useEffect(() => {
    if (window.location.hash) {
      window.location.replace(
        sitePath('/japan/fukuoka/') + window.location.hash,
      );
    }
  }, []);
  return null;
}
