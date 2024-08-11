'use client';

import React, { useState } from 'react';
import { storage } from '@/firebase';
import { Box, Button, CircularProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Upload as UploadIcon } from '@phosphor-icons/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface FileUploadStepProps {
  handleSubmit: () => void;
  handleBack: () => void;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({ handleSubmit, handleBack }) => {
  const { control, setValue } = useFormContext();
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    manuscriptLink: false,
    proofofPayment: false,
    otherDocsLink: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({
    manuscriptLink: '',
    proofofPayment: '',
    otherDocsLink: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const journalBaseURL = 'slujst';

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  };

  const handleFileUpload = async (files: FileList | null, fieldName: string) => {
    if (!files || files.length === 0) return;

    setUploading((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({ ...prev, [fieldName]: '' }));

    const file = files[0]; // Only handle single file upload for each field
    const uniqueId = uuidv4(); // Generate a unique identifier
    const sanitizedFileName = sanitizeFileName(file.name);
    const storageRef = ref(storage, `${fieldName}/${journalBaseURL}${uniqueId}_${sanitizedFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      const fileUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optionally, you can handle progress updates here
          },
          (error) => {
            console.error('File upload error:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });

      setValue(fieldName, fileUrl);
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: sanitizedFileName }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: 'Failed to upload file. Please try again.' }));
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = event.target.files;
    handleFileUpload(files, fieldName);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 3, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Manuscript File
      </Typography>
      <Controller
        name="manuscript"
        control={control}
        render={({ field }) => (
          <>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.divider}`,
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                mb: 3,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              component="label"
              aria-label="Upload Manuscript File"
              htmlFor="manuscript-file-input"
            >
              <input
                id="manuscript-file-input"
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, 'manuscript')}
                aria-describedby="manuscript-upload-status"
              />
              {uploading.manuscript ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CircularProgress size={24} />
                  <Typography variant="body2">Uploading...</Typography>
                </Stack>
              ) : uploadedFiles.manuscript ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CheckCircleIcon size={48} color="success" />
                  <Typography variant="subtitle2">{uploadedFiles.manuscript}</Typography>
                </Stack>
              ) : (
                <>
                  <UploadIcon size={48} />
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Upload Manuscript File
                  </Typography>
                </>
              )}
              {errors.manuscript && (
                <Typography id="manuscript-upload-status" variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.manuscript}
                </Typography>
              )}
            </Box>
          </>
        )}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Proof of Payment
      </Typography>
      <Controller
        name="proofofPayment"
        control={control}
        render={({ field }) => (
          <>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.divider}`,
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                mb: 3,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              component="label"
              aria-label="Upload Proof of Payment"
              htmlFor="proof-of-payment-file-input"
            >
              <input
                id="proof-of-payment-file-input"
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, 'proofofPayment')}
                aria-describedby="proof-of-payment-upload-status"
              />
              {uploading.proofofPayment ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CircularProgress size={24} />
                  <Typography variant="body2">Uploading...</Typography>
                </Stack>
              ) : uploadedFiles.proofofPayment ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CheckCircleIcon size={48} color="success" />
                  <Typography variant="subtitle2">{uploadedFiles.proofofPayment}</Typography>
                </Stack>
              ) : (
                <>
                  <UploadIcon size={48} />
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Upload Proof of Payment
                  </Typography>
                </>
              )}
              {errors.proofofPayment && (
                <Typography id="proof-of-payment-upload-status" variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.proofofPayment}
                </Typography>
              )}
            </Box>
          </>
        )}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Additional Documents
      </Typography>
      <Controller
        name="otherDocs"
        control={control}
        render={({ field }) => (
          <>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.divider}`,
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                mb: 3,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              component="label"
              aria-label="Upload Additional Documents"
              htmlFor="additional-docs-file-input"
            >
              <input
                id="additional-docs-file-input"
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, 'otherDocs')}
                aria-describedby="additional-docs-upload-status"
              />
              {uploading.otherDocs ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CircularProgress size={24} />
                  <Typography variant="body2">Uploading...</Typography>
                </Stack>
              ) : uploadedFiles.otherDocs ? (
                <Stack direction={isSmallScreen ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <CheckCircleIcon size={48} color="success" />
                  <Typography variant="subtitle2">{uploadedFiles.otherDocs}</Typography>
                </Stack>
              ) : (
                <>
                  <UploadIcon size={48} />
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Upload Additional Documents
                  </Typography>
                </>
              )}
              {errors.otherDocs && (
                <Typography id="additional-docs-upload-status" variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.otherDocs}
                </Typography>
              )}
            </Box>
          </>
        )}
      />

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
        <Button onClick={handleBack} variant="outlined">
          Back
        </Button>
        <Button type="button" onClick={handleSubmit} variant="contained">
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default FileUploadStep;
