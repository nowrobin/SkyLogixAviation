'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('Submit');
  const [sent, setSent] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    await res.json();
    if (res.ok) {
      setStatus('Successful!');
      setSent(true)
      alert("Sussecegfull sent!!!")
    } else {
      setSent(true)
      alert(`Failed to Send Email Please Contact Us Directly`);
      setStatus(`Failed to Send Email Please Contact Us Directly`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto w-[520px]">
      <div className='pl-4'>Name<span className='text-red-500'>*</span></div>
      <input className='bg-gray-300 p-2 pl-4 text-black rounded-xl ring-0 outline-0' type="text" name="name" placeholder="name" onChange={handleChange} required />
      <div className='pl-4'>Email<span className='text-red-500'>*</span></div>
      <input className='bg-gray-300 p-2 pl-4 text-black rounded-xl ring-0 outline-0' type="email" name="email" placeholder="email" onChange={handleChange} required />
      <div className='pl-4'>Phone<span className='text-red-500'>*</span></div>
      <input className='bg-gray-300 p-2 pl-4 text-black rounded-xl ring-0 outline-0' type="text" name="phone" placeholder="phone" onChange={handleChange} required />
      <div className='pl-4'>Comment<span className='text-red-500'>*</span></div>
      <textarea className='bg-gray-300 p-2 pl-4 text-black rounded-xl ring-0 outline-0  min-h-[100px] resize-none' name="message" placeholder="comment" onChange={handleChange} required />
      <button type="submit" className={`flex ${sent ? 'bg-black text-[#FFBD59]' : 'bg-[#FFBD59] text-black'} rounded-xl w-[108px] self-center justify-center p-2  font-semibold hover:bg-black hover:text-[#FFBD59]`} disabled={sent}>{sent ? 'Already Sent' : status}</button>
    </form >
  );
}
