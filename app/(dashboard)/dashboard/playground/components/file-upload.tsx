"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  step?: number;
  setStep: (step: number) => void;
}

export default function FileUpload({ step, setStep }: FileUploadProps) {
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
        return;
      }
    
      // Create a FormData instance
      const formData = new FormData();
    
      // Append the file to the FormData instance
      formData.append('file', selectedFile);
    
      // Send the file to the backend
      try {
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData,
        // });
    
        // if (!response.ok) {
        //   throw new Error('File upload failed');
        // }
    
        // const data = await response.json();
        console.log('File uploaded successfully:');

        setStep(1);
      } catch (error) {
        console.error('File upload error:', error);
      }
    
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
          <span className="text-xs text-gray-500">PDF</span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input id="file" type="file" placeholder="File" accept="application/pdf" onChange={handleFileChange}  />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" 
        onClick={handleUploadClick}
        >
        Upload
        </Button>
      </CardFooter>
    </Card>
  )
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}