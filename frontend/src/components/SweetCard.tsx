import { Sweet } from '../api/sweetsApi';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
  isAdmin?: boolean;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: number) => void;
  onRestock?: (id: number) => void;
}

const SweetCard = ({
  sweet,
  onPurchase,
  isAdmin = false,
  onEdit,
  onDelete,
  onRestock,
}: SweetCardProps) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="sweet-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-sweet-800 mb-2">{sweet.name}</h3>
          <span className="inline-block px-3 py-1 bg-sweet-100 text-sweet-700 rounded-full text-sm font-semibold">
            {sweet.category}
          </span>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(sweet)}
                className="p-2 text-sweet-600 hover:bg-sweet-100 rounded-lg transition-colors"
                title="Edit"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(sweet.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      {sweet.description && (
        <p className="text-sweet-600 mb-4 line-clamp-2">{sweet.description}</p>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sweet-700">
          <DollarSign className="w-5 h-5" />
          <span className="text-2xl font-bold">${sweet.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-sweet-600" />
          <span
            className={`font-semibold ${
              isOutOfStock ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {sweet.quantity} in stock
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {isOutOfStock ? 'Out of Stock' : 'Purchase'}
        </button>
        {isAdmin && onRestock && (
          <button
            onClick={() => onRestock(sweet.id)}
            className="btn-secondary flex items-center justify-center gap-2"
            title="Restock"
          >
            <Package className="w-5 h-5" />
            Restock
          </button>
        )}
      </div>
    </div>
  );
};

export default SweetCard;

