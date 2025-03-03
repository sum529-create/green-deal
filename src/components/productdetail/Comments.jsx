import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useUserStore from '../../store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '../../api/commentService';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetComments } from '../../hooks/useComment';

const Comments = ({ seller }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const productId = +id;

  const currentUser = useUserStore((state) => state.user); // 로그인한 사용자 정보

  // 댓글 목록 가져오기
  const { data: comments = [], isLoading, error } = useGetComments(productId);

  // 댓글 추가
  const addCommentMutation = useMutation({
    mutationFn: ({ content }) =>
      addComment({ productId, content, userId: currentUser.id }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-sm">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-black">
          댓글/문의 <span className="text-deep-mint">{comments.length}개</span>
        </p>
        {/* 댓글 입력 폼 */}
        <CommentForm
          productId={productId}
          addCommentMutation={addCommentMutation}
        />
      </div>

      {/* 댓글 목록 */}
      <CommentList
        comments={comments}
        seller={seller}
        updateCommentMutation={updateCommentMutation}
        deleteCommentMutation={deleteCommentMutation}
      />
    </div>
  );
};

export default Comments;
