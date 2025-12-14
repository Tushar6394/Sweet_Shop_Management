import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Sweet, CreateSweetData } from '../api/sweetsApi';

const sweetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  description: z.string().optional(),
});

type SweetFormData = z.infer<typeof sweetSchema>;

interface SweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSweetData) => Promise<void>;
  sweet?: Sweet | null;
  mode: 'create' | 'edit';
}

const SweetModal = ({ isOpen, onClose, onSubmit, sweet, mode }: SweetModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SweetFormData>({
    resolver: zodResolver(sweetSchema),
    defaultValues: sweet || {
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
    },
  });

  useEffect(() => {
    if (sweet) {
      reset({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
        description: sweet.description || '',
      });
    } else {
      reset({
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        description: '',
      });
    }
  }, [sweet, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: SweetFormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sweet-800">
            {mode === 'create' ? 'Add New Sweet' : 'Edit Sweet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sweet-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-sweet-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sweet-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              {...register('name')}
              className="input-field"
              placeholder="Sweet name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sweet-700 font-semibold mb-2">Category</label>
            <input
              type="text"
              {...register('category')}
              className="input-field"
              placeholder="e.g., Chocolate, Candy, etc."
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sweet-700 font-semibold mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="input-field"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sweet-700 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className="input-field"
                placeholder="0"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sweet-700 font-semibold mb-2">Description (Optional)</label>
            <textarea
              {...register('description')}
              className="input-field min-h-[100px]"
              placeholder="Sweet description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetModal;

