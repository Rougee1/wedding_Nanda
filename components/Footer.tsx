import { coupleName } from '@/app/config'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20" style={{ backgroundColor: '#6b1a2a', borderTop: '2px solid #5a1520' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-cream-50 font-serif">
            {coupleName}
          </p>
          <p className="text-xs text-cream-100">
            © {currentYear} - Made with ❤️ for our special day
          </p>
        </div>
      </div>
    </footer>
  )
}

