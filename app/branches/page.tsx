import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MapPin, Phone, Mail } from 'lucide-react'

const branches = [
  {
    name: 'Dhaka Main Branch',
    nameBn: 'ঢাকা প্রধান শাখা',
    address: '78, Green Road (3rd Floor), Farmgate, Tejgaon, Dhaka-1205',
    phone: '09666775566',
    email: 'info@thechampions.edu',
  },
  // Add more branches as needed
]

export default function BranchesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
              আমাদের শাখাসমূহ
            </h1>
            <p className="text-xl text-neutral-600">
              Our Branches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{branch.nameBn}</h3>
                    <p className="text-sm text-neutral-600">{branch.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-700">{branch.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {branch.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-600 mb-4">
              আরও শাখা শীঘ্রই আসছে
            </p>
            <p className="text-sm text-neutral-500">
              More branches coming soon
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

