import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import { supabase } from '../../api/client';
import CommentForm from './CommentForm';

const Comments = ({ users }) => {
  const { id } = useParams();
  const productId = id; //
  const [comments, setComments] = useState([]); // 댓글 상태

  // DB에서 해당 상품의 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('댓글 불러오기 에러: ', error);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, [productId]);

  return (
    <div className="p-6 bg-white rounded-sm">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-black">
          댓글/문의 <span className="text-deep-mint">{comments.length}개</span>
        </p>
        {/* 댓글 입력 폼 */}
        <CommentForm productId={productId} setComments={setComments} />
      </div>

      {/* 댓글 목록 */}
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
                      <p className="text-sm text-deep-gray">
                        {comment.content}
                      </p>
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
    </div>
  );
};

export default Comments;
