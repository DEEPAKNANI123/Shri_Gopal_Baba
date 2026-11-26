import React, { useState, useEffect } from 'react';
import {
  HeartHandshake, Download, Search, Filter, Eye, Printer,
  CheckCircle2, AlertTriangle, ShieldCheck, PieChart as PieIcon
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatINR, formatDateTime, downloadCSV } from '../../utils/formatters';

export default function DonationsAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('ALL');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      const data = await dataService.getDonations(selectedBranchId);
      setDonations(data);
    }
    fetchDonations();
  }, [selectedBranchId]);

  const categories = [
    'ALL',
    'Akshaya Patra Daily Annadanam',
    'General Ashram Seva Fund',
    'Mandir & Yatri Niwas Construction',
    'Kamadhenu Gaushala & Cow Seva',
    'Guru Purnima & Mahashivratri Sponsorship',
    'Veda Pathashala & Student Scholarship'
  ];

  const filtered = donations.filter(d => {
    const matchesSearch = d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = selectedPurpose === 'ALL' || d.categoryName === selectedPurpose;
    return matchesSearch && matchesPurpose;
  });

  const totalFilteredINR = filtered.reduce((sum, d) => sum + (d.status === 'SUCCESS' ? Number(d.amount) : 0), 0);

  const handleExportCSV = () => {
    downloadCSV('Gopal_Baba_Ashram_Donations_Ledger.csv', filtered);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Financial Integrity & Receipts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Donations Management ({filtered.length})
          </h1>
          <p className="text-xs text-stone-500">
            Complete audited transaction ledger, 80G receipt vouchers, and real-time reconciliation.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold">Total Verified Dana</div>
          <div className="text-2xl font-bold font-spiritual text-saffron-800 mt-1">
            {formatINR(totalFilteredINR)}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold">Average Offering Size</div>
          <div className="text-2xl font-bold font-spiritual text-stone-900 mt-1">
            {formatINR(totalFilteredINR / (filtered.length || 1))}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold">Digital Audit Compliance</div>
          <div className="text-2xl font-bold font-spiritual text-emerald-700 mt-1">
            100% Tax 80G
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by receipt, donor, transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto text-xs overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-stone-500 shrink-0" />
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-semibold focus:outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-100">
              <tr>
                <th className="p-3.5">Receipt No</th>
                <th className="p-3.5">Donor Name</th>
                <th className="p-3.5">Dedicated Seva</th>
                <th className="p-3.5">Branch</th>
                <th className="p-3.5">Amount (INR)</th>
                <th className="p-3.5">Date & Channel</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] font-bold text-stone-800">
                    <div>{d.receiptNumber}</div>
                    <div className="text-[10px] text-stone-400 font-normal">{d.transactionId}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-stone-900">
                    <div>{d.donorName}</div>
                    <div className="text-[10px] text-stone-400">{d.donorPhone}</div>
                  </td>
                  <td className="p-3.5 text-saffron-800 font-medium">
                    {d.categoryName}
                  </td>
                  <td className="p-3.5 text-stone-600">
                    {ashrams.find(a => a.id === d.ashramId)?.city || 'General'}
                  </td>
                  <td className="p-3.5 font-bold font-spiritual text-stone-900 text-sm">
                    {formatINR(d.amount)}
                  </td>
                  <td className="p-3.5 text-stone-500">
                    <div>{formatDateTime(d.paymentTimestamp)}</div>
                    <div className="text-[10px] text-stone-400">{d.paymentMode}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : (d.status === 'FAILED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800')
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedReceipt(d)}
                      className="inline-flex items-center gap-1 font-semibold text-saffron-700 hover:text-saffron-800 bg-saffron-50 px-2.5 py-1 rounded-lg border border-saffron-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 relative text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="font-spiritual font-bold text-base text-spiritual-maroon">
                Donation Receipt Voucher
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Receipt No:</span>
                <span className="font-mono font-bold">{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Donor Name:</span>
                <span className="font-bold text-stone-900">{selectedReceipt.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Purpose:</span>
                <span className="font-bold text-saffron-800">{selectedReceipt.categoryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Offering Amount:</span>
                <span className="text-lg font-bold font-spiritual text-stone-900">{formatINR(selectedReceipt.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Channel:</span>
                <span>{selectedReceipt.paymentMode} ({selectedReceipt.transactionId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Timestamp:</span>
                <span>{formatDateTime(selectedReceipt.paymentTimestamp)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-saffron-600 text-white font-bold"
              >
                Print Voucher
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
