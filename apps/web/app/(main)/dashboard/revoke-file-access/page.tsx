'use client';

import type React from 'react';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, FileText, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { File } from '@/app/types/fileInterface';

export default function RevokeFileAccessPage() {
  const [email, setEmail] = useState('');
  const [userFiles, setUserFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  async function fetchUserCurrentFiles(email: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file-access/get-access/${email}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user files');
      }

      const filesIds = await response.json();

      const files: File[] = await Promise.all(
        filesIds.map(async (fileId: string) => {
          return await getFileData(fileId);
        })
      );

      return files;
    } catch (error) {
      console.error('Error fetching user files:', error);
      return [];
    }
  }

  async function getFileData(fileId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/files/${fileId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch file data');
      }

      const fileData = await response.json();
      return fileData;
    } catch (error) {
      console.error('Error fetching file data:', error);
      return null;
    }
  }

  async function handleGetUserFiles(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const files = await fetchUserCurrentFiles(formData.get('email') as string);

    setUserFiles(files);
    setSelectedFiles([]);
  }

  const handleFileToggle = (file: File) => {
    setSelectedFiles((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === userFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(userFiles.map((file) => file));
    }
  };

  // TODO: implement actual logic of handle revoke function and devide the component into smaller ones
  const handleRevokeAccess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || selectedFiles.length === 0) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields and select at least one file.',
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fileCount = selectedFiles.length;
      const fileText = fileCount === 1 ? 'file' : 'files';
      setMessage({
        type: 'success',
        text: `Access to ${fileCount} ${fileText} successfully revoked for ${email}`,
      });

      setEmail('');
      setSelectedFiles([]);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to revoke file access. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 pt-0 md:pt-6 w-full max-w-[1200px] mx-auto mb-4">
        <h1 className="text-white h2">File Access</h1>
        <p className="text-muted-foreground">
          Here you can manage file access permissions. Use the form to grant
          access to specific files for users by their email address.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Revoke Access
          </CardTitle>
          <CardDescription>
            Remove a user's access to one or more files by entering their email
            address and selecting the files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <form onSubmit={(event) => handleGetUserFiles(event)}>
              <Label htmlFor="email" className="text-sm font-medium">
                User Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="user@example.com"
                className="w-full"
                required
              />
              <Button type="submit">Get user files</Button>
            </form>
          </div>
          <form onSubmit={handleRevokeAccess} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Select Files * ({selectedFiles.length} selected)
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedFiles.length === userFiles.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Button>
              </div>
              <Card className="p-4">
                <div className="space-y-3">
                  {userFiles.map((file: File) => (
                    <div key={file.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={file.id}
                        checked={selectedFiles.includes(file)}
                        onCheckedChange={() => handleFileToggle(file)}
                      />
                      <label
                        htmlFor={file.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <FileText className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {file.originalName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {file.mimetype} • {file.size}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {selectedFiles.length > 0 && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <p className="font-medium text-sm">
                      Selected Files ({selectedFiles.length}):
                    </p>
                    {selectedFiles.map((file: File) => (
                      <div key={file.id} className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.originalName}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.mimetype} • {file.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Revoking Access...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Revoke Access to{' '}
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} File${
                        selectedFiles.length === 1 ? '' : 's'
                      }`
                    : 'Files'}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {message && (
        <Alert
          className={
            message.type === 'error' ? 'border-destructive' : 'border-green-500'
          }
        >
          {message.type === 'error' ? (
            <AlertCircle className="h-4 w-4 text-destructive" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          )}
          <AlertDescription
            className={
              message.type === 'error' ? 'text-destructive' : 'text-green-500'
            }
          >
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Card className="mt-6 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Important Information
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Revoking file access is immediate and cannot be undone. The user
                will lose access to all selected files immediately after
                confirmation. To restore access, you'll need to grant
                permissions again through the file access settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
