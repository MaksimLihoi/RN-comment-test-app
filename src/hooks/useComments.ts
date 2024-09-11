import {useEffect, useState} from 'react';
import db from '../database/database';
import {Comment} from '../types/comentTypes.ts';

interface CommentHook {
  comments: Comment[];
  addComment: (
    userId: number,
    comment: string,
    commentId?: number | null,
  ) => void;
  fetchMoreComments: () => void;
  fetchReplies: (parentId: number) => Promise<Comment[]>;
}

const useComments = (): CommentHook => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);

  const fetchComments = (pageNumber: number = 1) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Comments.*, Users.username FROM Comments
         JOIN Users ON Comments.user_id = Users.id       
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

  const addComment = (
    userId: number,
    comment: string,
    parentId: number | null = null,
  ) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Comments (user_id, comment, parent_id) VALUES (?, ?, ?)',
        [userId, comment, parentId],
        () => {
          fetchComments(page);
        },
        error => {
          console.error('Ошибка при добавлении комментария:', error.message);
        },
      );
    });
  };

  const fetchReplies = (parentId: number): Promise<Comment[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT Comments.*, Users.username FROM Comments
           JOIN Users ON Comments.user_id = Users.id
           WHERE parent_id = ?
           ORDER BY created_at DESC`,
          [parentId],
          (_, results) => {
            const rows = results.rows.raw();
            resolve(rows);
          },
          error => {
            reject(error);
            console.error('Ошибка при получении ответов:', error.message);
          },
        );
      });
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

  return {comments, addComment, fetchMoreComments, fetchReplies};
};

export default useComments;
