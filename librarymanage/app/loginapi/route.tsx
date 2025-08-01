import {  PrismaClient } from "@/app/generated/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();
export async function POST(req:Request){
    console.log("api is called")
    try{
        console.log("inside try")
        const body=await req.json();
        console.log("body is:",body);
        const {userEmail,userPassword,userType}=body
        const user=await prisma.user.findUnique({
            where:{userEmail:userEmail},
        })
        console.log("user fetched",user);

        if(!user){
            return NextResponse.json({error:'user not found'},{status:404})
        }
        if(user.userPassword !== userPassword || user.userType !== userType ){
            console.log("Invalid");
            return NextResponse.json({error:'invalid password or usertype'},{status:401})
        }
       
        return NextResponse.json({message:'login successfull', userType: user.userType,},
            {status:200})
    }
    catch(err){
        return NextResponse.json({error:'error'},{status:500});
    }

}