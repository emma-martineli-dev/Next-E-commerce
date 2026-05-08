"use client"

import { assets } from "@assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className='bg-[#050F1C]'>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-[#1E3A5F] text-slate-400">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-slate-200 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-orange-400 hover:underline transition" href="/">Home</a>
              </li>
              <li>
                <a className="hover:text-orange-400 hover:underline transition" href="/about">About us</a>
              </li>
              <li>
                <a className="hover:text-orange-400 hover:underline transition" href="/contact">Contact us</a>
              </li>
              <li>
                <a className="hover:text-orange-400 hover:underline transition" href="/contact">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-slate-200 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-650-450-8734</p>
              <p>emma00729mt@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-slate-500">
        Copyright 2025 © emma.codes All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
