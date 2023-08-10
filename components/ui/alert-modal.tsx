"use client";

import useIsMounted from "@/hooks/useIsMounted";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export interface AlertModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export { AlertModal };
