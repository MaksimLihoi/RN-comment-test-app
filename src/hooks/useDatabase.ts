import {useEffect, useState} from 'react';
import db from '../database/database';

export interface Comment {
  id: number;
  user_id: number;
  comment: string;
  parent_id: number | null;
  created_at: string;
  username: string;
}

interface UseDatabaseReturn {
  comments: Comment[];
  addComment: (userId: number, comment: string) => void;
  fetchMoreComments: () => void;
}

const useDatabase = (): UseDatabaseReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);

  const fetchComments = (pageNumber: number = 1) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Comments.*, Users.username FROM Comments
         JOIN Users ON Comments.user_id = Users.id
         WHERE parent_id IS NULL
         ORDER BY created_at DESC
         LIMIT 25 OFFSET ${(pageNumber - 1) * 25}`,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setComments(prevComments =>
            pageNumber === 1 ? rows : [...prevComments, ...rows],
          );
        },
        error => {
          console.error('Ошибка при получении комментариев:', error.message);
        },
      );
    });
  };

  const addComment = (userId: number, comment: string) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Comments (user_id, comment) VALUES (?, ?)',
        [userId, comment],
        () => {
          fetchComments(page);
        },
        error => {
          console.error('Ошибка при добавлении комментария:', error.message);
        },
      );
    });
  };

  const fetchMoreComments = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {comments, addComment, fetchMoreComments};
};

export default useDatabase;
