import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <Dialog onClose={goBack} open={true}>
      <DialogTitle>Uh, oh</DialogTitle>
      <DialogContent>
        <DialogContentText>{"We couldn't find oh shit"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goBack}>Go Back</Button>
      </DialogActions>
    </Dialog>
  );
}
