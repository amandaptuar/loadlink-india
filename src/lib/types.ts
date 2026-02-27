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
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Durg', 'Bilaspur'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Manipur': ['Imphal', 'Thoubal', 'Churachandpur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Prayagraj'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Haldwani', 'Roorkee'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh'],
  'Chandigarh': ['Chandigarh'],
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

