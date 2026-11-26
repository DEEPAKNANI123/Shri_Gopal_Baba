import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  Heart, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight,
  Download, Printer, QrCode, Lock, CreditCard, Smartphone, Building
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatINR, formatDateTime } from '../../utils/formatters';

export default function DonationsPublic() {
  const { ashrams, selectedBranchId } = useAshram();
  const [searchParams] = useSearchParams();
  const initialCatCode = searchParams.get('category') || 'ANNADANAM';
  const initialAmount = searchParams.get('amount') || '1100';

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState(initialAmount);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [branchId, setBranchId] = useState(selectedBranchId === 'all' ? 'ashram-001' : selectedBranchId);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI');

  // Simulated Payment States: 'idle' | 'processing' | 'success' | 'failed'
  const [paymentState, setPaymentState] = useState('idle');
  const [simulatedReceipt, setSimulatedReceipt] = useState(null);
  const [receiptQRDataUrl, setReceiptQRDataUrl] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);

  const receiptRef = useRef();

  useEffect(() => {
    const cats = dataService.getDonationCategories();
    setCategories(cats);
    const matched = cats.find(c => c.code === initialCatCode) || cats[0];
    setSelectedCategory(matched);
  }, [initialCatCode]);

  const handleStartPayment = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) < 1) {
      alert('Please enter a valid donation amount.');
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      alert('Please enter your full name or select Anonymous donation.');
      return;
    }

    setPaymentState('processing');

    setTimeout(async () => {
      if (simulateFailure) {
        setPaymentState('failed');
        return;
      }

      // Generate donation record
      const donationData = {
        ashramId: branchId,
        categoryName: selectedCategory.name,
        categoryCode: selectedCategory.code,
        donorName: isAnonymous ? 'Anonymous Devotee' : donorName,
        donorEmail: donorEmail || 'devotee@example.com',
        donorPhone: donorPhone || '+91 98765 00000',
        amount: Number(amount),
        paymentMode,
        isAnonymous,
        message: message || 'May all beings be peaceful and happy.'
      };

      const record = await dataService.createDonation(donationData);
      setSimulatedReceipt(record);

      // Generate QR code for receipt verification
      try {
        const qrUrl = await QRCode.toDataURL(
          `GOPAL_BABA_ASHRAM_RECEIPT:${record.receiptNumber}|AMT:${record.amount}|DATE:${record.paymentTimestamp}`
        );
        setReceiptQRDataUrl(qrUrl);
      } catch (err) {
        console.error('QR code generation error:', err);
      }

      setPaymentState('success');

      // Trigger spiritual celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#D97706', '#B45309', '#6D1F2B']
        });
      } catch {}
    }, 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header & Transparency Notice */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-saffron-600 fill-saffron-600" />
          <span>Vedic Dana & Seva Samarpan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-maroon">
          Online Seva Offerings
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Your offerings directly empower daily Annadanam, Kamadhenu cow protection, Veda pathashalas, and holy pilgrim amenities with zero administrative wastage.
        </p>

        {/* Demo Warning Banner */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-900 flex items-center justify-center gap-2 max-w-xl mx-auto">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Simulated Demonstration Mode:</strong> No real bank charges or cards are processed. Receipts generated are realistic test documents.
          </span>
        </div>
      </div>

      {paymentState === 'idle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Selection & Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-bold font-spiritual text-spiritual-maroon border-b border-[#D4AF37]/30 pb-2">
              1. Select Seva Purpose
            </h2>
            <div className="space-y-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory?.code === cat.code;
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat.suggestedAmounts?.length) {
                        setAmount(String(cat.suggestedAmounts[1] || cat.minAmount));
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-saffron-50/80 border-saffron-600 shadow-sm ring-1 ring-saffron-600'
                        : 'bg-white border-stone-200 hover:border-saffron-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900 font-spiritual">
                        {cat.name}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-saffron-700" />}
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tax Exemption & Trust Badges */}
            <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-spiritual-gold" />
                <span>Statutory Trust Compliance</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Registered under Indian Trusts Act, 1882. All donations eligible for tax benefits under Section 80G (Simulated). Formal receipts automatically issued with unique digital hash.
              </p>
            </div>
          </div>

          {/* Right Column: Donation Form & Payment Gateway Mock */}
          <div className="lg:col-span-7">
            <div className="spiritual-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-spiritual-lg">
              <form onSubmit={handleStartPayment} className="space-y-6">
                
                <div>
                  <h2 className="text-lg font-bold font-spiritual text-spiritual-maroon border-b border-stone-200 pb-2 mb-4">
                    2. Contribution Details & Sankalpa
                  </h2>

                  {/* Branch Selection */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Dedicate Offering to Ashram Branch:
                    </label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    >
                      {ashrams.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-2 mb-5">
                    <label className="block text-xs font-semibold text-stone-700">
                      Select Amount (INR ₹):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(selectedCategory?.suggestedAmounts || [501, 1100, 2100, 5100, 11000, 25000]).map((sAmt) => (
                        <button
                          key={sAmt}
                          type="button"
                          onClick={() => setAmount(String(sAmt))}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            amount === String(sAmt)
                              ? 'bg-saffron-600 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                          }`}
                        >
                          ₹{sAmt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold text-sm">₹</span>
                        <input
                          type="number"
                          min="1"
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Or enter custom amount in Rupees"
                          className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        id="anonymousCheck"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-saffron-600 focus:ring-saffron-500"
                      />
                      <label htmlFor="anonymousCheck" className="font-semibold text-stone-700 cursor-pointer">
                        Gupt Seva (Make this an anonymous donation)
                      </label>
                    </div>

                    {!isAnonymous && (
                      <div className="space-y-3">
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">
                            Donor Full Name *
                          </label>
                          <input
                            type="text"
                            required={!isAnonymous}
                            placeholder="e.g. Ramesh Chand Gupta"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-stone-700 mb-1">
                              Mobile Number (for SMS & WhatsApp Receipt) *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98765 00000"
                              value={donorPhone}
                              onChange={(e) => setDonorPhone(e.target.value)}
                              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-stone-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              placeholder="donor@example.com"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Prayer Sankalpa / Family Memorial Note (Optional):
                      </label>
                      <textarea
                        rows="2"
                        placeholder="e.g. In loving memory of parents / On the auspicious occasion of child's birthday"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div>
                  <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    3. Simulated Payment Channel
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('UPI')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMode === 'UPI'
                          ? 'bg-amber-50 border-saffron-600 ring-1 ring-saffron-600'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto text-saffron-700 mb-1" />
                      <div className="text-xs font-bold text-stone-800">UPI / QR</div>
                      <div className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('Debit/Credit Card')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMode === 'Debit/Credit Card'
                          ? 'bg-amber-50 border-saffron-600 ring-1 ring-saffron-600'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto text-saffron-700 mb-1" />
                      <div className="text-xs font-bold text-stone-800">Cards</div>
                      <div className="text-[10px] text-stone-500">RuPay, Visa, Master</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('Net Banking')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMode === 'Net Banking'
                          ? 'bg-amber-50 border-saffron-600 ring-1 ring-saffron-600'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Building className="w-5 h-5 mx-auto text-saffron-700 mb-1" />
                      <div className="text-xs font-bold text-stone-800">Net Banking</div>
                      <div className="text-[10px] text-stone-500">All Indian Banks</div>
                    </button>
                  </div>

                  {/* Test Failure Toggle for QA verification */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <span>Developer Test Mode:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={simulateFailure}
                        onChange={(e) => setSimulateFailure(e.target.checked)}
                        className="rounded text-red-600"
                      />
                      <span className={simulateFailure ? 'text-red-600 font-bold' : ''}>
                        Simulate Gateway Failure Screen
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-bold text-base text-white gold-gradient shadow-spiritual-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Offer {formatINR(amount)}</span>
                  </button>
                  <p className="text-[11px] text-center text-stone-400 mt-2">
                    🔒 256-bit Simulated SSL Gateway • Instant Official Receipt Generation
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      )}

      {/* PROCESSING STATE SCREEN */}
      {paymentState === 'processing' && (
        <div className="max-w-md mx-auto py-16 text-center space-y-6 spiritual-card rounded-3xl p-8 border-2 border-spiritual-gold">
          <div className="w-16 h-16 rounded-full gold-gradient mx-auto flex items-center justify-center text-white animate-spin">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-spiritual text-2xl font-bold text-spiritual-maroon">
              Communicating with Bank Gateway...
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Simulating encrypted payment verification for {formatINR(amount)}. Please do not press back or refresh.
            </p>
          </div>
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
            <div className="bg-saffron-600 h-full w-2/3 animate-pulse" />
          </div>
        </div>
      )}

      {/* FAILED STATE SCREEN */}
      {paymentState === 'failed' && (
        <div className="max-w-lg mx-auto py-12 text-center space-y-6 spiritual-card rounded-3xl p-8 border-2 border-red-300">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-spiritual text-2xl font-bold text-red-700">
              Payment Simulation Failed
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              The banking gateway declined the transaction simulation (Code: ERR_BANK_TIMEOUT_DEMO). No charges were incurred.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setSimulateFailure(false);
                setPaymentState('idle');
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors"
            >
              Retry Payment (Success Mode)
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS STATE SCREEN & PRINTABLE OFFICIAL RECEIPT */}
      {paymentState === 'success' && simulatedReceipt && (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
          
          {/* Top Success Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center shadow-lg space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold font-spiritual">
              Offering Received with Divine Gratitude!
            </h2>
            <p className="text-xs text-emerald-100 max-w-lg mx-auto">
              May Pujya Gopal Baba's divine blessings shower upon you and your family. Your official seva receipt is generated below.
            </p>
          </div>

          {/* Printable Official Receipt Card */}
          <div
            ref={receiptRef}
            className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37] shadow-xl text-stone-800 space-y-6 relative overflow-hidden print:p-0 print:border-none print:shadow-none"
          >
            {/* Watermark */}
            <div className="absolute right-6 -bottom-10 opacity-5 select-none pointer-events-none">
              <img src="/om-icon.svg" alt="Om Watermark" className="w-96 h-96" />
            </div>

            {/* Receipt Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-stone-200 pb-6 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full gold-gradient p-0.5 flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img src="/om-icon.svg" alt="Om" className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="font-spiritual text-xl font-bold text-spiritual-maroon leading-tight">
                    GOPAL BABA ASHRAM TRUST
                  </h3>
                  <p className="text-xs text-stone-500">
                    Reg. Public Charitable Trust • Saptrishi Ghat, Haridwar
                  </p>
                  <p className="text-[10px] text-stone-400 font-mono">
                    80G Exemption Reg: AABTG0108PF20261 (Simulated)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 font-mono text-xs font-bold border border-amber-300">
                  OFFICIAL RECEIPT
                </span>
                <div className="text-xs font-mono text-stone-500 mt-1">
                  Receipt: <strong>{simulatedReceipt.receiptNumber}</strong>
                </div>
                <div className="text-[11px] text-stone-400">
                  Date: {formatDateTime(simulatedReceipt.paymentTimestamp)}
                </div>
              </div>
            </div>

            {/* Receipt Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs py-2">
              <div className="space-y-1">
                <div className="text-stone-400 uppercase text-[10px] font-bold">Received With Thanks From:</div>
                <div className="font-bold text-sm text-stone-900">{simulatedReceipt.donorName}</div>
                <div className="text-stone-500">Mobile: {simulatedReceipt.donorPhone}</div>
                <div className="text-stone-500">Email: {simulatedReceipt.donorEmail}</div>
              </div>

              <div className="space-y-1 sm:text-right">
                <div className="text-stone-400 uppercase text-[10px] font-bold">Dedicated Purpose & Branch:</div>
                <div className="font-bold text-sm text-saffron-800">{simulatedReceipt.categoryName}</div>
                <div className="text-stone-500">
                  Branch: {ashrams.find(a => a.id === simulatedReceipt.ashramId)?.name || 'Central Head Office'}
                </div>
                <div className="text-stone-500">Channel: {simulatedReceipt.paymentMode}</div>
              </div>
            </div>

            {/* Amount Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Donation Amount (INR)
                </span>
                <div className="text-3xl font-bold font-spiritual text-spiritual-maroon">
                  {formatINR(simulatedReceipt.amount)}
                </div>
              </div>
              <div className="text-xs text-stone-600 sm:text-right">
                <div>Transaction ID: <span className="font-mono font-bold">{simulatedReceipt.transactionId}</span></div>
                <div>Status: <span className="text-emerald-700 font-bold">SUCCESS (VERIFIED)</span></div>
              </div>
            </div>

            {/* Sankalpa Message */}
            {simulatedReceipt.message && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs italic text-stone-700">
                <strong>Devotee Sankalpa:</strong> "{simulatedReceipt.message}"
              </div>
            )}

            {/* Footer with QR Code & Signature */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-stone-200 gap-4">
              <div className="flex items-center gap-3">
                {receiptQRDataUrl ? (
                  <img src={receiptQRDataUrl} alt="Receipt QR" className="w-16 h-16 border p-0.5 rounded" />
                ) : (
                  <div className="w-16 h-16 bg-stone-100 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-stone-400" />
                  </div>
                )}
                <div className="text-[10px] text-stone-500">
                  <div>Scan QR to verify authentic receipt validity.</div>
                  <div className="text-stone-400 font-mono">Secured by Gopal Baba Trust Digital Sign</div>
                </div>
              </div>

              <div className="text-center sm:text-right text-xs">
                <div className="font-spiritual font-bold text-spiritual-maroon text-sm">
                  Swami Premananda Saraswati
                </div>
                <div className="text-[10px] text-stone-500">Authorized Signatory / Secretary</div>
                <div className="text-[9px] text-stone-400">Sri Shanti Seva Trust</div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-saffron-600 hover:bg-saffron-700 transition-colors shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF Receipt</span>
            </button>

            <button
              onClick={() => {
                setPaymentState('idle');
                setSimulatedReceipt(null);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 transition-colors"
            >
              <span>Make Another Offering</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
