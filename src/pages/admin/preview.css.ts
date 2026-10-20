import type { APIRoute } from 'astro';
import styles from '../../styles/cms-preview.css?inline';

export const GET: APIRoute = () => new Response(styles, {
  headers: { 'Content-Type': 'text/css; charset=utf-8' },
});
