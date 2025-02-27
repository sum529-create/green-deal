import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Comments = ({ users }) => {
  //댓글테이블 더미데이터
  const [comments, setComments] = useState([
    {
      id: 21,
      created_at: '2025-02-27 08:55:57.141131+00',
      content: '직거래 가능한 시간 알려주세요',
      user_id: '20250227074521',
      product_id: '1',
      updated_at: '',
    },
    {
      id: 22,
      created_at: '2025-02-27 14:55:57.141131+00',
      content: '오후 8시 이후로 가능합니다!',
      user_id: '20250229084522',
      product_id: '1',
      updated_at: '',
    },
  ]);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  // 댓글 입력 상태
  const [newComment, setNewComment] = useState('');

  // 현재 상품에 해당하는 댓글 필터링
  const productComments = comments.filter(
    (comment) => comment.product_id === productId,
  );

  //댓글 추가 로직 생성해야함
  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;
    //setComments([...comments, newComment])
  };

  return (
    <div className="p-6 bg-white rounded-sm shadow-md">
      {/* comments add components */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700">
          댓글/문의{' '}
          <span className="text-deep-mint">{productComments.length}개</span>
        </p>
        <form className="flex w-full gap-5 bg-white">
          <textarea
            placeholder="댓글을 입력하세요."
            className="w-full p-3 mt-2 text-sm rounded-lg resize-none focus:ring-2 focus:ring-deep-mint focus:outline-none"
          ></textarea>
          <button>등록</button>
        </form>
      </div>

      {/* 댓글 목록 */}
      <ul className="space-y-6">
        {/* map으로 뿌리기 */}
        {productComments.length > 0 ? (
          productComments.map((comment) => {
            // 댓글 작성자 찾기
            const user = users.find(
              (user) => user.user_id.toString() === comment.user_id,
            );
            return (
              <li
                key={comment.id}
                className="p-4 border rounded-lg border-light-gray"
              >
                <div className="flex items-start gap-3">
                  {/* 프로필이미지 */}
                  <img src={user.profile_img} alt={user.name} />
                  <div>
                    {/* 작성자 닉네임 */}
                    <h3 className="text-sm font-semibold text-black">
                      {user.name}
                    </h3>
                    {/* 작성날짜 */}
                    <span className="text-xs text-light-gray">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                    {/* 댓글 내용 */}
                    <p className="text-sm text-black">{comment.content}</p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}

        {/* <li className="comment-seller">
        //   <img src="/" alt="user_profile_img" />
        //   <h3>seller</h3>
        //   <span>2025-02-26</span>
        //   <p>오후 6시 이후로 가능합니다.</p>
        // </li> */}
      </ul>
    </div>
  );
};

export default Comments;
