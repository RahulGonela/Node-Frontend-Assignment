export interface User {
  name: string;
  email: string;
  verified: boolean;
}

export interface Organization {
  name: string;
  website: string;
  description: string;
}

export interface WebPage {
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  chunks: string[];
  title: string;
}

export interface SetupStep {
  id: number;
  title: string;
  completed: boolean;
}