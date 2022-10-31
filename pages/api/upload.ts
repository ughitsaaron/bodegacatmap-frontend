import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

async function uploadProxy(req: NextApiRequest, res: NextApiResponse) {
  // try {
  //   const session = await getSession(req, res);
  //   const url = new URL('/upload', process.env.BASE_URL);
  //   const response = await fetch(url, {
  //     body: req.body,
  //     method: 'post',
  //     credentials: 'include',
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       authorization: `Bearer ${session.idToken}`,
  //     },
  //   });
  //   res.status(response.status);
  //   res.json(await response.json());
  // } catch (e) {
  //   /* eslint-disable no-console */
  //   if (!process.env.AUTH0_CLIENT_SECRET || !process.env.AUTH0_CLIENT_ID) {
  //     console.error('Error: No session. Is the environment correctly confiugred?', e);
  //   }
  //   console.error('Error: No session.', e);
  //   res.status(500);
  //   res.json(e);
  //   /* eslint-enable */
  // }
}

export default withApiAuthRequired(uploadProxy);
