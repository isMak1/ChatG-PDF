'use client'
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Inbox, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDropzone } from "react-dropzone";
import toast from 'react-hot-toast';

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post('/api/create-chat', {
        file_key,
        file_name
      });
      return response.data;
    },
  }) 

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({chat_id}) => {
            toast.success('chat has been created successfully');
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className='gap-y-10 opacity-50'>
      <div
        {...getRootProps({
          className: 'gap-y-2 border-dashed  rounded-xl cursor-pointer py-8  flex justify-center items-center sm:text-start flex-col animate-button bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900'
        })}>
        <input {...getInputProps()} />
        {(uploading || isPending) ? (
          <>
          {/* Loading state */}
          <Loader2 className="h-10 w-10 text-indigo-400 animate-spin" />
          <p className='mt-2 text-sm text-slate-400'>
            Feeding Context to GPT
          </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className='text-lg text-slate-800 font-medium'>Drop your PDF file here</p>
          </>
        )}

      </div>
    </div>
  )
}

export default FileUpload