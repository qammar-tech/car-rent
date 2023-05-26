import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV,
  ticketDomain: process.env.APP_TICKET_DOMAIN,
  marketplaceDomain: process.env.APP_MARKETPLACE_DOMAIN,
}));
