# 음악 플레이어

유튜브 뮤직 웹사이트를 참고해 구조와 주요 기능을 구현한 개인 풀스택 프로젝트입니다.

### 프로젝트 소개

프로젝트에 사용된 스킬입니다.
<br/>

![react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![recoil](https://img.shields.io/badge/Recoil-3578E5.svg?style=for-the-badge&logo=Recoil&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)
![react-router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)
![react-hook-form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)

<br/>

페이지 내에 로그인 기능이 없는 기존 사이트와 달리 로그인 기능을 구현했습니다. 또한, 콘텐츠 등록과 수정, 삭제가 가능한 관리자 페이지를 별도로 구축하여, 사용자와 관리자 간의 역할을 분리하고 서비스 확장성을 고려한 구조로 개발을 진행했습니다.
<br/>

### 프로젝트 일정

24.11.25 - 25.03.10 : 1차 배포 완료

### 문제 및 해결

#### 1. 반복 요청 방지

사용자의 반복적인 동작으로 인한 과도한 API 호출을 방지하는 제어 로직을 구현했습니다. 적용한 부분은 회원가입 및 로그인 버튼과 팔로우 버튼입니다.

팔로우 버튼에는 `디바운스`를 적용하여 사용자가 반복 클릭을 시도해도 일정 간격 동안의 클릭은 마지막 한 번만 동작하도록 하여 과도한 API 호출을 방지했습니다. 이와 동시에 UI 업데이트는 즉각적으로 반영하였고 API 호출이 실패할 경우에는 이전 상태로 돌아갈 수 있도록 했습니다.

회원가입 버튼에는 처음에 디바운스를 적용했지만, 한 번에 여러 계정이 생성되는 문제가 발생했습니다. 이를 해결하기 위해 버튼 클릭 시 로컬 상태를 변경해, 첫 요청이 처리되는 동안에는 추가 클릭이 불가능하도록 했습니다. 그러나 디바운스가 상태 업데이트를 방해해 여전히 여러 요청이 처리되는 문제가 있었고, 결국 디바운스를 제거하고 로컬 상태만으로 제어하여 원하는 동작을 구현할 수 있었습니다.

처음에는 디바운스만으로 해결하려 했지만, 상황에 따라 더 적절한 방법이 있을 수 있다는 걸 배웠습니다. 문제를 단순히 하나의 방식에만 의존하지 않고 다양한 관점에서 접근하는 태도가 중요하다는 걸 느꼈습니다.

#### 2. 뒤로가기 제어

본 프로젝트는 모달을 적극적으로 활용했습니다. 하지만 모달이 열린 상태에서 사용자가 브라우저의 뒤로 가기 버튼을 클릭할 경우, 모달이 닫히지 않은 채 페이지가 이동되는 문제가 있었습니다. 이는 사용성 측면에서 혼란을 줄 수 있는 동작이었습니다.

이를 해결하기 위해 `History API`를 활용해 모달이 열릴 때 새로운 히스토리 상태를 추가하고, 뒤로 가기 동작이 발생하면 해당 상태를 감지하여 모달을 먼저 닫도록 처리했습니다.

라이브러리를 사용할 때 내부 동작을 잘 모르고 넘어가는 경우가 많았는데, 이번 문제를 통해 브라우저의 기본 API를 직접 다뤄보며 동작 원리를 이해할 수 있었습니다. 단순한 기능이라도 로우 레벨에서 작동 방식을 알면 이후 라이브러리 활용 시 훨씬 더 유연하게 접근할 수 있다는 걸 느꼈습니다.

<br/>

### 관련 링크

프로젝트 배포 링크 : [https://patrick-stream-front.vercel.app/](https://patrick-stream-front.vercel.app/)
