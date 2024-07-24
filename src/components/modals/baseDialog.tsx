import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { ReactNode } from "react";
import { TransitionProps } from "@mui/material/transitions/transition";

interface IConfirmDialogProps {
  Title?: string;
  children: ReactNode;
  handleClose?: () => void;
  Show?: boolean;
  maxWidth?: false | "sm" | "xs" | "md" | "lg" | "xl";
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BaseDialog = (props: IConfirmDialogProps) => {
  return (
    <Dialog
      open={props.Show || true}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth={props.maxWidth || "sm"}
      TransitionComponent={Transition}
      disableEnforceFocus={true}
    >
      {props.Title && <DialogTitle variant="h5">{props.Title}</DialogTitle>}
      {props.children}
    </Dialog>
  );
};
