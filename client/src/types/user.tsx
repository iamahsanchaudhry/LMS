// user.ts
export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
  enrolledCourses: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  user: UserType;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: UserType;  
}

export interface RegisterResponse {
  success: boolean;
  message: string; 
}
