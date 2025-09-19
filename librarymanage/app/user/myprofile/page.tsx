// 'use client';

import { PrismaClient } from '@/app/generated/prisma';
import { cookies } from 'next/headers';
import Userprofile from './userprofile';

export default async function MyProfilePage() {
  const prisma=new PrismaClient();
  const cookiestore=cookies();
  const userid=cookiestore.get('userid')?.value;
  if(!userid){
    return <p>user not login</p>
  }
  const user=await prisma.user.findUnique({where:{id:userid}})
  return (
    <Userprofile user={user}></Userprofile>
  );
}
