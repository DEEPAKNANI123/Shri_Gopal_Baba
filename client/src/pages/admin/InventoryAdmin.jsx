import React, { useState, useEffect } from 'react';
import {
  Package, Plus, Edit2, AlertTriangle, CheckCircle2, Search,
  Filter, Download, Lock
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { downloadCSV, formatDate } from '../../utils/formatters';

export default function InventoryAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const { isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Grains',
    availableQuantity: 500,
    unit: 'kg',
    minStockLevel: 200,
    supplierName: 'Agro FPO India',
    ashramId: 'ashram-001'
  });

  const loadInventory = async () => {
    const list = await dataService.getInventory(selectedBranchId);
    setItems(list);
  };

  useEffect(() => {
    loadInventory();
  }, [selectedBranchId]);

  const handleOpenAdd = () => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can add inventory stock.');
      return;
    }
    setEditingItem(null);
    setFormData({
      itemName: '',
      category: 'Grains',
      availableQuantity: 500,
      unit: 'kg',
      minStockLevel: 200,
      supplierName: 'Haridwar Mandi Traders',
      ashramId: selectedBranchId === 'all' ? 'ashram-001' : selectedBranchId
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can edit inventory stock.');
      return;
    }
    setEditingItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can configure inventory stock.');
      return;
    }
    if (!formData.itemName) {
      alert('Please enter Item Name');
      return;
    }

    if (editingItem) {
      await dataService.updateInventoryItem(editingItem.id, formData);
    } else {
      await dataService.addInventoryItem(formData);
    }
    setModalOpen(false);
    loadInventory();
  };

  const filtered = items.filter(i =>
    i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    downloadCSV('Gopal_Baba_Ashram_Kitchen_Inventory.csv', filtered);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Package className="w-3.5 h-3.5" />
            <span>Kitchen Storehouse & Provisions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Kitchen Inventory Management ({filtered.length})
          </h1>
          <p className="text-xs text-stone-500">
            Monitor real-time levels of grains, pulses, pure cow ghee, spices, and biodegradable leaf plates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50"
          >
            Export CSV
          </button>
          {isAdmin ? (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white gold-gradient shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stock Item</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Read-Only</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search item or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Low Stock Alerts: <strong className="text-red-700">{items.filter(i => i.status === 'LOW_STOCK').length} items</strong>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-100">
              <tr>
                <th className="p-3.5">Item Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Branch</th>
                <th className="p-3.5">Available Quantity</th>
                <th className="p-3.5">Safety Threshold</th>
                <th className="p-3.5">Supplier</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900">
                    {i.itemName}
                  </td>
                  <td className="p-3.5 text-stone-600">
                    {i.category}
                  </td>
                  <td className="p-3.5 text-stone-500">
                    {ashrams.find(a => a.id === i.ashramId)?.city || 'Haridwar'}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-sm">
                    {i.availableQuantity} {i.unit}
                  </td>
                  <td className="p-3.5 font-mono text-stone-500">
                    {i.minStockLevel} {i.unit}
                  </td>
                  <td className="p-3.5 text-stone-500">
                    {i.supplierName}
                  </td>
                  <td className="p-3.5">
                    {i.status === 'LOW_STOCK' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Low Stock</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Sufficient</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    {isAdmin ? (
                      <button
                        onClick={() => handleOpenEdit(i)}
                        className="p-1.5 rounded-lg text-saffron-700 hover:bg-saffron-50 border border-saffron-200"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-400 italic flex items-center justify-end gap-1">
                        <Lock className="w-3 h-3 text-stone-400" /> View Only
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                {editingItem ? 'Update Stock Level' : 'Add Kitchen Provision'}
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="Grains">Grains</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Dairy & Oils">Dairy & Oils</option>
                    <option value="Spices">Spices</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Branch</label>
                  <select
                    value={formData.ashramId}
                    onChange={(e) => setFormData({ ...formData, ashramId: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  >
                    {ashrams.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Available Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.availableQuantity}
                    onChange={(e) => setFormData({ ...formData, availableQuantity: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unit (kg, liters, plates)</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Safety Reorder Level</label>
                <input
                  type="number"
                  required
                  value={formData.minStockLevel}
                  onChange={(e) => setFormData({ ...formData, minStockLevel: Number(e.target.value) })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Supplier Name</label>
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white gold-gradient shadow"
                >
                  Save Stock
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
