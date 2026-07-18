import { useState } from "react";
import Modal, { ModalFooter } from "../ui/Modal";
import Button from "../ui/Button";

interface Props {
  chapterId: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function CreatePageModal({ onConfirm, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch {
      setError("Failed to create page.");
      setSubmitting(false);
    }
  }

  return (
    <Modal open onClose={onClose} title="New page">
      <p className="text-body text-neutral-600 mb-4">
        This will add a new blank page to the end of the chapter.
      </p>
      {error && <p className="text-small text-danger-600 mb-4">{error}</p>}
      <ModalFooter>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="primary" loading={submitting} onClick={handleConfirm}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
}
