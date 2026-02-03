import { useState } from 'react'
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { LogoMark } from "@/components/Logo"

// Menu data structured like the reference image
const menuData = {
  produk: {
    columns: [
      {
        title: "HOSTING",
        items: [
          { name: "Cloud Hosting", description: "Scalable cloud solution", href: "/products/cloud" }
        ],
      },
      {
        title: "MANAGED SERVICES",
        items: [
          { name: "Managed Database", description: "PostgreSQL, MySQL", href: "/products/database" }
        ],
      },
      {
        title: "AUTOMATION",
        items: [
          { name: "n8n Automation", description: "Workflow automation", href: "/products/n8n" }
        ],
        footer: { label: "Lihat Semua Produk →", href: "/products" },
      },
    ],
  },
  alat: {
    columns: [
      {
        title: "SERVER & HOSTING",
        items: [
          { name: "Website Uptime Checker", description: "Cek status website", href: "/tools/uptime-checker" }
        ],
      },
      {
        title: "SECURITY",
        items: [
          { name: "Password Generator", description: "Buat password kuat", href: "/tools/password-generator" }
        ],
      },
      {
        title: "DEVELOPER TOOLS",
        items: [
          { name: "QR Code", description: "Generate QR code", href: "/tools/qr-code" },
          { name: "Color Converter", description: "HEX, RGB, HSL", href: "/tools/color-converter" },
        ],
      },
      {
        title: "CONVERTERS",
        items: [
          { name: "Unix Timestamp", description: "Convert time", href: "/tools/unix-timestamp" },
        ],
        footer: { label: "Lihat Semua Alat →", href: "/tools" },
      },
    ],
  },
  edukasi: {
    columns: [
      {
        title: "TUTORIAL",
        items: [
          { name: "Getting Started", description: "Panduan pemula", href: "/education/getting-started" },
          { name: "Deploy Website", description: "Tutorial deploy", href: "/education/deploy" },
          { name: "Best Practices", description: "Tips & trik", href: "/education/best-practices" },
        ],
      },
      {
        title: "RESOURCES",
        items: [
          { name: "Blog", description: "Artikel terbaru", href: "/blog" },
          { name: "Documentation", description: "Panduan lengkap", href: "/docs" },
        ],
        footer: { label: "Lihat Semua Edukasi →", href: "/education" },
      },
    ],
  },
}

// List Item for mega menu
function ListItem({ title, description, href, ...props }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#006BFF]/10! hover:text-[#006BFF]! focus:bg-[#006BFF]/10! focus:text-[#006BFF]! active:bg-[#006BFF]/10! active:text-[#006BFF]!"
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {description && (
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

// Mega Menu Content Component
function MegaMenuContent({ columns }) {
  return (
    <div className="grid gap-6 p-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(180px, 1fr))` }}>
      {columns.map((column, index) => (
        <div key={index} className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground tracking-wider">
            {column.title}
          </h4>
          <ul className="space-y-1">
            {column.items.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                title={item.name}
                description={item.description}
                href={item.href}
              />
            ))}
          </ul>
          {column.footer && (
            <Link
              to={column.footer.href}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2"
            >
              {column.footer.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

// Navigation Component with Mega Menu
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="text-xl font-bold text-gray-900">BelajarHosting</span>
        </Link>

        {/* Desktop Navigation with Mega Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Beranda Link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-[#006BFF]/10! hover:text-[#006BFF]! focus:bg-[#006BFF]/10! focus:text-[#006BFF]!"
                >
                  Beranda
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Produk Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 bg-transparent! text-gray-700 hover:bg-[#006BFF]/10! hover:text-[#006BFF]! focus:bg-[#006BFF]/10! focus:text-[#006BFF]! data-[state=open]:bg-[#006BFF]/10! data-[state=open]:text-[#006BFF]! data-[state=open]:hover:bg-[#006BFF]/10!">
                Produk
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent columns={menuData.produk.columns} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Alat Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 bg-transparent! text-gray-700 hover:bg-[#006BFF]/10! hover:text-[#006BFF]! focus:bg-[#006BFF]/10! focus:text-[#006BFF]! data-[state=open]:bg-[#006BFF]/10! data-[state=open]:text-[#006BFF]! data-[state=open]:hover:bg-[#006BFF]/10!">
                Alat
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent columns={menuData.alat.columns} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Edukasi Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 bg-transparent! text-gray-700 hover:bg-[#006BFF]/10! hover:text-[#006BFF]! focus:bg-[#006BFF]/10! focus:text-[#006BFF]! data-[state=open]:bg-[#006BFF]/10! data-[state=open]:text-[#006BFF]! data-[state=open]:hover:bg-[#006BFF]/10!">
                Edukasi
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent columns={menuData.edukasi.columns} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-[#006BFF] hover:border-[#006BFF]">
            Masuk
          </Button>
          <Button size="sm" className="rounded-lg bg-[#006BFF] hover:bg-[#0055CC] text-white">
            Mulai Belajar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4">
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-base font-medium text-gray-900 hover:text-[#006BFF]">
              Beranda
            </Link>
            <Link to="/produk" className="text-base font-medium text-gray-600 hover:text-[#006BFF]">
              Produk
            </Link>
            <Link to="#alat" className="text-base font-medium text-gray-600 hover:text-[#006BFF]">
              Alat
            </Link>
            <Link to="#edukasi" className="text-base font-medium text-gray-600 hover:text-[#006BFF]">
              Edukasi
            </Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
              <Button variant="outline" className="w-full rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-[#006BFF] hover:border-[#006BFF]">
                Masuk
              </Button>
              <Button className="w-full rounded-lg bg-[#006BFF] hover:bg-[#0055CC] text-white">
                Mulai Belajar
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
