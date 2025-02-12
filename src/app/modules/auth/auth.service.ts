import { BaseClient, Issuer, UnknownObject, UserinfoResponse } from 'openid-client';

interface configOidcPing {
  url: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class AuthService {
  private client: BaseClient;

  constructor() {
    this.client = null as unknown as BaseClient;
  }

  async init(prmConfigOidcPing: configOidcPing): Promise<void> {
    const url = prmConfigOidcPing.url;
    const TrustIssuer: Issuer<BaseClient> = await Issuer.discover(
    `${url}/.well-known/openid-configuration`,
    );

    this.client = new TrustIssuer.Client({
        client_id: prmConfigOidcPing.clientId,
        client_secret: prmConfigOidcPing.clientSecret,
        redirect_uris: [prmConfigOidcPing.redirectUri],
        token_endpoint_auth_method: 'client_secret_post',
        introspection_endpoint_auth_method: 'client_secret_basic'
    });
  }

  getClient(): BaseClient {
    if (!this.client) {
      throw new Error('OIDC Client not initialized');
    }
    return this.client;
  }

  async getUserInfo(prmAccessToken: string): Promise<UserinfoResponse<UnknownObject, UnknownObject>> {
    return await this.client.userinfo(prmAccessToken);
  }

  async isAccessTokenValid(prmAccessToken: string): Promise<boolean> {
      return (await this.client.introspect(prmAccessToken)).active;
  }
}