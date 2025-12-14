import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { sweetsApi, Sweet, CreateSweetData } from '../api/sweetsApi';
import SweetCard from '../components/SweetCard';
import SweetModal from '../components/SweetModal';
import RestockModal from '../components/RestockModal';
import {
  LogOut,
  Plus,
  Search,
  Filter,
  Candy,
  ShoppingBag,
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuthStore();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    loadSweets();
  }, []);

  useEffect(() => {
    filterSweets();
  }, [searchTerm, selectedCategory, sweets]);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsApi.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = [...sweets];

    if (searchTerm) {
      filtered = filtered.filter(
        (sweet) =>
          sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((sweet) => sweet.category === selectedCategory);
    }

    setFilteredSweets(filtered);
  };

  const categories = Array.from(new Set(sweets.map((s) => s.category)));

  const handlePurchase = async (id: number) => {
    try {
      const updated = await sweetsApi.purchase(id, 1);
      setSweets(sweets.map((s) => (s.id === id ? updated : s)));
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  const handleCreateSweet = async (data: CreateSweetData) => {
    try {
      const newSweet = await sweetsApi.create(data);
      setSweets([newSweet, ...sweets]);
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create sweet');
    }
  };

  const handleUpdateSweet = async (data: CreateSweetData) => {
    if (!selectedSweet) return;
    try {
      const updated = await sweetsApi.update(selectedSweet.id, data);
      setSweets(sweets.map((s) => (s.id === selectedSweet.id ? updated : s)));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update sweet');
    }
  };

  const handleDeleteSweet = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await sweetsApi.delete(id);
      setSweets(sweets.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (quantity: number) => {
    if (!selectedSweet) return;
    try {
      const updated = await sweetsApi.restock(selectedSweet.id, quantity);
      setSweets(sweets.map((s) => (s.id === selectedSweet.id ? updated : s)));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to restock');
    }
  };

  const openCreateModal = () => {
    setSelectedSweet(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openRestockModal = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setIsRestockModalOpen(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-sweet-800 mb-2 flex items-center gap-3">
              <Candy className="w-10 h-10" />
              Sweet Shop Management
            </h1>
            <p className="text-sweet-600">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
              {isAdmin() && (
                <span className="ml-2 px-2 py-1 bg-sweet-200 text-sweet-800 rounded text-sm">
                  Admin
                </span>
              )}
            </p>
          </div>
          <button onClick={logout} className="btn-secondary flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sweet-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sweets by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sweet-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field pl-12 pr-4"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {isAdmin() && (
            <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Sweet
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Sweets Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sweet-600"></div>
          <p className="mt-4 text-sweet-600">Loading sweets...</p>
        </div>
      ) : filteredSweets.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-2xl">
          <ShoppingBag className="w-16 h-16 text-sweet-300 mx-auto mb-4" />
          <p className="text-sweet-600 text-lg">No sweets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={handlePurchase}
              isAdmin={isAdmin()}
              onEdit={openEditModal}
              onDelete={handleDeleteSweet}
              onRestock={openRestockModal}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <SweetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === 'create' ? handleCreateSweet : handleUpdateSweet}
        sweet={selectedSweet}
        mode={modalMode}
      />

      {selectedSweet && (
        <RestockModal
          isOpen={isRestockModalOpen}
          onClose={() => setIsRestockModalOpen(false)}
          onRestock={handleRestock}
          sweetName={selectedSweet.name}
        />
      )}
    </div>
  );
};

export default Dashboard;

