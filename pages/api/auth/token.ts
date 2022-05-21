import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { pick } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function graphQlProxy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req, res);
    res.json(pick(session, ['idToken', 'accessToken', 'accessTokenScope', 'accessTokenExpiresAt']));
  } catch (e) {
    if (!process.env.AUTH0_CLIENT_SECRET || !process.env.AUTH0_CLIENT_ID) {
      console.error('Error: No session. Is the environment correctly confiugred?');
    }

    console.error('Error: No session.');
  }
});
