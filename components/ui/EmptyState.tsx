/**
 * EmptyState
 * Displays a centered message with an optional action button.
 * Used when a list or collection has no items to show
 * (e.g. empty cart, no orders, no search results).
 */

interface EmptyStateProps {
  /** Primary message shown to the user */
  message: string;
  /** Label for the action button */
  actionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
}

const EmptyState = ({ message, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <p className="text-slate-400 text-lg">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded transition cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
