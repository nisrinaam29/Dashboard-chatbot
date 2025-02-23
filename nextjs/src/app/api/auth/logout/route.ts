"use server";
import { cookies } from "next/headers";

import { jwtDecode } from 'jwt-decode'

import generalResponse from '@/libs/generalResponse'
import type { UserTypes } from '@/types/UserTypes'
import User from '@/libs/models/User'

export async function POST(req:Request) {
  try {
    const token = req.headers.get('authorization') || ''
    const decoded: UserTypes = jwtDecode(token)
  

      const user= await User.update(
        { status: '0' }, // Set status to 0
        { where: {
          id: decoded.id
        } } // Use the user's ID from the token
      );
     

    cookies().delete("token");

    return generalResponse(200, true, "Anda berhasil keluar", user)
  } catch (error: any) {
    return generalResponse(
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
}
