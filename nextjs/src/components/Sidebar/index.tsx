import Link from "next/link";
import React from "react";

const menu = [
  {
    id: 1,
    name: "Home",
    path: "/homepage",
  },
  {
    id: 2,
    name: "Test",
    path: "/list-test",
  },
  {
    id: 3,
    name: "On-going Ticket",
    path: "/list-test",
  },
  {
    id: 4,
    name: "Request Ticket",
    path: "/list-test",
  },
  {
    id: 5,
    name: "History Ticket",
    path: "/list-test",
  },
  {
    id: 6,
    name: "Settings",
    path: "/list-test",
  },

];
const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-slate-950 text-white text-base-content">
        <h1 className="font-bold text-white text-4xl text-center py-8">TEST</h1>
        {/* Sidebar content here */}
        {menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path} className="text-white">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
