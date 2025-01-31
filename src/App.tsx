import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import OrganizationSetup from './components/OrganizationSetup';
import WebsiteScanner from './components/WebsiteScanner';
import ChatbotIntegration from './components/ChatbotIntegration';
import { Bot, Building2, Globe, Code } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Bot, title: 'Account Setup', component: AuthForm },
    { icon: Building2, title: 'Organization', component: OrganizationSetup },
    { icon: Globe, title: 'Website Scan', component: WebsiteScanner },
    { icon: Code, title: 'Integration', component: ChatbotIntegration },
  ];

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== steps.length - 1
                      ? 'flex-1'
                      : ''
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`flex-1 h-0.5 ${
                      index < steps.length - 1
                        ? index < currentStep
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                        : 'hidden'
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-around mt-2">
            {steps.map((step, index) => (
              <span
                key={index}
                className={`text-sm ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <CurrentComponent onComplete={() => setCurrentStep(currentStep + 1)} />
        </div>
      </div>
    </div>
  );
}

export default App;