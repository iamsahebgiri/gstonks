'use client';

import { ErrorState } from '@/components/state';
import cloudError24Regular from '@iconify/icons-fluent/cloud-error-24-regular';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <div className="container">
      <ErrorState
        icon={cloudError24Regular}
        error="Rate limit exceeded"
        description="No problem come back tomorrow it will
        be fixed by then. If it still persists, contact Saheb Giri (iamsahebgiri@gmail.com)."
      />
    </div>
  );
}
