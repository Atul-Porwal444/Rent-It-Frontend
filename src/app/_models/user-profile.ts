export interface UserProfile {
    name: string;
    email: string;
    gender?: string; // Optional fields marked with ?
    location?: string;
    bio?: string;
    dob?: string;
    phone?: string;
    occupation?: string;
    profileUrl?: string;
  }