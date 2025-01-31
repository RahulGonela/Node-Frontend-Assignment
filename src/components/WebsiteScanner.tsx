import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import type { WebPage } from '../types';

interface Props {
  onComplete: () => void;
}

const dummyPages: WebPage[] = [
  {
    url: '/about',
    status: 'scraped',
    title: 'About Us',
    chunks: [
      'Our company was founded in 2020 with a vision to revolutionize customer service through AI.',
      'We specialize in developing cutting-edge AI solutions that help businesses scale their customer support.',
      'Our team consists of experts in machine learning, natural language processing, and customer experience.',
    ],
  },
  {
    url: '/products',
    status: 'pending',
    title: 'Products & Services',
    chunks: [],
  },
  {
    url: '/pricing',
    status: 'scraped',
    title: 'Pricing Plans',
    chunks: [
      'We offer flexible pricing plans to suit businesses of all sizes.',
      'Enterprise solutions available with custom integrations and dedicated support.',
    ],
  },
  {
    url: '/contact',
    status: 'failed',
    title: 'Contact Us',
    chunks: [],
  },
];

export default function WebsiteScanner({ onComplete }: Props) {
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [pages, setPages] = useState(dummyPages);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Website Scanning</h2>
        <p className="mt-2 text-gray-600">
          We're analyzing your website to train the chatbot
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Scanning Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out"
          ></div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Detected Pages</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Scraped</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Pending</span>
              </span>
              <span className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-600">Failed</span>
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {pages.map((page) => (
            <div key={page.url} className="p-4 hover:bg-gray-50 transition-colors">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedPage(expandedPage === page.url ? null : page.url)
                }
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(page.status)}
                  <div>
                    <h4 className="font-medium">{page.title}</h4>
                    <p className="text-sm text-gray-500">{page.url}</p>
                  </div>
                </div>
                {page.status === 'failed' ? (
                  <button className="text-sm text-red-600 hover:text-red-700">
                    Retry
                  </button>
                ) : (
                  expandedPage === page.url ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )
                )}
              </div>

              {expandedPage === page.url && (
                <div className="mt-4 pl-9">
                  {page.status === 'failed' ? (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>Failed to access this page. Please check the URL and try again.</span>
                    </div>
                  ) : page.status === 'pending' ? (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      <Clock className="h-5 w-5" />
                      <span>This page is currently being processed...</span>
                    </div>
                  ) : (
                    <>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Scraped Content
                      </h5>
                      <div className="space-y-2">
                        {page.chunks.map((chunk, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                          >
                            {chunk}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onComplete}
          className="flex-1 py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Continue to Integration
        </button>
        <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
          Wait for Completion
        </button>
      </div>
    </div>
  );
}