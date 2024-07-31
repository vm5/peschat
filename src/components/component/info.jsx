"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import emailjs from 'emailjs-com'; // Import EmailJS
import './styles.css'; // Import the CSS file

export default function ConnectPESChatbot() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    idCard: null,
    role: '',
    company: '',
    contactMethod: ''
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for email
    const emailData = {
      name: formData.name,
      srn: formData.srn,
      role: formData.role,
      company: formData.company,
      contactMethod: formData.contactMethod,
    };

    // Log formData to check if it contains expected values
    console.log('Form Data:', formData);

    // Send data via EmailJS
    emailjs.send('service_skcxg47', 'template_9pyhzgb', emailData, 'bZNzwiq7H32zsXN_e')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setStep(2);
        setMessage('Your answer has reached the concerned person. Thank you for taking some time out to answer the query!');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setMessage('Failed to send your information. Please try again.');
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="grid md:grid-cols-[260px_1fr] min-h-screen w-full bg-gradient-to-r from-orange-400 via-blue-500 to-blue-700 text-gray-800">
        <div className="hidden md:flex flex-col side-component shadow-lg p-4 rounded-lg">
          <Button variant="ghost" className="justify-start w-full gap-2 px-2 text-left">
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gray-200">
              <BotIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap text-gray-700">ConnectPES</div>
         
          </Button>
          <div className="mt-4 text-gray-600">
            <p>Dear Alumni, Welcome to ConnectPES! If you are here to answer a query please fill in the following details so that query can be answered:</p>
          </div>
        </div>
        <div className="flex flex-col items-start flex-1 p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Full Name:</label>
                <Textarea name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name of the person you are answering to:</label>
                <Textarea name="srn" value={formData.srn} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your answer:</label>
                <Textarea name="role" value={formData.role} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
            
              <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Submit</Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BotIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function PenIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}