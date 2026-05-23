import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'

// Friendly fallback for unknown URLs (the app is otherwise a single page).
function NotFound() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        textAlign: 'center',
        padding: 24,
        background:
          'linear-gradient(180deg, #BFE4FF 0%, #E8F4FF 60%, #FFF8E7 100%)',
        fontFamily:
          '"Baloo 2", "Noto Sans SC", "ZCOOL KuaiLe", system-ui, sans-serif',
        color: '#1A2B4A',
      }}
    >
      <div style={{ fontSize: 56 }}>🧭</div>
      <h1 style={{ margin: 0, fontSize: 24 }}>找不到这个页面</h1>
      <a
        href="/"
        style={{
          marginTop: 8,
          padding: '10px 18px',
          borderRadius: 14,
          border: '3px solid #1A2B4A',
          boxShadow: '0 4px 0 #C99800',
          background: '#FFD93D',
          color: '#1A2B4A',
          fontWeight: 800,
          textDecoration: 'none',
        }}
      >
        返回首页
      </a>
    </div>
  )
}

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFound,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
