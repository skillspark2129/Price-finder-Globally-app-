import { AFFILIATE_PLATFORMS, type AffiliateLinkMap } from '@/lib/affiliateLinks';

interface AffiliateLinkFieldsProps {
  links: AffiliateLinkMap;
  onChange: (platform: keyof AffiliateLinkMap, value: string) => void;
}

const INPUT = 'input-base';

export default function AffiliateLinkFields({ links, onChange }: AffiliateLinkFieldsProps) {
  return (
    <div className="sm:col-span-2">
      <p className="mb-1 text-sm font-bold">Affiliate links</p>
      <p className="mb-4 text-xs text-ink-500 dark:text-ink-400">
        Paste your affiliate link for each store where you have an account. Leave a store empty to hide its buy button.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {AFFILIATE_PLATFORMS.map((platform) => (
          <div key={platform.code}>
            <label htmlFor={`affiliate-${platform.code}`} className="mb-1.5 block text-sm font-semibold">
              {platform.label}
            </label>
            <input
              id={`affiliate-${platform.code}`}
              type="url"
              inputMode="url"
              placeholder="https://"
              value={links[platform.code]}
              onChange={(event) => onChange(platform.code, event.target.value)}
              className={INPUT}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
