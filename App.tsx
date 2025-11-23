import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Truck, 
  Megaphone, 
  Percent, 
  FileText, 
  CreditCard 
} from 'lucide-react';
import { CalculatorInputs, CalculationResult, DEFAULT_INPUTS } from './types';
import { calculateProfit, formatCurrency, formatPercent } from './services/calculatorService';
import InputGroup from './components/InputGroup';
import ResultCard from './components/ResultCard';
import DistributionChart from './components/DistributionChart';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate whenever inputs change
  useEffect(() => {
    const res = calculateProfit(inputs);
    setResult(res);
  }, [inputs]);

  const handleInputChange = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  // Determine overall state for UI theming
  const isLoss = result ? result.netProfit < 0 : false;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isLoss ? 'bg-red-50/50' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Net E-Ticaret <span className="text-indigo-600">Kâr Hesaplayıcı</span>
            </h1>
          </div>
          <div className="hidden sm:block text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Güncel Vergi Mevzuatı Uyumlu (TR)
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-800">Gider Kalemleri (KDV Dahil)</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-y-2">
                <InputGroup 
                  label="Satış Fiyatı" 
                  value={inputs.salesPrice} 
                  onChange={(v) => handleInputChange('salesPrice', v)}
                  prefix="₺"
                  tooltip="Müşterinin ödediği son fiyat (KDV Dahil)."
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup 
                    label="Ürün Maliyeti" 
                    value={inputs.costOfGoods} 
                    onChange={(v) => handleInputChange('costOfGoods', v)}
                    prefix="₺"
                    tooltip="Tedarikçiden aldığınız fiyat (KDV Dahil)."
                  />
                  <InputGroup 
                    label="Kargo Gideri" 
                    value={inputs.shippingCost} 
                    onChange={(v) => handleInputChange('shippingCost', v)}
                    prefix="₺"
                    tooltip="Kargo firmasına ödenen tutar (KDV Dahil)."
                  />
                </div>

                <InputGroup 
                  label="Pazarlama/Reklam (Sipariş Başı)" 
                  value={inputs.marketingCost} 
                  onChange={(v) => handleInputChange('marketingCost', v)}
                  prefix="₺"
                  tooltip="Bir satış için harcanan ortalama reklam bütçesi."
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Percent className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-800">Vergi ve Komisyon Oranları</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputGroup 
                  label="Pazaryeri Komisyonu" 
                  value={inputs.commissionRate} 
                  onChange={(v) => handleInputChange('commissionRate', v)}
                  suffix="%"
                  tooltip="Trendyol, Hepsiburada vb. komisyon oranı."
                />
                <InputGroup 
                  label="KDV Oranı" 
                  value={inputs.vatRate} 
                  onChange={(v) => handleInputChange('vatRate', v)}
                  suffix="%"
                  tooltip="Ürün kategorinize ait KDV oranı (%1, %10, %20)."
                />
                <InputGroup 
                  label="Gelir Vergisi Oranı" 
                  value={inputs.incomeTaxRate} 
                  onChange={(v) => handleInputChange('incomeTaxRate', v)}
                  suffix="%"
                  tooltip="Şahıs şirketi vergi dilimi (Genelde %15-%20)."
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Simulation Bar */}
            <div className="bg-indigo-900 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-indigo-300" />
                    İndirim Simülasyonu
                  </h3>
                  <span className="text-2xl font-bold text-indigo-300">
                    -{inputs.discountRate}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="1"
                  value={inputs.discountRate}
                  onChange={(e) => handleInputChange('discountRate', parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-indigo-200 transition-all"
                />
                <div className="flex justify-between text-xs text-indigo-300 mt-2 font-medium">
                  <span>%0 İndirim</span>
                  <span>%50 İndirim</span>
                </div>
              </div>
            </div>

            {/* Main Result Cards */}
            {result && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultCard 
                    title="NET KÂR" 
                    value={formatCurrency(result.netProfit)} 
                    subValue={`Marj: ${formatPercent(result.profitMargin)}`}
                    highlight={true}
                    negative={result.netProfit < 0}
                    icon={result.netProfit >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  />
                  <ResultCard 
                    title="TOPLAM CİRO" 
                    value={formatCurrency(result.effectiveSalesPrice)}
                    subValue={inputs.discountRate > 0 ? `İndirimli Fiyat` : 'Liste Fiyatı'}
                    icon={<DollarSign size={24} />}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 uppercase font-bold mb-2">Ödenecek KDV</span>
                    <span className="text-lg font-semibold text-slate-800">{formatCurrency(result.vatPayable)}</span>
                  </div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 uppercase font-bold mb-2">Gelir Vergisi</span>
                    <span className="text-lg font-semibold text-slate-800">{formatCurrency(result.incomeTax)}</span>
                  </div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 uppercase font-bold mb-2">Toplam Komisyon</span>
                    <span className="text-lg font-semibold text-slate-800">{formatCurrency(result.commissionExVat * (1 + inputs.vatRate/100))}</span>
                  </div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 uppercase font-bold mb-2">Toplam Gider</span>
                    <span className="text-lg font-semibold text-slate-800">
                      {formatCurrency(result.totalExpensesExVat + result.vatPayable + result.incomeTax + result.totalInputVat)}
                    </span>
                  </div>
                </div>

                {/* Detailed Breakdown Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 border-b pb-2">Maliyet Dağılımı</h3>
                    <DistributionChart data={result} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 border-b pb-2">Detaylı Analiz</h3>
                    
                    <div className="flex justify-between text-sm p-2 rounded hover:bg-slate-50">
                      <span className="text-slate-600">Ürün Maliyeti (Net)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(result.costOfGoodsExVat)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded hover:bg-slate-50">
                      <span className="text-slate-600">Kargo + Reklam (Net)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(result.shippingExVat + result.marketingExVat)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded hover:bg-slate-50">
                      <span className="text-slate-600">Pazaryeri Komisyonu (Net)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(result.commissionExVat)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded hover:bg-slate-50 bg-red-50/50 border border-red-100">
                      <span className="text-red-700 font-medium">Devreden KDV</span>
                      <span className="font-bold text-red-700">{formatCurrency(result.vatCarryForward)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded hover:bg-slate-50 bg-emerald-50/50 border border-emerald-100">
                      <span className="text-emerald-700 font-medium">Vergi Matrahı</span>
                      <span className="font-bold text-emerald-700">{formatCurrency(result.grossProfit)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;