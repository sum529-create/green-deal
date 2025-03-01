import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../api/client';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Comments = ({ users, seller }) => {
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
      <CommentList
        comments={comments}
        users={users}
        setComments={setComments}
        seller={seller}
      />
    </div>
  );
};

export default Comments;
