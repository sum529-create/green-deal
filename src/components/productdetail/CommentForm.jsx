import React, { useState } from 'react';
import useUserStore from '../../store/userStore';
import Button from '../common/Button';
import { useAddComment } from '../../hooks/useComment';

const CommentForm = ({ productId }) => {
  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const [content, setContent] = useState('');

  // 댓글 추가
  const addCommentMutation = useAddComment(productId);

  //댓글 추가 로직
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    addCommentMutation.mutate({ content });
    setContent('');
  };

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-5 px-[10px] py-[10px] mb-[20px] rounded-[5px] lg:px-[22px] lg:py-[18px] border lg:rounded-[12px] border-light-gray lg:mb-[36px]"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요."
        className="w-full text-sm bg-white resize-none focus:outline-none"
      ></textarea>
      <Button type="submit" size="medium">
        등록
      </Button>
    </form>
  );
};

export default CommentForm;
