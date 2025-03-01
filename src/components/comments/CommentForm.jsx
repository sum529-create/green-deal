import React, { useState } from 'react';
import useUserStore from '../../store/userStore';
import { supabase } from '../../api/client';
import Button from '../common/Button';

const CommentForm = ({ productId, setComments }) => {
  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const [newComment, setNewComment] = useState('');

  //댓글 추가 로직
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      user_id: currentUser?.id, // 로그인한 유저 id
      product_id: productId,
    };

    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select();

    if (error) {
      console.error('댓글 추가 에러: ', error);
    } else {
      setComments((prev) => [data[0], ...prev]); // 새 댓글 추가
      setNewComment(''); // 입력 필드 초기화
    }
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="flex items-center gap-5 p-4 border rounded-lg border-light-gray"
    >
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
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
