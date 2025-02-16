import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { uploadStatus } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/db";
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({  }) => {
      // This code runs on your server before upload
      const {getUser} = getKindeServerSession()
      const user = await getUser();
 
      // If you throw, the user will not be able to upload
      if (!user || !user.id) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://utfs.io/f/${file.key}`,
          uploadStatus: "PROCESSING"
        }
      })
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;