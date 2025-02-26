import { supabase } from './api/client';

function App() {
  /**
   * 'test' 테이블의 데이터를 가져옴
   * @async
   * @function getData
   * @returns {Promise<object[]>} 가져온 데이터 배열
   */
  const getData = async () => {
    const { data } = await supabase.from('test').select('*');
    console.log(data);
  };

  getData();

  return <div className="text-accent">Hot Six~</div>;
}

export default App;
