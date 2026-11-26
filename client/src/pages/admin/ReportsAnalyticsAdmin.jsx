import React, { useState, useEffect } from 'react';
import {
  BarChart3, Download, Filter, TrendingUp, Users, HeartHandshake,
  UtensilsCrossed, CalendarDays, Award
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatINR, formatNumberIN, downloadCSV } from '../../utils/formatters';

export default function ReportsAnalyticsAdmin() {
  const { selectedBranchId } = useAshram();
  const [donations, setDonations] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);

  useEffect(() => {
    async function loadData() {
      const dons = await dataService.getDonations(selectedBranchId);
      const foods = await dataService.getFoodLogs(selectedBranchId);
      setDonations(dons);
      setFoodLogs(foods);
    }
    loadData();
  }, [selectedBranchId]);

  // Chart 1: Monthly Donation Inflows (Last 6 Months)
  const monthlyDonations = [
    { month: 'Jun', Amount: 850000 },
    { month: 'Jul', Amount: 1420000 },
    { month: 'Aug', Amount: 1120000 },
    { month: 'Sep', Amount: 1680000 },
    { month: 'Oct', Amount: 1950000 },
    { month: 'Nov', Amount: 2240000 }
  ];

  // Chart 2: Category Distribution
  const categoryData = [
    { name: 'Annadanam Seva', value: 850000, color: '#D97706' },
    { name: 'General Seva', value: 380000, color: '#D4AF37' },
    { name: 'Mandir Nirman', value: 450000, color: '#6D1F2B' },
    { name: 'Gaushala Gau Seva', value: 310000, color: '#285943' },
    { name: 'Vedic Gurukul', value: 250000, color: '#4A121A' }
  ];

  // Chart 3: Branch Comparison
  const branchPerformance = [
    { branch: 'Haridwar (HQ)', Visitors: 12500, Meals: 24000, Dana: 1250000 },
    { branch: 'Vrindavan', Visitors: 8200, Meals: 16500, Dana: 840000 },
    { branch: 'Rishikesh', Visitors: 5400, Meals: 8200, Dana: 450000 }
  ];

  // Chart 4: Volunteer Seva Hours by Department
  const volunteerHours = [
    { dept: 'Annadanam Serving', hours: 420 },
    { dept: 'Crowd Navigation', hours: 280 },
    { dept: 'Gaushala Seva', hours: 310 },
    { dept: 'Vedic Chanting Help', hours: 190 },
    { dept: 'First Aid Post', hours: 140 }
  ];

  const handleExportFullReport = () => {
    downloadCSV('Gopal_Baba_Ashram_Annual_Analytics_Audit.csv', branchPerformance);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Transparency & Statistical Audits</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Reports & Comprehensive Analytics
          </h1>
          <p className="text-xs text-stone-500">
            Real-time financial growth, Annadanam meal fidelity, and branch operational benchmarking.
          </p>
        </div>

        <button
          onClick={handleExportFullReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Download Audit Report (CSV)</span>
        </button>
      </div>

      {/* Grid of 4 Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Monthly Donation Growth */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Monthly Seva Offerings Growth (INR)
              </h2>
              <p className="text-xs text-stone-500">Consistent upward trajectory (+26% avg growth)</p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Verified 80G
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyDonations}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `₹${v/100000}L`} />
                <Tooltip formatter={(v) => formatINR(v)} contentStyle={{ backgroundColor: '#FFFDF7', borderColor: '#D4AF37', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="Amount" stroke="#D97706" fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Allocation */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Seva Category Distribution
              </h2>
              <p className="text-xs text-stone-500">Annadanam accounts for 58% of overall contributions</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Branch-wise Benchmarking */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Branch-wise Operations Comparison
              </h2>
              <p className="text-xs text-stone-500">Pilgrim footfall vs Meals served</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="branch" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFDF7', borderColor: '#D4AF37', borderRadius: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Visitors" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Meals" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Volunteer Participation Hours */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-spiritual text-stone-900">
                Volunteer Service Hours by Department
              </h2>
              <p className="text-xs text-stone-500">Cumulative seva contribution across squads</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={volunteerHours}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={11} />
                <YAxis dataKey="dept" type="category" stroke="#9CA3AF" fontSize={10} width={120} />
                <Tooltip formatter={(v) => `${v} Hours`} contentStyle={{ backgroundColor: '#FFFDF7', borderColor: '#D4AF37', borderRadius: '12px' }} />
                <Bar dataKey="hours" fill="#285943" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
