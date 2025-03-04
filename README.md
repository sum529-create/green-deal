<div align="center">
  <img alt="프로젝트 로고" src="https://github.com/user-attachments/assets/85cb0b03-8b7f-47e2-a5a1-6352accb0918" />
</div>


<br>
<br>

## 💬 프로젝트 소개
**지도에서 찾고 쉽게 거래하는 스마트한 중고 마켓 📦**
<br><br>
- 원하는 지역에서 직접 상품을 검색하고 거래할 수 있는 중고 마켓 플랫폼입니다.
- 사용자는 가까운 지역에서 좋은 상태의 물건을 합리적인 가격에 구매할 수 있습니다.
- PC와 모바일 환경에서 최적화된 반응형 UI를 제공하여 어디서든 편리하게 이용할 수 있습니다.
 

> - **작업 기간** : 2025. 02. 26 ~ 2025. 03. 04
> - **배포 주소** : https://outsourcing-alpha.vercel.app/

<br />


## 👩‍👩‍👧‍👧 프로젝트 멤버 소개
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/jiyxxn">
        <img src="https://github.com/jiyxxn.png" width="80" alt="jiyxxn"/>
        <br />
        <sub><b>jiyxxn</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/sum529-create">
        <img src="https://github.com/user-attachments/assets/4c61a308-f824-4e34-8c0c-d8ac45adbd8b" width="80"  alt="sumin"/>
        <br />
        <sub><b>sumin</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/DnJ0408">
        <img src="https://github.com/DnJ0408.png" width="80" alt="DnJ0408"/>
        <br />
        <sub><b>DnJ0408</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td width="300px" align="center">
        로그인/회원가입
        <br>AUTH 상태 전역 관리
      </td>
      <td width="300px" align="center">
        물품 등록 및
        <br>수정 구현
      </td>
      <td width="300px" align="center">
        지도 API 구현
        <br>홈 화면 스타일링
      </td>       
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/ImJaeOne">
        <img src="https://github.com/ImJaeOne.png" width="80" alt="ImJaeOne"/>
        <br />
        <sub><b>ImJaeOne</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/lyra-j">
        <img src="https://github.com/lyra-j.png" width="80" alt="lyra-j"/>
        <br />
        <sub><b>lyra-j</b></sub>
        </a>
        <br />
      </td>   
      <td align="center">
        <a href="https://github.com/verdantgreeny">
        <img src="https://github.com/verdantgreeny.png" width="80" alt="verdantgreeny"/>
        <br />
        <sub><b>verdantgreeny</b></sub>
        </a>
        <br />
      </td>        
    </tr>    
    <tr>
      <td width="300px" align="center">
        PM
        <br>물품 리스트 구현
        <br>레이아웃 구현
        <br>무한 스크롤 구현
      </td>
      <td width="300px" align="center">
        물품 상세페이지 및
        <br>댓글 구현
      </td> 
      <td width="300px" align="center">
        마이페이지 및
        <br>프로필 수정 구현
      </td>       
    </tr>
  </tbody>
</table>

<br />

## ⚙ 프로젝트 기능 소개
- **React 기반 웹 애플리케이션**입니다.
- **Zustand**를 사용하여 애플리케이션의 유저 정보 상태 관리를 단순하고 직관적으로 처리합니다.
- **TanStack Query**를 사용하여 비동기 데이터 요청 및 캐싱 기능으로 서버 데이터를 효율적으로 관리합니다.
- **이메일 회원가입 및 로그인 기능**과 **구글/카카오 기반 소셜 로그인**을 제공합니다.
- **회원 정보 유효성 검사**를 통해 정확한 데이터가 저장되도록 합니다.
- **Tailwind CSS**를 사용하여 반응형 디자인을 적용하고, **react-router-dom**을 이용해 페이지 간 네비게이션을 처리합니다.
- 로그인된 유저의 인증 상태에 따라 **ProtectedRoute**를 적용하여 비인가 사용자의 접근을 제한합니다.

<br>

## 🔗 협업 프로세스
- ### 페이지 단위 작업 관리
  - [각 페이지별 이슈](https://github.com/ImJaeOne/green-deal/issues) 생성
  - 페이지별 feature 브랜치 운영 (`feat/#이슈번호-이슈명`, `refactor/#이슈번호-이슈명`)
- ### [Pull Request 템플릿을 활용한 코드 리뷰](https://github.com/ImJaeOne/green-deal/pulls?q=is%3Apr+is%3Aclosed)

<br><br>

## 🚀 트러블 슈팅
- #### [[소셜 로그인] 소셜 로그인 후에 특정 페이지로 리디렉션되지 않는 이슈 해결하기](https://velog.io/@jiyunk/소셜-로그인-후에-특정-페이지로-리디렉션되지-않는-이슈-해결하기)
- #### [[Supabase 테이블 연동] supabase의 trigger 오류 : unexpected_failure](https://velog.io/@jiyunk/supabase%EC%9D%98-trigger-%EC%98%A4%EB%A5%98-unexpectedfailure)
- #### [[카카오맵 API] Kakao 지도 API 적용 및 트러블슈팅](https://debnjin.tistory.com/98)
- #### [[카카오맵 API] React-Kakao-Maps에서 모달 클릭 UX 개선 & Zustand 사용 고민](https://debnjin.tistory.com/99)
- #### [[카카오맵 API] 비인가 처리: 지도 영역만 접근 제한하는 방법](https://debnjin.tistory.com/100)
- #### [[물품 등록/수정] Tanstack Query와 useEffect의 무한 루프 함정](https://velog.io/@sum529/Trouble-Shooting-Tanstack-Query와-useEffect의-무한-루프-함정)
- #### [[물품 등록/수정] Trouble Shooting - Tanstack Query에서 data.data 중첩 문제](https://velog.io/@sum529/Trouble-Shooting-Tanstack-Query에서-data.data-중첩-문제)


<br />

## 📁 프로젝트 구조
```markdown
📁
├─ public // 🖼 이미지 파일
├─ src
│  ├─ api // 🚧 API 통신 관련 서비스 로직
│  ├─ App.jsx
│  ├─ components
│  │  ├─ ...    // 💾 페이지 단위로 분할된 컴포넌트
│  │  ├─ common // 🧩 공통 컴포넌트
│  ├─ constants // 📌 상수 값 관리
│  ├─ hooks     // 🔧 커스텀 훅
│  ├─ pages     // 📄 주요 페이지 컴포넌트
│  ├─ routes    // 🛤 라우팅 관련 설정
│  ├─ store     // 🏝 Auth 정보 전역 상태 store
│  └─ utils     // 🛸 유틸리티 함수
└─ 
```

<br />

## 🧶 기술 스택
<div align="left">

### Environment
<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<br>

### Development
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=&logoColor=white">      
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&amp;logo=Tailwind CSS&amp;logoColor=white">

</div>

