import React, { useState } from 'react';
import { Building2, Globe, FileText } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function OrganizationSetup({ onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
  });

  const fetchMetaDescription = async (url: string) => {
    if (!url) return;
    setLoading(true);
    // Simulate API call to fetch meta description
    setTimeout(() => {
      setDescription('We are a leading provider of innovative solutions, dedicated to transforming businesses through cutting-edge technology and exceptional service.');
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Setup Organization</h2>
        <p className="mt-2 text-gray-600">
          Tell us about your business to customize your chatbot
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Website
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                required
                value={formData.website}
                onChange={(e) => {
                  setFormData({ ...formData, website: e.target.value });
                  fetchMetaDescription(e.target.value);
                }}
                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Description
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px] transition-colors"
                placeholder="Tell us about your company..."
              />
            </div>
            {loading && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                Fetching website description...
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Continue to Website Scanning
        </button>
      </form>
    </div>
  );
}