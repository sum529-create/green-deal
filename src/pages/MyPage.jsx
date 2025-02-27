import React from 'react';

const MyPage = () => {
  const items = [
    { id: 1, title: '아이폰 13 팝니다.', price: '130,000', imgSrc: '' },
    { id: 2, title: '갤럭시 S21 팝니다.', price: '150,000', imgSrc: '' },
    { id: 3, title: '빌라 팝니다', price: '900,000', imgSrc: '' },
    { id: 4, title: '벤츠 E클래스 팝니다.', price: '800,000', imgSrc: '' },
  ];

  return (
    <div className="flex items-center justify-center h-screen gap-14">
      <section className="flex flex-col items-center justify-center gap-10 w-[400px] h-[830px] p-6 bg-secondary rounded-md">
        <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-primary">
          <button className="w-[100px] h-[40px] p-2 text-primary bg-accent rounded-full text-sm">
            이미지 선택
          </button>
          <img
            src=""
            alt="프로필 이미지"
            className="object-cover w-[130px] h-[130px] bg-muted rounded-full"
          />
          <input
            type="text"
            placeholder="닉네임"
            className="w-[210px] h-[32px] border border-dark rounded-md"
          />
          <p className="mb-4">email@example.com</p>
          <button className="w-[210px] h-[60px] text-primary bg-accent rounded-full">
            프로필 수정
          </button>
        </div>

        <div className="w-[300px] h-[210px] rounded-md">
          <button className="w-full bg-primary text-black h-[70px] rounded-t-md hover:bg-softBlue hover:text-primary">
            판매 중인 물품
          </button>
          <button className="w-full text-black bg-primary h-[70px] hover:bg-softBlue hover:text-primary">
            판매 완료
          </button>
          <button className="w-full text-black bg-primary h-[70px] rounded-b-md hover:bg-softBlue hover:text-primary">
            찜한 상품
          </button>
        </div>
      </section>

      <section className="p-6 min-w-[800px] min-h-screen">
        <h1 className="mb-4 text-4xl font-bold text-accent">판매 중인 물품</h1>
        <div className="grid grid-cols-3 gap-6 overflow-hidden">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="object-cover w-full h-[160px] rounded-t-md bg-muted"
              />
              <div className="w-full h-[120px] p-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.price}</p>
                <div className="flex items-center justify-center gap-4">
                  <button className="w-[100px] h-[40px] p-2 text-accent border-2 border-accent rounded-full">
                    삭제
                  </button>
                  <button className="w-[100px] h-[40px] p-2 text-primary bg-accent rounded-full">
                    수정
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
