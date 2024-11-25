import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    // Here you would typically send the form data to a backend or email service
  };

  return (
    <div className="container mx-auto my-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {/* Contact Information Section */}
      <div className="mb-8">
        <p>If you have any questions or inquiries, feel free to reach out to us!</p>
        <p className="mt-4">Email: contact@forever.com</p>
        <p>Phone: +0883257791</p>
        <p>Address: 123 Forever St, Some City, Country</p>
      </div>

      {/* Contact Form Section */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-left font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-left font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-left font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
