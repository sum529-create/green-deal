import { supabase } from './client';

/**
 * upsertData 함수
 * - 데이터 객체와 테이블 명, 중복처리기준 컬럼을 받아서 테이블을 업데이트합니다.
 *
 * @param {object} data - 추가/수정 할 데이터 객체
 * @param {string} tableName - 데이터가 삽입/업데이트 시 테이블 명
 * @param {string} conflictColumn - 중복처리기준 컬럼
 * @returns {Promise}
 */
export const upsertData = async (product, tableName, conflictColumn = '') => {
  const { data, error } = await supabase
    .from(tableName)
    .upsert(product, { onConflict: conflictColumn || undefined })
    .select();
  return { data, error };
};
