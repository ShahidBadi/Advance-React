// "use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@/app/generated/prisma';
import Libraryprofile from './libraryprofile';

export default async function ProfilePage() {
  const prisma =new PrismaClient();
  const cookiestore=cookies();
    const userid=cookiestore.get('userid')?.value;
    if(!userid){
      return <p>user not login</p>
    }
    const user=await prisma.user.findUnique({where:{id:userid}})

    
  return (
    <Libraryprofile user={user}></Libraryprofile>
  );
}
