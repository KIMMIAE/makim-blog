---
title: "블로그 업데이트(feat.Next14/React18) 후기"
tags:
  - Next.js
  - React
description: "제법 끔찍한 시간을 보냈다..😫"
published: true
slug: 2024/01/update-my-blog-to-next-14
date: "2024-01-12"
---

## 들어가며

블로그를 방치해둔 사이에 많은 게 바뀌었다. React18에서 '서버 컴포넌트'가 등장했고 Next.js는 이에 발맞춰 큰 변경을 가져온 13 버전에 이어 13에서 새로 나온 기능들에 대한 안정화 작업을 거친 14버전을 내놓았다. 그 사이 내가 방치해둔 블로그는 레거시가 되어갔다. 우선 급하게 기본 기능을 완성하고 기능이 많아져서 마이그레이션이 더욱 어려워지기 전에 최신으로 업데이트하기로 결정했다.

그게 요 며칠인데, 결론부터 말하자면 제법 끔찍한 시간을 보냈다. 업데이트 후 dev 환경에선 발생하지 않은 에러가 실 프로덕션에서만 발생하고 디버깅조차 되지 않았는데, 그게 다 내가 Next.js v.14 문법을 제대로 숙지하지 않고 대충 작업해서 발생한 일이었다. 그래서 굉장히... 끔찍한 시간을 보냈다. 되돌아보면 무슨 자신감에서 그렇게 작업했나 싶다. 작은 규모의 프로젝트에 개인 블로그라 좀 쉽게 생각했던 것 같다. 개발에 쉬운 일은 없는데.

이 사실이 굉장히 부끄럽지만 같은 실수를 반복하지 않기 위해서 후기와 Troubleshooting을 작성해보려 한다.

## Troubleshooting 1

### Posts, 글 상세 페이지 404에러

![blog-404-error](./images/blog-404-error.png)

```bash
$ npm run dev

$ npm run build
$ npm run start
```

데브 환경에선 발생하지 않던 404에러가 vercel로 배포한 프로덕션에서만 발생했다.
디버깅을 하려고 해도 데브에선 발생하지 않고, 설상가상으로 로컬에서 build&start 해도 재현이 되지 않았다. 빌드시 에러도 발생하지 않고, 관련 로그도 찍히지 않는 상태. 코드만 보고 추측해 문제를 정의해 보았다.

#### Problem

```tsx
/* src/app/posts/[id]/page.tsx */
const allPosts = getSortedPostsData(); // await 빼먹었었음.
const pageNo = parseInt(id);

if (
  isNaN(pageNo) ||
  pageNo > Math.ceil(allPosts.length / DEFAULT_NUMBER_OF_POSTS) ||
  pageNo < 1
) {
  return notFound();
}

/* src/app/[year]/[...slugs]/page.tsx */
const slug = [year, ...(slugs as string[])].join("/");
const posts = getSortedPostsData(); // 마찬가지
const post = posts.find((p: Post) => {
  return p?.slug === slug;
});
return post;
if (!post) {
  return notFound();
}

/* src/lib/Post.ts */
export async function getSortedPostsData(): Promise<Post[]> {
  const fileNames: string[] = glob.sync(`${postsDirectory}/**/*.md*`);
  const allPostsData = fileNames.reduce((acc: Post[], curr: string) => {
    const fileContents = fs.readFileSync(curr, "utf8");
    const matterResult = matter(fileContents);
    const { published } = matterResult.data;
    if (!published) {
      return acc;
    }
    const result: Post = {
      id: curr,
      ...matterResult.data,
      content: matterResult.content,
    } as Post;
    return [...acc, result];
  }, [] as Post[]);

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
```

1. `getSortedPostsData()` 함수 호출시에 빈값 혹은 `undefined`를 리턴하고 있는 것 같다
2. `page`쪽에서 `getSortedPostsData` 함수를 호출할 때 동기적으로 처리해줘야 되는데 빼먹었음 
3. react, nextjs 업데이트하면서 다른 dependencies들도 업데이트 해줬는데 glob 라이브러리 업데이트 하면서 문법이 좀 바뀜.(어떤 영향이 갔을지 모르는 상태)

#### Solution

1. `getSortedPostsData()` 함수 호출시에 빈값 혹은 `undefined`를 리턴하는 원인을 파악하기 위해 디버깅용 로그 찍기
    * **result:** vercel에서 로그 확인했을 때 `getSortedPostsData()`에서 `undefined`를 리턴해서 `notFound()`로 빠지고 있었다는 걸 확인함.
2. `src/pages` 방식에서는 사용자가 페이지에 접근하였을 때 어떤 `props`를 클라이언트에 반환할지 `getStaticProps` 메서드에서 정의했다. 따라서 렌더링하는 영역에선 `props`를 받아서 표시하는 역할만 하기 때문에 `async`해질 필요가 없었다. 하지만 `src/app` 방식에선 기존의 `getStaticProps`가 사라지고 페이지를 `async`하게 만드는 게 가능해진다. 렌더링 영역에서 호출하는 `getSortedPostsData` 함수를 `await` 연산자를 사용해서 동기적으로 처리하도록 수정해준다.
    * **result:** 처리를 다 했는데도 여전히 에러 발생했다.
3. glob 다운그레이드
  * next.js, react 버전업과 관련이 없고, 변수를 하나라도 더 줄이기 위해서 다운그레이드 함.
  * **result:** 별다른 효과는 없었다.

## Troubleshooting 2

#### Problem

1. vercel에서 로그 확인했을 때 `getSortedPostsData`에서 `undefined` 리턴해서 `notFound()`로 빠지고 있었다는 걸 확인했기 때문에, 포스트 데이터 가져오는 쪽에서 문제가 되고 있다는 건 알았지만 정확한 원인은 파악하지 못했다. 하지만 예상 원인으로 build한 source코드에 posts 파일이 없어서 가져올 데이터가 없어서 문제가 발생하고 있을 거란 가설을 세웠다. vercel에는 마침 해당 빌드의 source와 output을 확인할 수 있는 gui가 있어서 확인해보았다.

![vercel-source](./images/vercel-source.png)

아니나 다를까, source에는 있는 posts 파일들이

![vercel-output](./images/vercel-output.png)

실제 빌드 결과물에는 없었다.

경험상, 이런 경우에는 빌드 에러에는 걸리지 않았지만 문법상 맞지 않는 부분이 있어 빌드 결과물이 제대로 안 나온 경우가 많았다. 특히, 이전에는 잘 동작하던 부분에서 문제가 생겼다면 next.js v.14 문법을 틀렸을 가능성이 높다는 결론이 나왔다.

#### Solution

1. `generateStaticParams` 문서를 정독하며 example code를 내가 작성한 코드와 비교한다
    * https://nextjs.org/docs/app/api-reference/functions/generate-static-params
2. 결론적으로, 이게 정답이었다. 원인은 slug(접근 가능한 주소)를 `params` 객체 안에 넣어서 넘기고 있었는데 이 부분에서 문제가 됐다. 이전에는(`getStaticPaths`) `{params: {}}` 형태의 객체로 보냈던 것과 다르게 이젠 단순히 필요한 조합을 객체로 전달해주면 된다. 그런데 나는 마이그레이션 하면서 이전 형태의 방식(`{params: {}}`)으로 전달해서 빌드시 정적 페이지가 제대로 만들어지지 않아 페이지가 안 뜨는 문제가 발생한 걸로 추측되었다.
    * return값을 수정해주니 404에러가 해결됐다.
    * 하지만 이 부분에 대해선 여전히 의문이 있다. '로컬 환경에선 왜 재현이 되지 않았는가?' 이건 Next.js 빌드와 Vercel Deployment에 대해서 공부를 더 해야 알 수 있을 것 같다.


## 회고

### 좋았던 점
* 아무튼 next.js@14, React@18로 업그레이드를 했다.
* 빠르게 쳐내면서 새로 나온 기능들을 훑어볼 수 있었다.
* 블로그에 새로운 기능을 붙일 준비를 끝냈다

### 아쉬웠던 점
* 오랜기간 방치한 프로젝트의 dependencies 업그레이드는 점진적으로 했어야 됐다. 한 번에 전부 다 하려고 하니 버그 원인 파악이 어려웠다. (짚이는 곳이 너무 많아서...) 지난 경험과 리팩터링 2판 등으로 이미 알고 있던 사실인데 왜 그랬는지 모르겠다. 개인 블로그에 규모가 작은 프로젝트라고 너무 쉽게 봤던 것 같다. 세상에 쉬운 일은 없다.
* 급하게 디버깅하면서 무조건 브랜치 따서 작업한다는 원칙을 어겼다. 원인 파악하느라 로그 찍고 커밋 되돌리고 할 땐 브랜치따서 작업한 게 오히려 불편했다. 혼자 관리하는 개인 프로젝트인데 이렇게까지 할 필요가 있나? 라는 생각이 좀 들었다.
  * 그래서 지금은 main 브랜치로 바로 커밋&푸쉬 해보고 있다. 확실히 편하긴 한데, 불안하다. 나중에 트래킹이 힘들 것 같다는 생각도 들고, 동일 작업끼리 묶어놓고 싶기도 하다. 개인 프로젝트기때문에 어떻게 관리하는 게 좋을지 고민하면서 나에게 맞는 방식을 찾아 갈 예정이다. 

### 개선할 점
* dependencies 업그레이드는 점진적으로 하자. 로컬, 프로덕션 모두 통과 후 다음 작업을 하도록 하자.
* 버그 원인 파악을 위한 작업 때 main으로 머지해서 테스트하는 게 아니라 해당 브랜치를 배포해서 따로 테스트하는 게 나았을 것 같다는 생각이 들었다. 실무에선 그렇게 했는데.. 다음부턴 실무에서 했던 것처럼 해야겠다.
* 블로그 주소를 이력서에 넣어놔서 문제가 발생했을 때 더 마음이 조급했었는데, 조급할 수록 데브플랜을 작성하고 천천히 원인을 파악해 나가야 된다는 걸 상기하자. 머리로는 아는데 실천이 은근 어려운 것 같다.
* Next.js Build 단계 등에 대해서 공부를 좀 해야 될 것 같다는 생각이 들었다.
* React@18, Next.js@14 신기능들을 대충 훑었으니 딥하게 공부하는 시간도 가져야 될 것 같다.
* 아무튼 의미 없는 일은 없다. 이번 실수로 배우고 다시금 깨달은 것들이 있었으니. 다음에 더 잘하면 된다.
