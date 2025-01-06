"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailTokens, passwordResetTokens, users,twoFactorTokens } from "../schema";
import crypto from "crypto"

// grab the virification token of the existing user to delete it
export const getVerificationTokenByEmail = async (email: string) => {
  const verificationToken = await db.query.emailTokens.findFirst({
    where: eq(emailTokens.token, email),
  });
  return verificationToken;
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // user aleady has a token
  // check if the token existes and delete it
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
};

// verify if the token in the email-token tabel in databse
export const newVerificationToken = async (token: string) => {
  const existingToken = await getVerificationTokenByEmail(token);
  if (!existingToken) {
    return { error: "Token not found" };
  }

  //check if the token is expired

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!existingUser) return { error: "Email does not exists" };

  // if the user exists => update the emailverified column in users table

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email,
  });

  // delete the emailtoken value from the email-token table in db

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));

  // finish
  return { success: "Email verified" };
};



export const getPasswordResetTokenByEmail = async (email: string) => {

    try {
        const passwordResetToken = await db.query.passwordResetTokens.findFirst({
            where : eq(passwordResetTokens.email, email)

        })
        return passwordResetToken
        
    } catch {
         return null
    }

}
 
export const getPasswordResetTokenByToken = async (token: string) => {
    try {
      const passwordResetToken = await db.query.passwordResetTokens.findFirst({
        where: eq(passwordResetTokens.token, token),
      })
      return passwordResetToken
    } catch {
      return null
    }
  }


  
export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // password reset token aleady exists find it & delete it
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id));
    }

    const passwordResetToken = await db
      .insert(passwordResetTokens)
      .values({
        email,
        token,
        expires,
      }).returning();
    return passwordResetToken;
    
  } catch  {
    return null;
  }
};




// Tow factor token

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email),
    })
    return twoFactorToken
  } catch {
    return null
  }
}


export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString()
    //Hour Expiry
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, existingToken.id));
    }

    const twoFactorToken = await db
      .insert(twoFactorTokens)
      .values({
        email,
        token,
        expires,
      }).returning();
    return twoFactorToken;
    
  } catch  {
    return null;
  }
};
