import React from 'react';
import UploadedFiles from '@/components/dashboard/uploadedFiles';

export default function page() {
  return (
    <div>
      <div className="p-6 pt-0 md:pt-6 w-full max-w-[1200px] mx-auto mb-4">
        <h1 className="text-white h2">File Access</h1>
        <p className="text-muted-foreground">
          Here you can manage file access permissions. Use the form to grant
          access to specific files for users by their email address.
        </p>
      </div>
      <UploadedFiles />
    </div>
  );
}
