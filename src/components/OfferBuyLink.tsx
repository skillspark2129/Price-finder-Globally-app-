import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { getOfferLink } from '@/lib/affiliate';
import type { Offer } from '@/lib/types';

interface OfferBuyLinkProps {
  offer: Offer;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function OfferBuyLink({ offer, className, children, onClick }: OfferBuyLinkProps) {
  const link = getOfferLink(offer);
  if (!link) {
    return (
      <span aria-disabled="true" className={`${className} cursor-not-allowed opacity-50`}>
        Check Price
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    );
  }
  return (
    <a href={link} target="_blank" rel="nofollow sponsored noopener noreferrer" onClick={onClick} className={className}>
      {children}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}
