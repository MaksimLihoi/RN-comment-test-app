export interface Comment {
  id: number;
  user_id: number;
  comment: string;
  parent_id: number | null;
  created_at: string;
  username: string;
}
