import { jwtVerify } from "jose";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  audio: f({
    audio: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      try {
        let token = req.cookies.get("token");
        await jwtVerify(
          token?.value!,
          new TextEncoder().encode(process.env.JWT_PASS)
        );
        return { userId: null };
      } catch (error) {
        throw Error("Invalid Token");
      }
    })
    .onUploadComplete(() => {}),
  image: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      try {
        let token = req.cookies.get("token");
        await jwtVerify(
          token?.value!,
          new TextEncoder().encode(process.env.JWT_PASS)
        );
        return { userId: null };
      } catch (error) {
        throw Error("Invalid Token");
      }
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
