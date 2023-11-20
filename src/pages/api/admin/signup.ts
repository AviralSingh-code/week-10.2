// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from '../db';
import { generateToken } from '../tokenGenerator';
import { connectDb } from '../dbConnect';

type Data = {
  message?: string | null
  token?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await connectDb();
    const  admin = req.body;
    const result = await Admin.findOne({username: admin.username}); //findOne takes object as argument that is why we cannot write admin.username but we write username: admin.username
    if(result)
    {
      res.status(403).json({message: 'Admin already exists'});
    }
    else
    {
      const newAdmin = new Admin({username: admin.username, password: admin.password}); //to create a new entry
      await newAdmin.save(); //to put value to database
      const token = generateToken(admin);
      res.json({message: 'Admin created successfully', token});
    }
}
