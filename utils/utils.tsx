import createCustomer from '@/hygraph/cart/create-user';
import getCustomerByEmail from '@/hygraph/cart/get-user';
import { compare, hash } from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions: AuthOptions = {
  pages: {
    signIn: '/account/signin',
    signOut: '/',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getCustomerByEmail(email);
        if (!user) {
          const newUser = await createCustomer({
            data: {
              email,
              password: await hash(password, 12),
            },
          });
          return {
            id: newUser.id,
            email: newUser.email,
          };
        }

        const isValid = await compare(password, user.password as string);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
};
