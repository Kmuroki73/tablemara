import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterState {
  path: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
  back: () => void;
}

const RouterContext = createContext<RouterState>({
  path: '/',
  navigate: () => {},
  back: () => {},
});

export function Router({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname + window.location.search);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (opts?.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const back = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate, back }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
}

export function Link({ to, children, className, activeClassName, onClick, ...props }: LinkProps) {
  const { navigate, path } = useRouter();
  const isExternal = to.startsWith('http') || to.startsWith('//') || to.startsWith('mailto:');
  const pathname = path.split('?')[0];
  const isActive = !isExternal && (pathname === to || pathname === to.split('?')[0]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (isExternal || e.defaultPrevented) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={to}
      className={`${className ?? ''} ${isActive && activeClassName ? activeClassName : ''}`.trim() || undefined}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export function usePathMatch(pattern: string): boolean {
  const { path } = useRouter();
  const pathname = path.split('?')[0];
  if (pattern === pathname) return true;
  if (pattern !== '/' && pathname.startsWith(pattern)) return true;
  return false;
}
