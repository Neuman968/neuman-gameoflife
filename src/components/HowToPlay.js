import Button from "@material-ui/core/Button";
import HelpIcon from "@material-ui/icons/Help";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const HowToPlay = (props) => {
    const [open, setOpen] = React.useState(false);

    return (<>
        <Button
            style={{fontSize: "14px"}}
            {...props}
            onClick={() => setOpen(!open)}
        >
            How to Play
            <HelpIcon/>
        </Button>
        <Dialog
            open={open}
            onClose={() => setOpen(!open)}
        >
            <DialogTitle id="max-width-dialog-title">How to Play</DialogTitle>
            <DialogContent>
                <div>Hot to play...</div>
            </DialogContent>
        </Dialog>
    </>)
}

export default HowToPlay
