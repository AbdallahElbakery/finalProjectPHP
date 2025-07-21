export interface UserAddress {
  country?: string;
  city?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  full_address?: string;
  address?: UserAddress | string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfileResponse {
  user: UserProfile;
  message?: string;
  status?: string;
} 