'use server';
import { cookies } from 'next/headers';

export async function getUserId() {
  const cookie = cookies().get('userID');
  if (cookie && typeof cookie.value !== 'undefined') {
    return cookie.value;
  }
}