import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { BaseDialog } from "./baseDialog";
import Button from "@mui/material/Button";
import { showService } from "../../services/showService";
import { IShow } from "../../models/showModel";

interface IConfirmationModalProps {
  show: IShow;
  handleClose: (reload?: boolean) => void;
}
export function ConfirmationModal(props: IConfirmationModalProps) {
  const [removeResponse, removeShow] = useResource(showService.removeShow);
  const { enqueueSnackbar } = useSnackbar();
  // plant deleted
  useEffect(() => {
    if (removeResponse.data) {
      props.handleClose(true);
    }
    if (removeResponse.error) {
      enqueueSnackbar(
        removeResponse.error.data || removeResponse.error.message,
        {
          variant: "error",
        }
      );
    }
    // eslint-disable-next-line
  }, [removeResponse]);

  const handleDeleteButtonClick = () => {
    removeShow(props.show.showId!);
  };

  return (
    <BaseDialog Title="Remove Show" handleClose={props.handleClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove
          <strong>&nbsp;{props.show?.showName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          disabled={removeResponse.isLoading}
          onClick={handleDeleteButtonClick}
          startIcon={<DeleteIcon />}
        >
          Remove
        </Button>
        <Button
          onClick={() => props.handleClose()}
          sx={{ marginLeft: 1 }}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}
