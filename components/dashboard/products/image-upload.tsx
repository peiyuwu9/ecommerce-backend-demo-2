"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, XCircle } from "lucide-react";

import { MAX_IMAGE_UPLOAD } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

export interface ImageUploadProps {
  currentFiles: ImageObjectType[];
  disabled: boolean;
  onAdd: (files: ImageObjectType[]) => void;
  onRemove: (file: ImageObjectType) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentFiles,
  disabled,
  onAdd,
  onRemove,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    disabled: disabled || currentFiles.length > 2,
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      if (currentFiles.length + acceptedFiles.length > MAX_IMAGE_UPLOAD) {
        toast.error("Upload maximum 3 images");
        return;
      }
      const fileArray = acceptedFiles.map((file) => {
        return { file, url: URL.createObjectURL(file) };
      });
      onAdd(fileArray);
    },
  });

  function handleRemove(index: number) {
    onRemove(currentFiles[index]);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      currentFiles.forEach((file) => {
        if (!file.file) URL.revokeObjectURL(file.url);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div
        {...getRootProps({
          className: `${cn(
            "dropzone w-full md:w-1/3 p-5 flex flex-col items-center text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl",
            currentFiles.length + 1 > MAX_IMAGE_UPLOAD && "bg-gray-100"
          )}`,
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud
          className={`${cn(
            "h-11 w-11 text-brand-background",
            currentFiles.length + 1 > MAX_IMAGE_UPLOAD && "text-gray-400"
          )}`}
        />
        {currentFiles.length + 1 > MAX_IMAGE_UPLOAD ? (
          <p className="h-12 py-3">Upload maximum {MAX_IMAGE_UPLOAD} images</p>
        ) : (
          <>
            <p>Drag files here</p>
            <p>
              or{" "}
              <button
                type="button"
                className="text-brand-background"
                onClick={open}
                disabled={disabled}
              >
                click here
              </button>{" "}
              to upload
            </p>
          </>
        )}
      </div>
      <aside className="w-full md:w-2/3 flex flex-wrap gap-2">
        {currentFiles.map((file, index) => (
          <div
            key={index}
            className="h-32 w-32 relative flex items-center justify-center border rounded-md shadow-sm"
          >
            <XCircle
              className="h-5 w-5 absolute top-0 right-0 text-destructive z-10 bg-white border-white border-2 rounded-full"
              onClick={() => handleRemove(index)}
            />
            <div className="h-28 w-28 relative">
              <Image src={file.url} alt={file.url} fill={true} />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export { ImageUpload };
