"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Boxes,
  ShieldCheck,
  Users,
  UserRound,
  HelpCircle,
  X,
  Bot
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onCollapse: () => void;
}

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "#",
  },
  {
    title: "Modules",
    icon: Boxes,
    href: "#",
    active: true,
  },
  {
    title: "Permission",
    icon: ShieldCheck,
    href: "#",
  },
  {
    title: "Roles",
    icon: UserRound,
    href: "#",
  },
  {
    title: "Users",
    icon: Users,
    href: "#",
  },
];

export default function Sidebar({
  open,
  collapsed,
  onClose,
  onCollapse,
}: SidebarProps) {
    
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
<aside
  className={`
    fixed top-0 left-0 z-30
    flex h-screen flex-col
    bg-[#111827] text-white
    transition-all duration-300

    ${collapsed ? "w-28" : "w-62"}

    ${open ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
  `}
>

{/* Logo Header */}
<div
  className={`relative flex items-center border-b border-white/10 ${
    collapsed
      ? "justify-center py-5"
      : "justify-between px-6 py-5"
  }`}
>

  {/* Logo */}
  <div className="flex items-center gap-3">
    
  <Bot size={30} className="text-orange-500" />

    {!collapsed && (
      <div>
        <h1 className="text-xl font-bold tracking-wide">
          BLACKSTONE
        </h1>

        <p className="text-xs text-slate-400">
          AI
        </p>
      </div>
    )}
  </div>

  {/* Desktop Collapse Button */}
  <button
    onClick={onCollapse}
    className={`hidden rounded-lg p-2 hover:bg-slate-700 lg:block ${
      collapsed ? "absolute right-2" : ""
    }`}
  >
    {collapsed ? (
      <ChevronRight size={18} />
    ) : (
      <ChevronLeft size={18} />
    )}
  </button>

  {/* Mobile Close */}
  <button
    onClick={onClose}
    className="absolute right-4 rounded-lg p-2 hover:bg-slate-700 lg:hidden"
  >
    <X size={20} />
  </button>
</div>

        {/* Profile */}
        <div className="mt-7 px-4">
  <div
    className={`flex items-center rounded-2xl border border-[#343030] bg-[#151313] p-3
    ${collapsed ? "justify-center" : "gap-3"}`}
  >
<div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#B8EAFF]">
  <Image
    src="/assests/profile1.png"
    alt="Profile"
    width={44}
    height={44}
    className="h-full w-full rounded-full object-cover"
  />
</div>

            {!collapsed && (
  <div>
              <h3 className="text-lg font-semibold">
                Rahul
              </h3>

              <p className="text-xs text-[#606264]">
                Super Admin
              </p>
              </div>
)}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex-1 px-3">
          <ul className="space-y-2">
            {menus.map((item, index) => {
              const Icon = item.icon;

              return (
                <li key={index}>
                  <Link
  href={item.href}
  onClick={onClose}
  className={`
    group flex items-center rounded-xl border-l-4 py-4 transition-all duration-300

    ${
      collapsed
        ? "justify-center px-0"
        : "gap-3 px-4"
    }

    ${
      item.active
        ? "border-[#F2911A] bg-[#2B1F14] text-[#F2911A]"
        : "border-transparent text-gray-400 hover:border-[#F2911A] hover:bg-[#2B1F14] hover:text-[#F2911A]"
    }
  `}
>
                    <Icon
                      size={20}
                      className={
                        item.active
                          ? "text-[#F2911A]"
                          : "text-gray-500 group-hover:text-[#F2911A]"
                      }
                    />

                    {!collapsed && (
  <span className="text-[15px] font-medium">
    {item.title}
  </span>
)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help Card */}
        <div className="p-5">
          <div
  className={`flex rounded-2xl p-3
  ${collapsed ? "justify-center" : "items-center gap-3"}`}
>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#353232]">
              <HelpCircle
                size={20}
                className="text-white"
              />
            </div>

            {!collapsed && (
  <div>
              <h4 className="text-sm font-semibold text-white">
                Need Help?
              </h4>

              <p className="text-xs text-[#64748B]">
                Contact our support team
              </p>
              </div>
)}
          </div>
        </div>
      </aside>
    </>
  );
}