/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useMemo, useEffect } from 'react';

/**
 * 입력값에 대한 debounce된 유효성 검사를 실행하는 커스텀 훅
 *
 * @param {Function} validateFn - 유효성 검사 함수
 * @param {Array} deps - 의존성 배열 (watch로 감지할 값들)
 */

const useDebouncedValidation = (validateFn, deps) => {
  const debouncedValidate = useCallback(validateFn, [...deps]);

  useEffect(() => {
    debouncedValidate();
  }, [debouncedValidate]);
};

export default useDebouncedValidation;
