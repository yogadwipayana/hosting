import { useState } from "react"
import { Search } from "lucide-react"

const domainPricingData = [
  { tld: ".com", minYears: 1, register: "Rp. 210,000", transfer: "Rp. 230,000", renew: "Rp. 230,000" },
  { tld: ".net", minYears: 1, register: "Rp. 255,000", transfer: "Rp. 255,000", renew: "Rp. 255,000" },
  { tld: ".org", minYears: 1, register: "Rp. 210,000", transfer: "Rp. 210,000", renew: "Rp. 210,000" },
  { tld: ".info", minYears: 1, register: "Rp. 400,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".biz", minYears: 1, register: "Rp. 300,000", transfer: "Rp. 365,000", renew: "Rp. 365,000" },
  { tld: ".asia", minYears: 1, register: "Rp. 240,000", transfer: "Rp. 240,000", renew: "Rp. 240,000" },
  { tld: ".co", minYears: 1, register: "Rp. 610,000", transfer: "Rp. 720,000", renew: "Rp. 720,000" },
  { tld: ".in", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 250,000", renew: "Rp. 250,000" },
  { tld: ".us", minYears: 1, register: "Rp. 155,000", transfer: "Rp. 185,000", renew: "Rp. 185,000" },
  { tld: ".me", minYears: 1, register: "Rp. 500,000", transfer: "Rp. 735,000", renew: "Rp. 735,000" },
  { tld: ".pw", minYears: 1, register: "Rp. 80,000", transfer: "Rp. 360,000", renew: "Rp. 360,000" },
  { tld: ".ws", minYears: 1, register: "Rp. 520,000", transfer: "Rp. 520,000", renew: "Rp. 520,000" },
  { tld: ".id", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 250,000", renew: "Rp. 250,000" },
  { tld: ".co.id", minYears: 1, register: "Rp. 350,000", transfer: "Rp. 350,000", renew: "Rp. 350,000" },
  { tld: ".web.id", minYears: 1, register: "Rp. 65,000", transfer: "Rp. 65,000", renew: "Rp. 65,000" },
  { tld: ".or.id", minYears: 1, register: "Rp. 65,000", transfer: "Rp. 65,000", renew: "Rp. 65,000" },
  { tld: ".ac.id", minYears: 1, register: "Rp. 65,000", transfer: "Rp. 65,000", renew: "Rp. 65,000" },
  { tld: ".sch.id", minYears: 1, register: "Rp. 65,000", transfer: "Rp. 65,000", renew: "Rp. 65,000" },
  { tld: ".biz.id", minYears: 1, register: "Rp. 70,000", transfer: "Rp. 70,000", renew: "Rp. 70,000" },
  { tld: ".my.id", minYears: 1, register: "Rp. 30,000", transfer: "Rp. 30,000", renew: "Rp. 30,000" },
  { tld: ".top", minYears: 1, register: "Rp. 125,000", transfer: "Rp. 125,000", renew: "Rp. 125,000" },
  { tld: ".ponpes.id", minYears: 1, register: "Rp. 60,000", transfer: "Rp. 60,000", renew: "Rp. 60,000" },
  { tld: ".host", minYears: 1, register: "Rp. 1,500,000", transfer: "Rp. 1,500,000", renew: "Rp. 1,500,000" },
  { tld: ".events", minYears: 1, register: "Rp. 300,000", transfer: "Rp. 620,000", renew: "Rp. 620,000" },
  { tld: ".icu", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 250,000", renew: "Rp. 250,000" },
  { tld: ".name", minYears: 1, register: "Rp. 160,000", transfer: "Rp. 160,000", renew: "Rp. 160,000" },
  { tld: ".win", minYears: 1, register: "Rp. 110,000", transfer: "Rp. 110,000", renew: "Rp. 110,000" },
  { tld: ".date", minYears: 1, register: "Rp. 110,000", transfer: "Rp. 110,000", renew: "Rp. 110,000" },
  { tld: ".bid", minYears: 1, register: "Rp. 90,000", transfer: "Rp. 110,000", renew: "Rp. 110,000" },
  { tld: ".link", minYears: 1, register: "Rp. 400,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".travel", minYears: 1, register: "Rp. 2,250,000", transfer: "Rp. 2,650,000", renew: "Rp. 2,650,000" },
  { tld: ".online", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 550,000", renew: "Rp. 550,000" },
  { tld: ".site", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 500,000", renew: "Rp. 500,000" },
  { tld: ".tech", minYears: 1, register: "Rp. 130,000", transfer: "Rp. 960,000", renew: "Rp. 960,000" },
  { tld: ".store", minYears: 1, register: "Rp. 65,000", transfer: "Rp. 860,000", renew: "Rp. 860,000" },
  { tld: ".website", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".space", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 520,000", renew: "Rp. 520,000" },
  { tld: ".app", minYears: 1, register: "Rp. 360,000", transfer: "Rp. 430,000", renew: "Rp. 430,000" },
  { tld: ".agency", minYears: 1, register: "Rp. 200,000", transfer: "Rp. 425,000", renew: "Rp. 425,000" },
  { tld: ".bar", minYears: 1, register: "Rp. 80,000", transfer: "Rp. 1,150,000", renew: "Rp. 1,150,000" },
  { tld: ".best", minYears: 1, register: "Rp. 385,000", transfer: "Rp. 460,000", renew: "Rp. 460,000" },
  { tld: ".buzz", minYears: 1, register: "Rp. 665,000", transfer: "Rp. 795,000", renew: "Rp. 795,000" },
  { tld: ".cafe", minYears: 1, register: "Rp. 535,000", transfer: "Rp. 535,000", renew: "Rp. 535,000" },
  { tld: ".cc", minYears: 1, register: "Rp. 205,000", transfer: "Rp. 250,000", renew: "Rp. 250,000" },
  { tld: ".city", minYears: 1, register: "Rp. 360,000", transfer: "Rp. 360,000", renew: "Rp. 360,000" },
  { tld: ".click", minYears: 1, register: "Rp. 224,000", transfer: "Rp. 224,000", renew: "Rp. 224,000" },
  { tld: ".club", minYears: 1, register: "Rp. 290,000", transfer: "Rp. 290,000", renew: "Rp. 290,000" },
  { tld: ".coffee", minYears: 1, register: "Rp. 535,000", transfer: "Rp. 535,000", renew: "Rp. 535,000" },
  { tld: ".cool", minYears: 1, register: "Rp. 535,000", transfer: "Rp. 535,000", renew: "Rp. 535,000" },
  { tld: ".design", minYears: 1, register: "Rp. 870,000", transfer: "Rp. 870,000", renew: "Rp. 870,000" },
  { tld: ".digital", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 570,000", renew: "Rp. 570,000" },
  { tld: ".education", minYears: 1, register: "Rp. 550,000", transfer: "Rp. 550,000", renew: "Rp. 550,000" },
  { tld: ".email", minYears: 1, register: "Rp. 460,000", transfer: "Rp. 540,000", renew: "Rp. 540,000" },
  { tld: ".fit", minYears: 1, register: "Rp. 610,000", transfer: "Rp. 735,000", renew: "Rp. 735,000" },
  { tld: ".foundation", minYears: 1, register: "Rp. 390,000", transfer: "Rp. 420,000", renew: "Rp. 420,000" },
  { tld: ".fun", minYears: 1, register: "Rp. 50,000", transfer: "Rp. 600,000", renew: "Rp. 600,000" },
  { tld: ".gdn", minYears: 1, register: "Rp. 230,000", transfer: "Rp. 280,000", renew: "Rp. 280,000" },
  { tld: ".ink", minYears: 1, register: "Rp. 560,000", transfer: "Rp. 560,000", renew: "Rp. 560,000" },
  { tld: ".io", minYears: 1, register: "Rp. 1,000,000", transfer: "Rp. 1,000,000", renew: "Rp. 1,000,000" },
  { tld: ".life", minYears: 1, register: "Rp. 535,000", transfer: "Rp. 535,000", renew: "Rp. 535,000" },
  { tld: ".live", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 450,000", renew: "Rp. 450,000" },
  { tld: ".loan", minYears: 1, register: "Rp. 90,000", transfer: "Rp. 110,000", renew: "Rp. 110,000" },
  { tld: ".lol", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 450,000", renew: "Rp. 450,000" },
  { tld: ".media", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 650,000", renew: "Rp. 650,000" },
  { tld: ".mobi", minYears: 1, register: "Rp. 510,000", transfer: "Rp. 510,000", renew: "Rp. 510,000" },
  { tld: ".news", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 480,000", renew: "Rp. 480,000" },
  { tld: ".one", minYears: 1, register: "Rp. 185,000", transfer: "Rp. 230,000", renew: "Rp. 230,000" },
  { tld: ".ooo", minYears: 1, register: "Rp. 525,000", transfer: "Rp. 640,000", renew: "Rp. 640,000" },
  { tld: ".page", minYears: 1, register: "Rp. 280,000", transfer: "Rp. 335,000", renew: "Rp. 335,000" },
  { tld: ".photo", minYears: 1, register: "Rp. 459,000", transfer: "Rp. 459,000", renew: "Rp. 459,000" },
  { tld: ".press", minYears: 1, register: "Rp. 1,200,000", transfer: "Rp. 1,200,000", renew: "Rp. 1,200,000" },
  { tld: ".pro", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".review", minYears: 1, register: "Rp. 360,000", transfer: "Rp. 360,000", renew: "Rp. 360,000" },
  { tld: ".rocks", minYears: 1, register: "Rp. 310,000", transfer: "Rp. 370,000", renew: "Rp. 370,000" },
  { tld: ".shop", minYears: 1, register: "Rp. 615,000", transfer: "Rp. 735,000", renew: "Rp. 735,000" },
  { tld: ".social", minYears: 1, register: "Rp. 670,000", transfer: "Rp. 670,000", renew: "Rp. 670,000" },
  { tld: ".solutions", minYears: 1, register: "Rp. 520,000", transfer: "Rp. 600,000", renew: "Rp. 600,000" },
  { tld: ".team", minYears: 1, register: "Rp. 540,000", transfer: "Rp. 540,000", renew: "Rp. 540,000" },
  { tld: ".tel", minYears: 1, register: "Rp. 270,000", transfer: "Rp. 330,000", renew: "Rp. 330,000" },
  { tld: ".today", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".tokyo", minYears: 1, register: "Rp. 310,000", transfer: "Rp. 315,000", renew: "Rp. 315,000" },
  { tld: ".tv", minYears: 1, register: "Rp. 540,000", transfer: "Rp. 540,000", renew: "Rp. 540,000" },
  { tld: ".vip", minYears: 1, register: "Rp. 315,000", transfer: "Rp. 315,000", renew: "Rp. 315,000" },
  { tld: ".wiki", minYears: 1, register: "Rp. 520,000", transfer: "Rp. 520,000", renew: "Rp. 520,000" },
  { tld: ".work", minYears: 1, register: "Rp. 125,000", transfer: "Rp. 125,000", renew: "Rp. 125,000" },
  { tld: ".world", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 600,000", renew: "Rp. 600,000" },
  { tld: ".zone", minYears: 1, register: "Rp. 535,000", transfer: "Rp. 535,000", renew: "Rp. 535,000" },
  { tld: ".cloud", minYears: 1, register: "Rp. 400,000", transfer: "Rp. 400,000", renew: "Rp. 400,000" },
  { tld: ".wedding", minYears: 1, register: "Rp. 670,000", transfer: "Rp. 670,000", renew: "Rp. 670,000" },
  { tld: ".international", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 450,000", renew: "Rp. 450,000" },
  { tld: ".business", minYears: 1, register: "Rp. 230,000", transfer: "Rp. 230,000", renew: "Rp. 230,000" },
  { tld: ".company", minYears: 1, register: "Rp. 250,000", transfer: "Rp. 300,000", renew: "Rp. 300,000" },
  { tld: ".dev", minYears: 1, register: "Rp. 380,000", transfer: "Rp. 380,000", renew: "Rp. 380,000" },
  { tld: ".contractors", minYears: 1, register: "Rp. 450,000", transfer: "Rp. 450,000", renew: "Rp. 450,000" },
  { tld: ".stream", minYears: 1, register: "Rp. 100,000", transfer: "Rp. 577,000", renew: "Rp. 577,000" },
  { tld: ".men", minYears: 1, register: "Rp. 110,000", transfer: "Rp. 110,000", renew: "Rp. 110,000" },
  { tld: ".academy", minYears: 1, register: "Rp. 2,800,000", transfer: "Rp. 2,800,000", renew: "Rp. 2,800,000" },
  { tld: ".xyz", minYears: 1, register: "Rp. 60,000", transfer: "Rp. 215,000", renew: "Rp. 215,000" },
]

export default function DomainPrice() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPricing = domainPricingData.filter((item) =>
    item.tld.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Daftar Harga Domain</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari TLD (contoh: .com)"
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="max-h-[500px] overflow-y-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 bg-gray-50">TLD</th>
                <th className="px-6 py-3 bg-gray-50">Min. Tahun</th>
                <th className="px-6 py-3 bg-gray-50">Register</th>
                <th className="px-6 py-3 bg-gray-50">Transfer</th>
                <th className="px-6 py-3 bg-gray-50">Perpanjang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredPricing.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-blue-600">{item.tld}</td>
                  <td className="px-6 py-3 text-gray-500">{item.minYears}</td>
                  <td className="px-6 py-3 text-gray-900">{item.register}</td>
                  <td className="px-6 py-3 text-gray-500">{item.transfer}</td>
                  <td className="px-6 py-3 text-gray-500">{item.renew}</td>
                </tr>
              ))}
              {filteredPricing.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ditemukan domain dengan kata kunci "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-right">
        * Harga dalam Rupiah (IDR) dan dapat berubah sewaktu-waktu.
      </div>
    </div>
  )
}