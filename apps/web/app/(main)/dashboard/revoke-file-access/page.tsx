'use client';

import type React from 'react';

import { useState } from 'react';
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

export default function RevokeFileAccessPage() {
  const [email, setEmail] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  async function fetchUserCurrentFiles(email = 'freetylelove@gmail.com') {
    const files = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file-access/get-access/${email}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(files.json());
  }

  fetchUserCurrentFiles();
  // TODO: Replace with actual files from the server - apply this function

  const files = [
    { id: '1', name: 'project-proposal.pdf', type: 'PDF', size: '2.4 MB' },
    { id: '2', name: 'financial-report.xlsx', type: 'Excel', size: '1.8 MB' },
    { id: '3', name: 'presentation.pptx', type: 'PowerPoint', size: '5.2 MB' },
    { id: '4', name: 'design-assets.zip', type: 'Archive', size: '12.1 MB' },
    { id: '5', name: 'meeting-notes.docx', type: 'Word', size: '0.8 MB' },
  ];

  const handleFileToggle = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.id));
    }
  };

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

  const selectedFilesData = files.filter((file) =>
    selectedFiles.includes(file.id)
  );

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
          <form onSubmit={handleRevokeAccess} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                User Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

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
                  {selectedFiles.length === files.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Button>
              </div>
              <Card className="p-4">
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={file.id}
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => handleFileToggle(file.id)}
                      />
                      <label
                        htmlFor={file.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <FileText className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="font-medium">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {file.type} • {file.size}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {selectedFilesData.length > 0 && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <p className="font-medium text-sm">
                      Selected Files ({selectedFilesData.length}):
                    </p>
                    {selectedFilesData.map((file) => (
                      <div key={file.id} className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.type} • {file.size}
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
