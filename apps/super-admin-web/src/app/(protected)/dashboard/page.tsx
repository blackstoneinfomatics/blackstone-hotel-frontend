"use client";

import {
  Bell,
  Search,
  TrendingUp,
  Users,
  Wallet,
  Package,
  ArrowUpRight,
  MoreHorizontal,
  Menu,
} from "lucide-react";

interface DashboardProps {
  onMenuClick: () => void;
}

export default function Dashboard({
  onMenuClick,
}: DashboardProps) {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-[#0F172A] min-h-screen">

      {/* Header */}
<div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#111827] lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">

  {/* Left */}
<div className="flex items-center gap-3">

  {/* Mobile Menu */}
  <button
    onClick={onMenuClick}
    className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
  >
    <Menu size={24} />
  </button>

  <div>
    <h1 className="text-2xl font-bold text-slate-800 dark:text-white lg:text-3xl">
      Dashboard
    </h1>

    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 lg:text-base">
      Welcome back! Heres whats happening today.
    </p>
  </div>

</div>

  {/* Right */}
  <div className="flex flex-wrap items-center gap-3">

    {/* Search */}
    <div className="relative hidden md:block">
      <Search
        className="absolute left-4 top-3 text-slate-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search..."
        className="w-64 rounded-xl border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 outline-none dark:border-white/10 dark:bg-[#1E293B] lg:w-72"
      />
    </div>

    {/* Notification */}
    <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#1E293B]">
      <Bell size={20} />
      <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>
    </button>

    {/* Profile */}
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-[#1E293B]">
      <div className="hidden sm:block">
        <h3 className="font-semibold dark:text-white">
          Rahul
        </h3>

        <p className="text-sm text-slate-500">
          Super Admin
        </p>
      </div>
    </div>

  </div>

</div>
      {/* Body */}

      <div className="space-y-8 p-4 md:p-6 lg:p-8">

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              title: "Total Users",
              value: "12,540",
              color: "bg-blue-500",
              icon: Users,
            },
            {
              title: "Revenue",
              value: "$84,220",
              color: "bg-green-500",
              icon: Wallet,
            },
            {
              title: "Orders",
              value: "3,421",
              color: "bg-orange-500",
              icon: Package,
            },
            {
              title: "Growth",
              value: "+18%",
              color: "bg-purple-500",
              icon: TrendingUp,
            },
          ].map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="flex justify-between">

                  <div>

                    <p className="text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-4 text-3xl font-bold dark:text-white">
                      {card.value}
                    </h2>

                    <div className="mt-5 flex items-center gap-2 text-green-500 text-sm">

                      <ArrowUpRight size={16} />

                      +12.8%

                    </div>

                  </div>

                  <div
                    className={`${card.color} h-14 w-14 rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="text-white" />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Chart + Activity */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Chart */}

          <div className="xl:col-span-2 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 p-6">

            <div className="flex justify-between">

              <h2 className="font-semibold text-xl dark:text-white">
                Revenue Analytics
              </h2>

              <button>

                <MoreHorizontal />

              </button>

            </div>

            <div className="mt-8 h-[340px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-400">

              Chart Area

            </div>

          </div>

          {/* Activity */}

          <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 p-6">

            <h2 className="text-xl font-semibold dark:text-white mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              {[
                "New Admin Added",
                "Module Updated",
                "Role Permission Changed",
                "User Deleted",
                "Backup Completed",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>

                  <div>

                    <h4 className="font-medium dark:text-white">
                      {item}
                    </h4>

                    <p className="text-sm text-slate-500">
                      2 mins ago
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Table */}

        {/* <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold dark:text-white">
              Recent Users
            </h2>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              View All
            </button>

          </div>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b dark:border-white/10">

                  <th className="py-4 text-left">Name</th>
                  <th className="py-4 text-left">Email</th>
                  <th className="py-4 text-left">Role</th>
                  <th className="py-4 text-left">Status</th>

                </tr>

              </thead>

              <tbody>

                {[
                  ["Rahul", "rahul@mail.com", "Admin", "Active"],
                  ["John", "john@mail.com", "Manager", "Active"],
                  ["David", "david@mail.com", "Editor", "Inactive"],
                  ["Alex", "alex@mail.com", "User", "Active"],
                ].map((user) => (
                  <tr
                    key={user[1]}
                    className="border-b dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-5">{user[0]}</td>
                    <td>{user[1]}</td>
                    <td>{user[2]}</td>
                    <td>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                        {user[3]}
                      </span>

                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div> */}

      </div>

    </main>
  );
}