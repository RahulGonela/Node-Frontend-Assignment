import React, { useState } from 'react';
import { Code, Mail, ExternalLink, Share2, AlertTriangle, X } from 'lucide-react';
import Confetti from 'react-confetti';

interface Props {
  onComplete?: () => void;
}

export default function ChatbotIntegration({ onComplete }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [integrationMethod, setIntegrationMethod] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [copied, setCopied] = useState(false);

  const dummyCode = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.beyondchats.com/chatbot.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','chatLayer','BC-XXXXX');
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dummyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl space-y-8">
      {/* Feedback Bar */}
      {showFeedback && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-50 p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">
                Chatbot not working as intended?{' '}
                <button className="underline font-medium">Share feedback</button>
              </span>
            </div>
            <button
              onClick={() => setShowFeedback(false)}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Chatbot Integration
        </h2>
        <p className="mt-2 text-gray-600">
          Choose how you'd like to integrate the chatbot
        </p>
      </div>

      {!integrationMethod && (
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => window.open('https://example.com', '_blank')}
            className="p-6 border rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <ExternalLink className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Test Chatbot</h3>
            <p className="text-gray-600 text-sm">
              Preview the chatbot on a demo website
            </p>
          </button>

          <button
            onClick={() => setIntegrationMethod('code')}
            className="p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <Code className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Manual Integration</h3>
            <p className="text-gray-600 text-sm">
              Copy and paste our code snippet
            </p>
          </button>

          <button
            onClick={() => setIntegrationMethod('email')}
            className="p-6 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <Mail className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Email Instructions</h3>
            <p className="text-gray-600 text-sm">
              Send to your developer
            </p>
          </button>
        </div>
      )}

      {integrationMethod === 'code' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Add to your &lt;head&gt; tag</span>
              <button
                onClick={handleCopyCode}
                className={`text-sm ${
                  copied ? 'text-green-400' : 'text-blue-400 hover:text-blue-300'
                } transition-colors`}
              >
                {copied ? 'Copied!' : 'Copy code'}
              </button>
            </div>
            <pre className="text-gray-300 text-sm overflow-x-auto p-4 bg-gray-800 rounded">
              {dummyCode}
            </pre>
          </div>

          <button
            onClick={() => {
              setShowSuccess(true);
              setShowFeedback(true);
            }}
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Test Integration
          </button>
        </div>
      )}

      {integrationMethod === 'email' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-medium mb-4">Send to Developer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Developer's Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  placeholder="developer@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes (optional)
                </label>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  rows={3}
                  placeholder="Any specific instructions..."
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSuccess(true)}
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Send Instructions
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
          <div className="text-center space-y-8 p-8 max-w-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              🎉 Integration Successful!
            </h2>
            <p className="text-xl text-gray-600">
              Your chatbot is now ready to help your customers
            </p>

            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <ExternalLink className="h-5 w-5" />
                Explore Admin Panel
              </button>
              
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                <ExternalLink className="h-5 w-5" />
                Start Talking to Your Chatbot
              </button>

              <div className="flex gap-4 justify-center mt-4">
                <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                {/* Add more social media buttons here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}