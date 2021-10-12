import { ui, csv } from '../../../core';

export const onDrop = async (acceptedFiles: File[]) => {
  ui.setIsLoading(true);

  await ui.sleep(3000); // TODO REMOVE

  acceptedFiles.forEach((file) => {
     csv.parseFile(file)
  });

  ui.setIsLoading(false);
};
