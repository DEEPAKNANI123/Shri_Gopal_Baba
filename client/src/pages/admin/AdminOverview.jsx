import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, HeartHandshake, UtensilsCrossed, CalendarDays, UserCheck,
  AlertTriangle, TrendingUp, ArrowUpRight, Sparkles, Plus, Clock,
  MapPin, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { formatINR, formatNumberIN, formatDate } from '../../utils/formatters';

export default function AdminOverview() {
  const { selectedBranchId, activeBranch, ashrams } = useAshram();
  const { currentUser } = useAuth();

  const [donations, setDonations] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      const dons = await dataService.getDonations(selectedBranchId);
      const foods = await dataService.getFoodLogs(selectedBranchId);
      const evts = await dataService.getEvents(selectedBranchId);
      const inv = await dataService.getInventory(selectedBranchId);
      const anns = await dataService.getAnnouncements(selectedBranchId);

      setDonations(dons);
      setFoodLogs(foods);
      setEvents(evts);
      setInventory(inv);
      setAnnouncements(anns);
    }
    fetchDashboardData();
  }, [selectedBranchId]);

  // Aggregate Metrics
  const totalDonationsINR = donations.reduce((sum, d) => sum + (d.status === 'SUCCESS' ? Number(d.amount) : 0), 0);
  const totalMealsDistributed = foodLogs.reduce((sum, f) => sum + Number(f.totalDistributed || 0), 0);
  const lowStockCount = inventory.filter(i => i.status === 'LOW_STOCK').length;
  const upcomingEventsCount = events.filter(e => e.isPublished).length;

  // Chart 1: 7-day Visitor Trends
  const visitorChartData = [
    { day: 'Mon', Haridwar: 1650, Vrindavan: 1100, Rishikesh: 750 },
    { day: 'Tue', Haridwar: 1820, Vrindavan: 1250, Rishikesh: 810 },
    { day: 'Wed', Haridwar: 1780, Vrindavan: 1180, Rishikesh: 790 },
    { day: 'Thu', Haridwar: 1950, Vrindavan: 1320, Rishikesh: 890 },
    { day: 'Fri', Haridwar: 2400, Vrindavan: 1680, Rishikesh: 1100 },
    { day: 'Sat', Haridwar: 3850, Vrindavan: 2450, Rishikesh: 1650 },
    { day: 'Sun', Haridwar: 4200, Vrindavan: 2800, Rishikesh: 1850 }
  ];

  // Chart 2: 7-day Food Distribution (Expected vs Distributed)
  const foodChartData = foodLogs.slice(0, 7).reverse().map(f => ({
    date: formatDate(f.date).split(' ')[0] + ' ' + formatDate(f.date).split(' ')[1],
    Expected: f.totalExpected,
    Distributed: f.totalDistributed,
    Wastage: f.totalWastage
  }));

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. TOP WELCOME BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-spiritual-maroon via-stone-900 to-spiritual-maroon text-white border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
            <Sparkles className="w-4 h-4 text-spiritual-gold" />
            <span>Executive Command Center</span>
            <span>•</span>
            <span className="uppercase text-[11px] font-mono tracking-wider bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
              Role: {currentUser.role.replace('_', ' ')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-ivory">
            Namaste, {currentUser.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            Centralized governance oversight for {selectedBranchId === 'all' ? 'All 3 Ashram Branches' : activeBranch?.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/donations"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-spiritual-gold text-stone-900 hover:bg-amber-300 transition-colors shadow"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Audit Donations</span>
          </Link>
          <Link
            to="/admin/annadanam"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4 text-spiritual-gold" />
            <span>Kitchen Logs</span>
          </Link>
        </div>
      </div>

      {/* 2. KPI METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Today's Visitors</span>
            <Users className="w-4 h-4 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-stone-900">
            ~3,900
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs weekday</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Total Verified Dana</span>
            <HeartHandshake className="w-4 h-4 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-saffron-700">
            {formatINR(totalDonationsINR)}
          </div>
          <div className="text-[11px] text-stone-500">
            50 Recorded Offerings
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Meals Distributed</span>
            <UtensilsCrossed className="w-4 h-4 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-stone-900">
            {formatNumberIN(totalMealsDistributed)}
          </div>
          <div className="text-[11px] text-stone-500">
            30-day recorded logs
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Upcoming Utsavs</span>
            <CalendarDays className="w-4 h-4 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-stone-900">
            {upcomingEventsCount}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Gita Jayanti Peak
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Active Volunteers</span>
            <UserCheck className="w-4 h-4 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-stone-900">
            97
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            Across 3 branches
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-spiritual text-amber-700">
            {lowStockCount} Items
          </div>
          <div className="text-[11px] text-red-600 font-medium">
            Ghee & Jaggery urgent
          </div>
        </div>

      </div>

      {/* 3. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Pilgrim Attendance Flow */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Weekly Devotee Visitor Trends
              </h2>
              <p className="text-xs text-stone-500">Attendance comparison across branches</p>
            </div>
            <span className="text-xs bg-saffron-50 text-saffron-800 font-bold px-2.5 py-1 rounded-lg border border-saffron-200">
              Peak: Weekend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorChartData}>
                <defs>
                  <linearGradient id="colorHdw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVrn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D1F2B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6D1F2B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFDF7', borderColor: '#D4AF37', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="Haridwar" stroke="#D97706" fillOpacity={1} fill="url(#colorHdw)" />
                <Area type="monotone" dataKey="Vrindavan" stroke="#6D1F2B" fillOpacity={1} fill="url(#colorVrn)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Annadanam Expected vs Distributed */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Annadanam Meal Distribution
              </h2>
              <p className="text-xs text-stone-500">Expected vs Distributed vs Wastage</p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
              98.4% Efficiency
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={foodChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFDF7', borderColor: '#D4AF37', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="Expected" fill="#FCD34D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Distributed" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. RECENT SEVA DONATIONS & OPERATIONAL TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Donations Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Recent Devotee Offerings (Live Ledger)
              </h2>
              <p className="text-xs text-stone-500">Instant digital transaction verification</p>
            </div>
            <Link
              to="/admin/donations"
              className="text-xs font-bold text-saffron-700 hover:text-saffron-800 flex items-center gap-1"
            >
              <span>View Full Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Receipt / Txn</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Seva Category</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donations.slice(0, 5).map(d => (
                  <tr key={d.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-3 font-mono text-[11px] text-stone-600">
                      <div>{d.receiptNumber}</div>
                      <div className="text-[10px] text-stone-400">{d.transactionId}</div>
                    </td>
                    <td className="p-3 font-semibold text-stone-900">
                      {d.donorName}
                      <div className="text-[10px] text-stone-400 font-normal">{d.city || 'India'}</div>
                    </td>
                    <td className="p-3 text-saffron-800 font-medium">
                      {d.categoryName}
                    </td>
                    <td className="p-3 font-bold font-spiritual text-stone-900 text-sm">
                      {formatINR(d.amount)}
                    </td>
                    <td className="p-3 text-stone-500">
                      {d.paymentMode}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedReceipt(d)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-saffron-700 bg-saffron-50 hover:bg-saffron-100 px-2 py-1 rounded-lg border border-saffron-200"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Inventory & Operational Warnings */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold font-spiritual text-stone-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Kitchen Stock Alerts</span>
            </h2>
            <Link
              to="/admin/inventory"
              className="text-xs font-bold text-saffron-700 hover:text-saffron-800"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {inventory.filter(i => i.status === 'LOW_STOCK').slice(0, 4).map(item => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <div className="font-bold text-stone-900">{item.itemName}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">
                    Available: <strong className="text-red-700">{item.availableQuantity} {item.unit}</strong> (Min: {item.minStockLevel} {item.unit})
                  </div>
                  <div className="text-stone-400 text-[10px] mt-1">
                    Supplier: {item.supplierName}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 shrink-0">
                  REORDER
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 relative text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="font-spiritual font-bold text-base text-spiritual-maroon">
                Donation Receipt Voucher
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
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
                <span>{formatDate(selectedReceipt.paymentTimestamp)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
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
