import { useState } from "react";
import Modal, { ModalFooter } from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  onConfirm: (name: string) => Promise<void>;
  onClose: () => void;
}

export default function CreateChapterModal({ onConfirm, onClose }: Props) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await onConfirm(name.trim());
      onClose();
    } catch {
      setError("Failed to create chapter.");
      setSubmitting(false);
    }
  }

  return (
    <Modal open onClose={onClose} title="New chapter">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chapter name"
          autoFocus
          error={error}
        />
        <ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={submitting} disabled={!name.trim()}>
            Create
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
