"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const UploadButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v: boolean) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={()=> setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
        </Dialog>
    );
};

export default UploadButton;