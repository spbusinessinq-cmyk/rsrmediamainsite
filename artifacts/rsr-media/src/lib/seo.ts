import { useEffect } from 'react';
import { trackPageView } from './analytics';

export function useSEO({ title, description, ogImage }: { title: string; description: string; ogImage?: string }) {
  useEffect(() => {
    document.title = title + ' | RSR Media';
    // Update meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { 
      meta = document.createElement('meta'); 
      meta.setAttribute('name','description'); 
      document.head.appendChild(meta); 
    }
    meta.setAttribute('content', description);
    
    // Simple analytics tracking on page title change
    trackPageView(window.location.pathname);
  }, [title, description]);
}
