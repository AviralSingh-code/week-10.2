// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from '../db';
import { connectDb } from '../dbConnect';

type Data = {
  name?: string
  msg?: string
  username?: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await connectDb();
    const admin = await Admin.findOne({username: req.body.username});
    if(!admin)
    {
      res.json({username: null});                                //this is to handle error
      // res.status(403).json({msg: "Admin doesn't exist"});
    }
    else{
        res.json({
            username: admin.username
        })
    }
}
