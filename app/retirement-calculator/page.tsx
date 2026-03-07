import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RetirementCalculator from '@/components/RetirementCalculator'

export const metadata = {
  title: 'Retirement Calculator | Pankh — Wings to Financial Freedom',
  description: 'Plan your retirement corpus with India\'s most comprehensive calculator. Covers MF, NPS, PPF, EPF, insurance gaps and monthly SIP needed.',
}

export default function RetirementCalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pankh-navy to-pankh-navy-light">
        <RetirementCalculator />
      </main>
      <Footer />
    </>
  )
}
