import { use } from 'react';
import { SelectedFilesContext } from '@/context/selectedFilesContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function FileAccessForm() {
  const { selectedFiles, clearSelectedFiles } = use(SelectedFilesContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    console.log('Sharing files with:', email);

    postFileAccesss(email);
  }

  async function postFileAccesss(email: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file-access/give-access`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            fileIds: selectedFiles.map((file) => file.id),
          }),
        }
      );

      if (!response.ok) {
        toast.error('Error sharing files');
      } else {
        toast.success('Files shared successfully');
      }
    } catch (error) {
      console.error('Error sharing files:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white p-4 bg-secondary/10 rounded-lg ml-4 w-1/5"
    >
      <h3 className="text-xl font-semibold mb-4">Share Files</h3>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 rounded bg-secondary/20 text-white"
          required
        />
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2">
          Selected files ({selectedFiles.length}):
        </p>
        {selectedFiles.length > 0 ? (
          <>
            <ul className="max-h-60 overflow-y-auto">
              {selectedFiles.map((file) => (
                <li key={file.id} className="mb-1 text-sm">
                  {file.originalName}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="destructive"
              onClick={clearSelectedFiles}
            >
              Clear selection
            </Button>
          </>
        ) : (
          <p className="text-gray-400">No files selected</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={selectedFiles.length === 0}
        className="w-full"
      >
        Share Files
      </Button>
    </form>
  );
}
