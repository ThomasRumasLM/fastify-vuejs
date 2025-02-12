export interface UserResponse {
    sub: string;
    aud: string[];
    nbf: number;
    iss: string;
    name: string;
    exp: number;
    given_name: string;
    iat: number;
    family_name: string;
    jti: string;
    email: string;
  }