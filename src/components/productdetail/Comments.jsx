import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useGetComments } from '../../hooks/useComment';

const Comments = ({ seller }) => {
  const { id } = useParams();
  const productId = +id;

  // 댓글 목록 가져오기
  const { data: comments = [], isLoading, error } = useGetComments(productId);

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="rounded-[8px] px-[16px] py-[20px] lg:px-[30px] border-[1px] border-light-gray lg:rounded-[15px] mt-10">
      <p className="mb-[20px] font-semibold text-black text-title-sm">
        댓글/문의
        <span className="text-deep-mint text-text-md ml-[10px]">
          {comments.length}개
        </span>
      </p>
      <div className="lg:pl-[8px]">
        {/* 댓글 입력 폼 */}
        <CommentForm productId={productId} />

        {/* 댓글 목록 */}
        <CommentList comments={comments} seller={seller} />
      </div>
    </div>
  );
};

export default Comments;
