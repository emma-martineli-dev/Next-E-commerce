/**
 * About Page
 * Describes the QuickCart brand, mission, core values, and team.
 */

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Image from "next/image";
import { assets } from "@assets/assets";
import SectionHeader from "@components/ui/SectionHeader";
import InfoCard from "@components/ui/InfoCard";

const STATS = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products Listed"  },
  { value: "50+",  label: "Brands Partnered" },
  { value: "99%",  label: "Satisfaction Rate" },
];

const VALUES = [
  { title: "Quality First",    desc: "Every product is vetted for quality. We only list items we would buy ourselves.",                          icon: "✦" },
  { title: "Customer Trust",   desc: "Transparent pricing, honest reviews, and no hidden fees — ever.",                                          icon: "✦" },
  { title: "Fast Delivery",    desc: "We partner with reliable logistics to get your order to you as quickly as possible.",                       icon: "✦" },
  { title: "Easy Returns",     desc: "Not satisfied? Our hassle-free return policy has you covered within 30 days.",                             icon: "✦" },
  { title: "Secure Payments",  desc: "Your payment data is always encrypted and protected with industry-standard security.",                     icon: "✦" },
  { title: "24/7 Support",     desc: "Our support team is always available to help you with any questions or issues.",                           icon: "✦" },
];

const TEAM = [
  { name: "Emma Carter", role: "Founder & CEO",    initials: "EC" },
  { name: "James Liu",   role: "Head of Product",  initials: "JL" },
  { name: "Sara Malik",  role: "Lead Engineer",    initials: "SM" },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section className="bg-[#050F1C] px-6 md:px-16 lg:px-32 py-20">
        <div className="max-w-3xl">
          <p className="text-orange-500 font-medium mb-3 tracking-wide uppercase text-sm">Who we are</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 leading-tight mb-6">
            We make tech shopping <span className="text-orange-500">simple</span> and fast.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            QuickCart is an electronics e-commerce platform built for people who value quality, speed,
            and a seamless shopping experience. From headphones to laptops, we bring the best tech
            products right to your door.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#071525] px-6 md:px-16 lg:px-32 py-14 border-y border-[#1E3A5F]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-orange-500">{stat.value}</p>
              <p className="text-slate-400 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-[#050F1C] px-6 md:px-16 lg:px-32 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Our Mission" heading="Bringing the best tech to everyone" />
            <p className="text-slate-400 leading-relaxed mt-5 mb-4">
              We believe great technology should be accessible to everyone. Our mission is to offer a
              curated selection of premium electronics at competitive prices, backed by a shopping
              experience that is fast, transparent, and trustworthy.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Every product on QuickCart is carefully selected for quality and value. We work directly
              with trusted brands and suppliers to ensure you always get the real deal.
            </p>
          </div>
          <div className="bg-[#0C1F35] rounded-2xl p-10 flex items-center justify-center border border-[#1E3A5F]">
            <Image src={assets.boy_with_laptop_image} alt="Person with laptop" className="w-full max-w-sm rounded-xl" />
          </div>
        </div>
      </section>

      {/* Core values grid */}
      <section className="bg-[#071525] px-6 md:px-16 lg:px-32 py-20 border-y border-[#1E3A5F]">
        <div className="text-center mb-12">
          <SectionHeader eyebrow="What drives us" heading="Our Core Values" centered />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((item) => (
            <InfoCard key={item.title}>
              <p className="text-orange-500 text-xl mb-3">{item.icon}</p>
              <h3 className="text-slate-100 font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      {/* Team section */}
      <section className="bg-[#050F1C] px-6 md:px-16 lg:px-32 py-20">
        <div className="text-center mb-12">
          <SectionHeader eyebrow="The people behind it" heading="Meet the Team" centered />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {TEAM.map((member) => (
            <InfoCard key={member.name} className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl mb-4">
                {member.initials}
              </div>
              <p className="text-slate-100 font-semibold">{member.name}</p>
              <p className="text-slate-500 text-sm mt-1">{member.role}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
