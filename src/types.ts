export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: string;
}

export type ToastMessage = {
  id: number;
  message: string;
} | null;
