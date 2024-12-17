import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import github from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google, github],
});
