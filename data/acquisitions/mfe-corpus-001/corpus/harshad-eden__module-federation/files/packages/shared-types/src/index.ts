export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'underwriter' | 'employer' | 'provider';
  permissions: string[];
}

export interface Policy {
  id: string;
  policyNumber: string;
  type: 'health' | 'life' | 'disability' | 'dental' | 'vision';
  status: 'draft' | 'active' | 'expired' | 'cancelled';
  premium: number;
  coverage: Coverage[];
  policyholder: Policyholder;
  effectiveDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coverage {
  id: string;
  type: string;
  amount: number;
  deductible: number;
  description: string;
}

export interface Policyholder {
  id: string;
  type: 'individual' | 'group';
  name: string;
  email: string;
  phone: string;
  address: Address;
  dateOfBirth?: string;
  employeeCount?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Quote {
  id: string;
  policyType: Policy['type'];
  requestedCoverage: Coverage[];
  estimatedPremium: number;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  validUntil: string;
  createdAt: string;
  applicant: Policyholder;
}

export interface Claim {
  id: string;
  policyId: string;
  claimNumber: string;
  type: string;
  amount: number;
  status: 'submitted' | 'under_review' | 'approved' | 'denied' | 'paid';
  dateOfLoss: string;
  submittedAt: string;
  description: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Provider {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'specialist';
  address: Address;
  phone: string;
  email: string;
  specialties: string[];
  networkStatus: 'in_network' | 'out_of_network';
}

export interface RiskAssessment {
  id: string;
  applicantId: string;
  riskScore: number;
  factors: RiskFactor[];
  recommendation: 'approve' | 'reject' | 'review';
  assessedBy: string;
  assessedAt: string;
}

export interface RiskFactor {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  score: number;
}

export interface Product {
  id: string;
  name: string;
  type: Policy['type'];
  description: string;
  basePremium: number;
  coverageOptions: Coverage[];
  eligibilityRules: EligibilityRule[];
  isActive: boolean;
}

export interface EligibilityRule {
  id: string;
  type: string;
  condition: string;
  value: any;
  description: string;
}