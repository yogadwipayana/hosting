import { Link, useLocation } from "react-router"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  GlobeIcon, 
  Database01Icon, 
  Clock01Icon, 
  Search01Icon,
  ComputerIcon
} from "@hugeicons/core-free-icons"

const productCategories = [
  {
    title: "Hosting",
    items: [
      { id: "cloud", title: "Managed Hosting", href: "/produk/cloud", icon: GlobeIcon },
      { id: "vps", title: "VPS", href: "/produk/vps", icon: ComputerIcon },
    ]
  },
  {
    title: "Managed Services",
    items: [
      { id: "database", title: "Managed Database", href: "/produk/database", icon: Database01Icon },
    ]
  },
  {
    title: "Automation",
    items: [
      { id: "n8n", title: "n8n Automation", href: "/produk/n8n", icon: Clock01Icon },
    ]
  }
]

export function ProductsSidebar() {
  const location = useLocation();

  return (
    <div className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Search Products */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <HugeiconsIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
        </div>
        <Input 
          type="text" 
          placeholder="Cari produk..." 
          className="pl-9 h-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <Accordion type="multiple" defaultValue={["Hosting", "Managed Services", "Automation"]} className="w-full">
          {productCategories.map((category) => (
            <AccordionItem key={category.title} value={category.title} className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium text-muted-foreground hover:text-foreground">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pb-2">
                  {category.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-medium" 
                            : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                        }`}
                      >
                        <HugeiconsIcon icon={item.icon} size={16} />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
