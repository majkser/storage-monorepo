import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export function AllFilesCheckbox() {
  return (
    <div>
      <Checkbox
        id="all-files"
        label="Select all files"
        className="scale-200 mr-10 hover:bg-secondary/25 hover:cursor-pointer"
      />
    </div>
  );
}
