export default function Loading() {
  return (
    <div className="min-h-svh">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-black"></div>
      </div>
    </div>
  );
}
