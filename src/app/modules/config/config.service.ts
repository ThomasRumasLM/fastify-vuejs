export interface Secrets {
  'OIDC_ISSUER': string
  'OIDC_CLIENT_SECRET': string
  'OIDC_CLIENT_ID': string
  'OIDC_REDIRECT_URI': string
  'SECURE_COOKIE'?: string
  'COOKIE_SECRET_KEY': string
}

export class ConfigService {
  private readonly secrets: Secrets

  constructor() {
    this.secrets = {
      'OIDC_CLIENT_ID': process.env.OIDC_CLIENT_ID || 'client_id',
      'OIDC_CLIENT_SECRET': process.env.OIDC_SECRET || 'client_secret',
      'OIDC_ISSUER': process.env.OIDC_ISSUER || 'http://localhost:8080/adeomock',
      'OIDC_REDIRECT_URI': process.env.OIDC_REDIRECT_URI || 'http://localhost:3000/auth/callback',
      'SECURE_COOKIE': process.env.SECURE_COOKIE || 'false',
      'COOKIE_SECRET_KEY': process.env.COOKIE_SECRET_KEY || 'my-secret-key'
    }
  }

  get(key: keyof Secrets): string | undefined{
    return this.secrets[key]
  }

  getAll(): Secrets {
    return this.secrets
  }
}
