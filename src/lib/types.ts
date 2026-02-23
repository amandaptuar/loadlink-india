export type UserRole = 'company' | 'driver' | 'admin';

export type LoadStatus = 'posted' | 'accepted' | 'picked' | 'in_transit' | 'delivered' | 'completed';

export const TRUCK_TYPES = [
  'Open Body', 'Container', 'Trailer', 'Tanker', 'Tipper',
  'LCV', 'Mini Truck', 'Flatbed', 'Refrigerated',
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh',
] as const;

export const MAJOR_CITIES: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
  'Telangana': ['Hyderabad', 'Warangal'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat'],
};

export interface Load {
  id: string;
  companyName: string;
  pickupCity: string;
  pickupState: string;
  dropCity: string;
  dropState: string;
  material: string;
  weight: number;
  truckType: string;
  price: number;
  pickupDate: string;
  status: LoadStatus;
  distance?: number;
}

export interface Notification {
  id: string;
  text: string;
  textHi?: string;
  read: boolean;
  time: string;
}

export const STATUS_CONFIG: Record<LoadStatus, { label: string; labelHi: string; color: string }> = {
  posted: { label: 'Posted', labelHi: 'पोस्ट किया', color: 'bg-status-posted' },
  accepted: { label: 'Accepted', labelHi: 'स्वीकार', color: 'bg-status-accepted' },
  picked: { label: 'Picked Up', labelHi: 'लोड हुआ', color: 'bg-status-picked' },
  in_transit: { label: 'In Transit', labelHi: 'रास्ते में', color: 'bg-status-transit' },
  delivered: { label: 'Delivered', labelHi: 'पहुँचा', color: 'bg-status-delivered' },
  completed: { label: 'Completed', labelHi: 'पूरा हुआ', color: 'bg-status-completed' },
};

