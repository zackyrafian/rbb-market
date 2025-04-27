'use client';

import { useState } from 'react';

export default function AddProductForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    game: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const owner_id = '123e4567-e89b-12d3-a456-426614174000';
    const payload = {
      ...form,
      price: parseInt(form.price),
      owner_id,
    };

    const res = await fetch('http://localhost:8081/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Produk berhasil ditambahkan!');
      setForm({ title: '', description: '', price: '', game: '' });
    } else {
      alert('Gagal menambahkan produk!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="game"
          placeholder="Game (contoh: Mobile Legends)"
          value={form.game}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
}
