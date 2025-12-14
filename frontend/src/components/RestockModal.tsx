import { useState } from 'react';
import { X } from 'lucide-react';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestock: (quantity: number) => Promise<void>;
  sweetName: string;
}

const RestockModal = ({ isOpen, onClose, onRestock, sweetName }: RestockModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;

    setLoading(true);
    try {
      await onRestock(quantity);
      setQuantity(1);
      onClose();
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sweet-800">Restock {sweetName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sweet-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-sweet-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sweet-700 font-semibold mb-2">Quantity to Add</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="input-field"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || quantity <= 0}
              className="btn-primary flex-1"
            >
              {loading ? 'Restocking...' : 'Restock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockModal;

