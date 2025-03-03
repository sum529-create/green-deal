import React, { useState } from 'react';
import useUserStore from '../../store/userStore';
import { supabase } from '../../api/client';
import Button from '../common/Button';

const CommentForm = ({ productId, addCommentMutation }) => {
  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const [content, setContent] = useState('');

  //댓글 추가 로직
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content) return;

    addCommentMutation.mutate({ content });
    setContent('');
  };

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-5 p-4 border rounded-lg border-light-gray"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요."
        className="w-full p-3 mt-2 text-sm bg-white rounded-lg resize-none focus:ring-1 focus:ring-mint focus:outline-none"
      ></textarea>
      <Button type="submit" size="medium">
        등록
      </Button>
    </form>
  );
};

export default CommentForm;
