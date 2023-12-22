import { useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { arrayPictureSchema, materialSchema } from '../../../schema';
import { useState } from 'react';

import iconCross from '../../../assets/icon-cross.svg';

import 'react-dropzone-uploader/dist/styles.css';
import './styles.scss';

type Props = {
  arrayPicture: arrayPictureSchema[];
  setImagesToUpload: any;
  imagesToUpload: any;
  setValue: UseFormSetValue<materialSchema>;
  presentationPicture: string;
};

const ImportImageForm = ({
  arrayPicture,
  presentationPicture,
  setValue,
  setImagesToUpload,
  imagesToUpload,
}: Props) => {
  const [imageGroup, setImageGroup] =
    useState<arrayPictureSchema[]>(arrayPicture);

  const handleRemoveImage = (id: string) => {
    const updatedImages = arrayPicture.filter(
      (image) => image.id !== id
    );
    setValue('arrayPicture', updatedImages);

    setImagesToUpload((prev: any) => [
      ...prev.filter((file: any) => file.name !== id),
    ]);

    setImageGroup((prev) => [
      ...prev.filter((image) => image.id !== id),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {},
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const id = uuidv4();

        const newImages = {
          id: id,
          src: URL.createObjectURL(file),
        };

        setImageGroup((prev) => [...prev, newImages]);

        const updatedFile = new File([file], id, {
          type: file.type,
          lastModified: file.lastModified,
        });

        setImagesToUpload((prevFiles: File[]) => [
          ...prevFiles,
          updatedFile,
        ]);
      });
    },
  });

  const handleImageMain = (id: string) => {
    setValue('presentationPicture', id);
  };

  const thumbs =
    imageGroup.length > 0 &&
    imageGroup.map((item) => (
      <div
        className={`${
          presentationPicture.includes(item.id) ? 'image-main' : ''
        } thumbs-container`}
        key={item.id}
        onClick={() => handleImageMain(item.id)}
      >
        <div>
          <img src={item.src} alt={item.id} />
          <button
            type="button"
            onClick={() => handleRemoveImage(item.id)}
          >
            <img src={iconCross} alt="supprimer" />
          </button>
        </div>
      </div>
    ));

  return (
    <div className="add-image-form-container">
      <h4>Images</h4>

      {imageGroup.length > 0 && <aside>{thumbs}</aside>}

      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Cliquer pour ajouter des images</p>
      </div>
    </div>
  );
};

export default ImportImageForm;
