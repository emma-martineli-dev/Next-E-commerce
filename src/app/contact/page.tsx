"use client";

/**
 * Contact Page
 * Provides contact information, a message form, and an FAQ section.
 */

import { useState } from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import SectionHeader from "@components/ui/SectionHeader";
import InfoCard from "@components/ui/InfoCard";
import toast from "react-hot-toast";

/** Shared input/textarea class for consistent form field styling */
const INPUT_CLASS =
  "w-full px-4 py-3 bg-[#071525] border border-[#1E3A5F] rounded-lg text-slate-300 placeholder-slate-600 outline-none focus:border-orange-500 transition";

const CONTACT_INFO = [
  { icon: "📞", title: "Phone",          lines: ["+1-650-450-8734", "Mon–Fri, 9am–6pm EST"]                                    },
  { icon: "✉️", title: "Email",          lines: ["emma00729mt@gmail.com", "We reply within 24 hours"]                          },
  { icon: "📍", title: "Address",        lines: ["123 Tech Avenue", "San Francisco, CA 94105", "United States"]                },
  { icon: "🕐", title: "Business Hours", lines: ["Monday – Friday: 9am – 6pm", "Saturday: 10am – 4pm", "Sunday: Closed"]      },
];

const FAQ_ITEMS = [
  { q: "How long does shipping take?",       a: "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout."    },
  { q: "What is your return policy?",        a: "We offer a 30-day hassle-free return policy. Items must be in original condition and packaging."      },
  { q: "Do you ship internationally?",       a: "Currently we ship within the United States. International shipping is coming soon."                   },
  { q: "How can I track my order?",          a: "Once your order ships, you'll receive a tracking number via email. You can also view it in My Orders." },
  { q: "Is my payment information secure?",  a: "Yes. All payments are processed through Stripe with industry-standard SSL encryption."                },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section className="bg-[#050F1C] px-6 md:px-16 lg:px-32 py-20">
        <div className="max-w-2xl">
          <p className="text-orange-500 font-medium mb-3 tracking-wide uppercase text-sm">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 leading-tight mb-6">
            We'd love to <span className="text-orange-500">hear</span> from you.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Have a question, feedback, or just want to say hello? Fill out the form below or reach us
            directly through any of our contact channels.
          </p>
        </div>
      </section>

      {/* Contact info cards + message form */}
      <section className="bg-[#050F1C] px-6 md:px-16 lg:px-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left column: contact info cards */}
          <div className="space-y-6">
            {CONTACT_INFO.map((item) => (
              <InfoCard key={item.title} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <h3 className="text-slate-200 font-semibold">{item.title}</h3>
                </div>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-slate-400 text-sm">{line}</p>
                ))}
              </InfoCard>
            ))}
          </div>

          {/* Right column: contact form */}
          <div className="lg:col-span-2 bg-[#0C1F35] border border-[#1E3A5F] rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">Send us a message</h2>
            <p className="text-slate-500 text-sm mb-8">Fields marked with * are required.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5">Full Name *</label>
                  <input type="text" placeholder="John Doe" className={INPUT_CLASS}
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className={INPUT_CLASS}
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-1.5">Subject</label>
                <input type="text" placeholder="How can we help?" className={INPUT_CLASS}
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-1.5">Message *</label>
                <textarea rows={6} placeholder="Write your message here..." className={`${INPUT_CLASS} resize-none`}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              <button type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-[#071525] px-6 md:px-16 lg:px-32 py-20 border-t border-[#1E3A5F]">
        <div className="text-center mb-12">
          <SectionHeader eyebrow="Quick answers" heading="Frequently Asked Questions" centered />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item) => (
            <InfoCard key={item.q}>
              <p className="text-slate-200 font-medium mb-2">{item.q}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
