export interface GoogleUser {
  name: string;
  email: string;
  picture?: string; // 선택적
  publicId: string;
  role: string;
  provider: string;
}
