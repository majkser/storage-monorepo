import { use } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectedFilesContext } from '@/context/selectedFilesContext';
import { File } from '@/app/types/fileInterface';

export function AllFilesCheckbox(file: File) {
  const { toggleFileSelection, isFileSelected } = use(SelectedFilesContext);

  return (
    <div>
      <Checkbox
        id="all-files"
        checked={isFileSelected(file)}
        onCheckedChange={() => toggleFileSelection(file)}
        className="scale-200 mr-10 hover:bg-secondary/25 hover:cursor-pointer"
      />
    </div>
  );
}
