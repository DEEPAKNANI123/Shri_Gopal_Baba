import React, { useState } from 'react';
import {
  Users, Search, Filter, Download, UserCheck, Heart, Mail, Phone,
  MapPin, Shield, Plus
} from 'lucide-react';
import { downloadCSV, formatINR } from '../../utils/formatters';

// 30 Sample Devotees as specified in Section 19
const SAMPLE_DEVOTEES = [
  { id: "dev-01", name: "Ramesh Chand Gupta", phone: "+91 98101 23456", email: "ramesh.gupta@example.com", city: "New Delhi", state: "Delhi", totalDonation: 51000, volunteerInterest: true, visits: 14 },
  { id: "dev-02", name: "Sunita Aggarwal", phone: "+91 98200 45678", email: "sunita.aggarwal@example.com", city: "Mumbai", state: "Maharashtra", totalDonation: 25000, volunteerInterest: false, visits: 8 },
  { id: "dev-03", name: "Dr. Arvind Kulkarni", phone: "+91 94220 12890", email: "arvind.kulkarni@example.com", city: "Pune", state: "Maharashtra", totalDonation: 35000, volunteerInterest: true, visits: 22 },
  { id: "dev-04", name: "Geeta Subrahmanyam", phone: "+91 98450 33412", email: "geeta.s@example.com", city: "Bengaluru", state: "Karnataka", totalDonation: 15000, volunteerInterest: false, visits: 6 },
  { id: "dev-05", name: "Manoj & Kavita Joshi", phone: "+91 97230 77890", email: "joshi.family@example.com", city: "Ahmedabad", state: "Gujarat", totalDonation: 75000, volunteerInterest: true, visits: 19 },
  { id: "dev-06", name: "Alok Singhania", phone: "+91 98300 99123", email: "alok.singhania@example.com", city: "Kolkata", state: "West Bengal", totalDonation: 100000, volunteerInterest: false, visits: 11 },
  { id: "dev-07", name: "Padma Narayanan", phone: "+91 94440 22189", email: "padma.n@example.com", city: "Chennai", state: "Tamil Nadu", totalDonation: 12000, volunteerInterest: true, visits: 5 },
  { id: "dev-08", name: "Rajeshwar Rao", phone: "+91 98490 88234", email: "rajeshwar.rao@example.com", city: "Hyderabad", state: "Telangana", totalDonation: 45000, volunteerInterest: false, visits: 12 },
  { id: "dev-09", name: "Ananya Deshmukh", phone: "+91 98230 11456", email: "ananya.d@example.com", city: "Nagpur", state: "Maharashtra", totalDonation: 18000, volunteerInterest: true, visits: 9 },
  { id: "dev-10", name: "Suresh Kumar Bansal", phone: "+91 94140 55678", email: "suresh.bansal@example.com", city: "Jaipur", state: "Rajasthan", totalDonation: 60000, volunteerInterest: true, visits: 16 },
  { id: "dev-11", name: "Nandita Sen", phone: "+91 98311 44321", email: "nandita.sen@example.com", city: "Kolkata", state: "West Bengal", totalDonation: 8500, volunteerInterest: false, visits: 4 },
  { id: "dev-12", name: "Harishankar Trivedi", phone: "+91 94250 66789", email: "hs.trivedi@example.com", city: "Indore", state: "Madhya Pradesh", totalDonation: 32000, volunteerInterest: true, visits: 13 },
  { id: "dev-13", name: "Bhavna Patel", phone: "+91 98240 88901", email: "bhavna.patel@example.com", city: "Surat", state: "Gujarat", totalDonation: 28000, volunteerInterest: false, visits: 7 },
  { id: "dev-14", name: "Amitabh Choudhury", phone: "+91 98112 33456", email: "amitabh.c@example.com", city: "Noida", state: "Uttar Pradesh", totalDonation: 55000, volunteerInterest: true, visits: 15 },
  { id: "dev-15", name: "Pooja Hegde", phone: "+91 98860 11234", email: "pooja.hegde@example.com", city: "Mangaluru", state: "Karnataka", totalDonation: 11000, volunteerInterest: true, visits: 6 },
  { id: "dev-16", name: "Dr. S. K. Mahapatra", phone: "+91 94370 22345", email: "sk.mahapatra@example.com", city: "Bhubaneswar", state: "Odisha", totalDonation: 42000, volunteerInterest: false, visits: 10 },
  { id: "dev-17", name: "Neelam & O. P. Goel", phone: "+91 98104 55678", email: "goel.family@example.com", city: "Gurugram", state: "Haryana", totalDonation: 90000, volunteerInterest: true, visits: 24 },
  { id: "dev-18", name: "Kishore Chawla", phone: "+91 98140 66789", email: "kishore.chawla@example.com", city: "Amritsar", state: "Punjab", totalDonation: 21000, volunteerInterest: false, visits: 8 },
  { id: "dev-19", name: "Vandana Iyer", phone: "+91 98205 77890", email: "vandana.iyer@example.com", city: "Thane", state: "Maharashtra", totalDonation: 16500, volunteerInterest: true, visits: 7 },
  { id: "dev-20", name: "Gopalakrishnan Nair", phone: "+91 94470 88901", email: "gk.nair@example.com", city: "Kochi", state: "Kerala", totalDonation: 22000, volunteerInterest: false, visits: 9 },
  { id: "dev-21", name: "Premchand Singhal", phone: "+91 94122 33456", email: "premchand.s@example.com", city: "Agra", state: "Uttar Pradesh", totalDonation: 38000, volunteerInterest: true, visits: 14 },
  { id: "dev-22", name: "Dr. Shalini Mukhopadhyay", phone: "+91 98305 44567", email: "shalini.m@example.com", city: "Kolkata", state: "West Bengal", totalDonation: 31000, volunteerInterest: false, visits: 6 },
  { id: "dev-23", name: "Devendra Pratap Singh", phone: "+91 94150 55678", email: "dp.singh@example.com", city: "Varanasi", state: "Uttar Pradesh", totalDonation: 48000, volunteerInterest: true, visits: 18 },
  { id: "dev-24", name: "Rohit Bhardwaj", phone: "+91 98160 66789", email: "rohit.b@example.com", city: "Shimla", state: "Himachal Pradesh", totalDonation: 14000, volunteerInterest: false, visits: 5 },
  { id: "dev-25", name: "Shashi Kapoor", phone: "+91 98108 77890", email: "shashi.k@example.com", city: "Faridabad", state: "Haryana", totalDonation: 27000, volunteerInterest: true, visits: 11 },
  { id: "dev-26", name: "Kalyani Sundaresan", phone: "+91 94445 88901", email: "kalyani.s@example.com", city: "Madurai", state: "Tamil Nadu", totalDonation: 19500, volunteerInterest: false, visits: 7 },
  { id: "dev-27", name: "Deepak Mittal", phone: "+91 98155 11234", email: "deepak.mittal@example.com", city: "Ludhiana", state: "Punjab", totalDonation: 65000, volunteerInterest: true, visits: 17 },
  { id: "dev-28", name: "Sarojini Naidu Trust", phone: "+91 98495 22345", email: "sn.trust@example.com", city: "Secunderabad", state: "Telangana", totalDonation: 150000, volunteerInterest: false, visits: 12 },
  { id: "dev-29", name: "Manish & Shweta Bhatia", phone: "+91 98119 33456", email: "bhatia.family@example.com", city: "Delhi", state: "Delhi", totalDonation: 44000, volunteerInterest: true, visits: 13 },
  { id: "dev-30", name: "Vivekananda Study Circle", phone: "+91 98319 44567", email: "studycircle@example.com", city: "Howrah", state: "West Bengal", totalDonation: 80000, volunteerInterest: true, visits: 20 }
];

export default function DevoteesAdmin() {
  const [devotees] = useState(SAMPLE_DEVOTEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [volunteerFilter, setVolunteerFilter] = useState('ALL');

  const filtered = devotees.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm);
    const matchesVol = volunteerFilter === 'ALL' ||
      (volunteerFilter === 'YES' && d.volunteerInterest) ||
      (volunteerFilter === 'NO' && !d.volunteerInterest);
    return matchesSearch && matchesVol;
  });

  const exportCSV = () => {
    downloadCSV('Gopal_Baba_Ashram_Devotees.csv', filtered);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Devotee Relations & Sangha</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Devotees Directory ({filtered.length})
          </h1>
          <p className="text-xs text-stone-500">
            Registered spiritual pilgrims, seva contributors, and satsang participants.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Devotees CSV</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, city, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-stone-500">Seva Interest:</span>
          {['ALL', 'YES', 'NO'].map(opt => (
            <button
              key={opt}
              onClick={() => setVolunteerFilter(opt)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                volunteerFilter === opt
                  ? 'bg-saffron-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {opt === 'YES' ? 'Volunteers' : (opt === 'NO' ? 'Devotees Only' : 'All')}
            </button>
          ))}
        </div>
      </div>

      {/* Devotees Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-100">
              <tr>
                <th className="p-3.5">Devotee Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Total Offerings</th>
                <th className="p-3.5">Pilgrimages</th>
                <th className="p-3.5">Volunteer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900 font-spiritual text-sm">
                    {d.name}
                  </td>
                  <td className="p-3.5 text-stone-600 space-y-0.5">
                    <div className="flex items-center gap-1 font-mono text-[11px]">
                      <Phone className="w-3 h-3 text-stone-400" />
                      <span>{d.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-400">
                      <Mail className="w-3 h-3 text-stone-400" />
                      <span>{d.email}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-stone-700">
                    <div className="font-semibold">{d.city}</div>
                    <div className="text-[11px] text-stone-400">{d.state}</div>
                  </td>
                  <td className="p-3.5 font-bold font-spiritual text-saffron-800 text-sm">
                    {formatINR(d.totalDonation)}
                  </td>
                  <td className="p-3.5 font-semibold text-stone-700">
                    {d.visits} Visits
                  </td>
                  <td className="p-3.5">
                    {d.volunteerInterest ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <UserCheck className="w-3 h-3" />
                        <span>Registered Seva</span>
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">Devotee</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
