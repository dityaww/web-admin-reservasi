import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ungaran.png"

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", linked: '/dashboard' },
    // { name: "Profile", linked: '/dashboard/profile'},
    { name: "Informasi Gunung", linked: '/dashboard/mount'},
    { name: "Regulation", linked: '/dashboard/regulation'},
    { name: "Pendakian", linked: '/dashboard/pendakian'},
    { name: "Rekap Pendakian", linked: '/dashboard/rekabpendakian'},
    { name: "Logout", linked: '/' },
  ];

  const logout = () => {
    const res = localStorage.removeItem('token')
    return res
  }

  const schedulePayments = ["Monthly Rent", "Food Payment", "Utility Bills"];

  return (
    <div className="h-screen border-r border-gray-200 bg-neutral-100 w-72 px-9 space-y-10">
      <div className="flex flex-row items-center pt-8 gap-3">
        <img src={logo} width={32} height={32} />
        <div className="font-extrabold text-2xl">Ungaran <span className="font-light">Hike</span></div>
      </div>
      <div className="space-y-24">
        <div>
          <div className="mb-4 text-indigo-700 font-bold text-[12px]">Menu</div>
          <ul className="space-y-7">
            {menu.map((val, index) => {
              return (
                <Link
                  to={val?.linked}
                  key={index}
                  onClick={() => {
                    val.name === 'Logout' && logout()
                  }}
                  className="flex flex-row items-center text-gray-400"
                >
                  <div>{val.name}</div>
                </Link>
              );
            })}
          </ul>
        </div>
        {/* <div>
          <div className="mb-7 text-indigo-700">Scheduled Payments</div>
          <div className="space-y-7">
            {schedulePayments.map((val, index) => {
              return (
                <div className="flex items-center text-gray-400">
                  <div className="h-4 w-4 border border-indigo-500 mr-4 rounded-full" />
                  {val}
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
