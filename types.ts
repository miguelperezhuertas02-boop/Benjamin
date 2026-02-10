import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface CompanyData {
  whoWeAre: string;
  mission: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}