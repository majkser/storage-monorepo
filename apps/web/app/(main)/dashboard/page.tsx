import { UploadButton } from '@/components/dashboard/upload-button';
import UploadedFiles from '@/components/dashboard/uploadedFiles';

export default function DashboardPage() {
  return (
    <>
      <div className="p-6 pt-0 md:pt-6 w-full max-w-[1200px] mx-auto flex flex-col gap-8 sm:flex-row justify-between items-center mb-4">
        <div>
          <h1 className="text-white h2">Uploaded Files</h1>
          <p className="text-muted-foreground">
            Here you can manage your files, download them or generate shareable
            links.
          </p>
        </div>
        <UploadButton />
      </div>
      <UploadedFiles />
    </>
  );
}
