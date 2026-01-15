import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('docs/*', 'docs/page.tsx'),
  route('api/search', 'docs/search.ts'),
] satisfies RouteConfig;
