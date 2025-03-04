import React, { useState } from 'react';
import Button from '../common/Button';
import useUserStore from '../../store/userStore';
import { useDeleteComment, useUpdateComment } from '../../hooks/useComment';

const CommentList = ({ comments, seller, productId }) => {
  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useUserStore((state) => state.user);
  const [editingCommentId, setEditingCommentId] = useState(null); //현재 수정 중인 댓글 id 상태
  const [editContent, setEditContent] = useState(''); // 수정할 댓글 내용 상태

  // 댓글 수정
  const updateCommentMutation = useUpdateComment(productId);
  // 댓글 삭제
  const deleteCommentMutation = useDeleteComment(productId);

  // 댓글 수정 클릭시 호출
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id); // 수정할 댓글 id
    setEditContent(comment.content); // 기존 댓글 내용 입력필드에 설정
  };

  // 댓글 수정 완료 후 저장시 호출
  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;

    updateCommentMutation.mutate({
      commentId,
      content: editContent,
    });
    setEditingCommentId(null);
  };

  // 댓글 삭제시 호출
  const handleRemoveComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    deleteCommentMutation.mutate(commentId);
  };

  return (
    <ul className="flex flex-col gap-[20px]">
      {/* map으로 뿌리기 */}
      {comments.length > 0 ? (
        comments.map((comment) => {
          // 댓글 작성자 찾기
          const user = comment.users;

          // 현재 로그인한 사용자가 댓글 작성자인지 확인
          const isAuthor = currentUser?.id === comment.user_id;

          // 상품 작성자와 댓글 작성자가 같은지 확인
          const isProductOwnerComment =
            seller && user?.user_id === seller.user_id;

          return (
            <li
              key={comment.id}
              className={`py-[16px] px-[12px] lg:px-[22px] border rounded-[12px] border-light-gray`}
            >
              <div className="flex flex-col justify-between gap-3 lg:flex-row">
                <div className="flex items-start w-full gap-3">
                  {/* 프로필이미지 */}
                  <img
                    src={user.profile_img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-deep-mint"
                  />
                  <div className="w-full text-black ">
                    <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                      {/* 작성자 닉네임 */}
                      <h3 className="text-text-md">{user.name}</h3>

                      {/* 작성날짜 */}
                      <span className="text-text-sm text-gray">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>

                      {isProductOwnerComment && (
                        <span className="px-2 text-white text-caption bg-deep-mint">
                          작성자
                        </span>
                      )}
                    </div>

                    {/* 댓글 내용 (수정중 ? textarea : p) */}
                    {editingCommentId === comment.id ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 text-sm rounded-md resize-none ring-1 ring-mint focus:outline-none"
                      />
                    ) : (
                      <p className="mt-2 text-sm text-deep-gray">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* 댓글 작성자만 수정/삭제 버튼 표시 */}
                {isAuthor && (
                  <div className="flex items-center justify-end gap-2">
                    {editingCommentId === comment.id ? (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateComment(comment.id)}
                      >
                        저장
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleEdit(comment)}
                      >
                        수정
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="small"
                      variant="outline"
                      onClick={() => handleRemoveComment(comment.id)}
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <p className="pt-4 pb-10 text-center text-gray">
          작성된 댓글이 없습니다.
        </p>
      )}
    </ul>
  );
};

export default CommentList;
