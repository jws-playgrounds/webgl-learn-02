/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// src/astro-env.d.ts
import type { HTMLAttributes } from 'astro';

declare module 'astro' {
  namespace JSX {
    interface IntrinsicElements {
      // 既存のHTML要素の属性を拡張
      img: HTMLAttributes & {
        fetchpriority?: 'high' | 'low' | 'auto';
      };
    }
  }
}
