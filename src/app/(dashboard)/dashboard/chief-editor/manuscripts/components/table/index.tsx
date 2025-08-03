import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';

interface Manuscript {
  id: string;
  title: string;
  author: string;
  coAuthor: string;
  createdAt: string;
  status: string;
}

interface ManuscriptTableProps {
  manuscripts: Manuscript[];
  onAssign: (id: string) => void;
  onDelete: (id: string) => void;
}

const ManuscriptTable: React.FC<ManuscriptTableProps> = ({
  manuscripts,
  onAssign,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);

  const handleView = (manuscript: Manuscript) => {
    setSelectedManuscript(manuscript);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManuscript(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Co-Author</TableCell>
              <TableCell>Date Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {manuscripts.map((manuscript) => (
              <TableRow key={manuscript.id}>
                <TableCell>{manuscript.title}</TableCell>
                <TableCell>{manuscript.author}</TableCell>
                <TableCell>{manuscript.coAuthor}</TableCell>
                <TableCell>{new Date(manuscript.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{manuscript.status}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Chip
                      label="View"
                      color="primary"
                      onClick={() => handleView(manuscript)}
                      clickable
                    />
                    <Chip
                      label="Assign"
                      variant="outlined"
                      color="primary"
                      onClick={() => onAssign(manuscript.id)}
                      clickable
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selectedManuscript && (
          <>
            <DialogTitle>Manuscript Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6">{selectedManuscript.title || 'N/A'}</Typography>
              <Typography variant="subtitle1">Author: {selectedManuscript.author || 'N/A'}</Typography>
              <Typography variant="subtitle1">Co-Author: {selectedManuscript.coAuthor || 'N/A'}</Typography>
              <Typography variant="subtitle1">
                Date Submitted: {selectedManuscript.createdAt ? new Date(selectedManuscript.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
              <Typography variant="subtitle1">Status: {selectedManuscript.status || 'N/A'}</Typography>
            </DialogContent>
            <DialogActions>
              <Chip
                label="Delete"
                color="secondary"
                onClick={() => {
                  onDelete(selectedManuscript.id);
                  handleClose();
                }}
                clickable
              />
              <Chip label="Close" color="default" onClick={handleClose} clickable />
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ManuscriptTable;
