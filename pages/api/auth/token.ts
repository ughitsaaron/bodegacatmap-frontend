import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { pick } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function graphQlProxy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  res.json(pick(session, ['idToken', 'accessToken', 'accessTokenScope', 'accessTokenExpiresAt']));
});
