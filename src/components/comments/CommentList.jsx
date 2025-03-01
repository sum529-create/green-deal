import React from 'react';
import Button from '../common/Button';

const CommentList = ({ comments, users }) => {
  return (
    <ul className="space-y-6">
      {/* map으로 뿌리기 */}
      {comments.length > 0 ? (
        comments.map((comment) => {
          // 댓글 작성자 찾기
          const user = users.find(
            (user) => user.user_id.toString() === comment.user_id,
          );
          return (
            <li
              key={comment.id}
              className="p-4 border rounded-lg border-light-gray"
            >
              <div className="flex justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* 프로필이미지 */}
                  <img
                    src={user.profile_img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-deep-mint"
                  />
                  <div>
                    <div className="flex gap-3">
                      {/* 작성자 닉네임 */}
                      <h3 className="text-sm font-semibold text-black">
                        {user.name}
                      </h3>
                      {/* 작성날짜 */}
                      <span className="text-xs text-light-gray">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* 댓글 내용 */}
                    <p className="text-sm text-deep-gray">{comment.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" size="small">
                    수정
                  </Button>
                  <Button type="button" size="small" variant="outline">
                    삭제
                  </Button>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <p>아직 댓글이 없습니다.</p>
      )}
    </ul>
  );
};

export default CommentList;
