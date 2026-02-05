import { Link } from "react-router"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  GlobeIcon, 
  LockPasswordIcon, 
  QrCodeIcon, 
  ColorsIcon, 
  Clock01Icon, 
  Search01Icon
} from "@hugeicons/core-free-icons"

// Tool data grouped by category
const toolCategories = [
  {
    title: "Server & Hosting",
    count: 10,
    items: [
      { id: "uptime-checker", title: "Website Uptime Checker", href: "/alat/uptime-checker", icon: GlobeIcon },
    ]
  },
  {
    title: "Security & Encryption",
    count: 3,
    items: [
      { id: "password-generator", title: "Password Generator", href: "/alat/password-generator", icon: LockPasswordIcon },
    ]
  },
  {
    title: "Data Encoding & Formatting",
    count: 3,
    items: [
      { id: "color-converter", title: "Color Converter", href: "/alat/color-converter", icon: ColorsIcon },
      { id: "unix-timestamp", title: "Unix Timestamp", href: "/alat/unix-timestamp", icon: Clock01Icon },
    ]
  },
  {
    title: "Developer Utilities",
    count: 8,
    items: [
      { id: "qr-code", title: "QR Code", href: "/alat/qr-code", icon: QrCodeIcon },
    ]
  }
]

/**
 * ToolsSidebar Component
 * Reusable sidebar for tools pages with search and categorized navigation
 * 
 * @param {string} activeToolId - The ID of the currently active tool (e.g., "color-converter")
 */
export function ToolsSidebar({ activeToolId }) {
  return (
    <div className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Search Tools */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <HugeiconsIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
        </div>
        <Input 
          type="text" 
          placeholder="Cari tools..." 
          className="pl-9 h-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <Accordion type="multiple" defaultValue={["Server & Hosting", "Security & Encryption", "Data Encoding & Formatting", "Developer Utilities"]} className="w-full">
          {toolCategories.map((category) => (
            <AccordionItem key={category.title} value={category.title} className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium text-muted-foreground hover:text-foreground">
                {category.title} ({category.count})
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pb-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        item.id === activeToolId
                          ? "bg-blue-100 text-blue-700 font-medium" 
                          : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                      }`}
                    >
                      <HugeiconsIcon icon={item.icon} size={16} />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
