'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
      <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
      <p className="mb-4 text-sm">{error.message || 'Please try again.'}</p>
      <button
        onClick={() => reset()}
        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}


