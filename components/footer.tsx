import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="font-semibold text-gray-900">CloudHash</h4>
            <p className="mt-2 text-sm text-gray-600">
              Modern crypto cloud mining with performance, security, and delightful UX.
            </p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900">Product</h5>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/dashboard" className="text-gray-700 hover:text-emerald-700">Dashboard</Link></li>
              <li><Link href="/admin" className="text-gray-700 hover:text-emerald-700">Admin Panel</Link></li>
              <li><Link href="/login" className="text-gray-700 hover:text-emerald-700">Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900">Company</h5>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="#" className="text-gray-700 hover:text-emerald-700">Docs</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-emerald-700">Security</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-emerald-700">Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-600">
          © {new Date().getFullYear()} CloudHash. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
