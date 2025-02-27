import { supabase } from '../api/client';

/**
 * upsertData 함수
 * - 데이터 객체와 테이블 명, 중복처리기준 컬럼을 받아서 테이블을 업데이트합니다.
 *
 * @param {object} data - 추가/수정 할 데이터 객체
 * @param {string} tableName - 데이터가 삽입/업데이트 시 테이블 명
 * @param {string} conflictColumn - 중복처리기준 컬럼
 * @returns {Promise}
 */
export const upsertData = async (data, tableName, conflictColumn = '') => {
  if (!data) {
    console.error('data 값은 필수입니다.');
    return;
  }
  if (!tableName) {
    console.error('tableName 값은 필수입니다.');
    return;
  }
  try {
    const { error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: conflictColumn || undefined });
    if (error) {
      console.error('데이터 삽입/업데이트 실패하였습니다: ', error);
      return;
    } else {
      return alert('새로운 상품이 추가되었습니다.');
    }
  } catch (error) {
    console.error('서버 오류가 발생하였습니다: ', error);
    return;
  }
};
