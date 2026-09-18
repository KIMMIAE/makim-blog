"""Simplified original tabby icon. Small dot eyes, soft coat, short body."""
from pathlib import Path
from copy import deepcopy
import json

ROOT=Path(__file__).parent
N=32
P={'o':'#60616C','g':'#B7B3A8','t':'#8F8D84','w':'#FFFEF9',
   's':'#E8E7DF','p':'#E5B4AC','e':'#424650','n':'#C69489'}
def blank():return [['.']*N for _ in range(N)]
def box(c,x,y,w,h,k):
    for j in range(y,y+h):
        for i in range(x,x+w):
            if 0<=i<N and 0<=j<N:c[j][i]=k
def oval(c,x,y,rx,ry,k):
    for j in range(N):
        for i in range(N):
            if ((i-x)/rx)**2+((j-y)/ry)**2<=1:c[j][i]=k
def border(c):
    d=deepcopy(c)
    for y in range(N):
        for x in range(N):
            if c[y][x]=='.' and any(0<=x+a<N and 0<=y+b<N and c[y+b][x+a]!='.' for a,b in [(1,0),(-1,0),(0,1),(0,-1)]):d[y][x]='o'
    return d
def head(c,closed=False,dx=0,dy=0):
    h=blank()
    # Broad soft silhouette with short ears; no realistic eye rings or brows.
    for x in (6,22):
        box(h,x,4,2,5,'g');box(h,x-1,6,4,4,'g')
        box(h,x,6,1,2,'p')
    oval(h,15,12,11,7,'g')
    oval(h,15,16,9,4,'w')
    box(h,5,13,4,3,'w');box(h,22,13,4,3,'w')
    # Three tiny forehead stripes, detached from the eyes.
    box(h,11,7,1,2,'t');box(h,15,6,1,3,'t');box(h,19,7,1,2,'t')
    box(h,5,11,2,1,'t');box(h,24,11,2,1,'t')
    for x in (10,20):
        if closed:box(h,x-1,13,3,1,'e')
        else:box(h,x,12,1,2,'e')
    box(h,15,15,1,1,'n')
    box(h,14,17,1,1,'o');box(h,16,17,1,1,'o')
    for y in range(N):
        for x in range(N):
            if h[y][x]!='.':box(c,x+dx,y+dy,1,1,h[y][x])
def seated(closed=False,tail=False):
    c=blank()
    # Low, round body, short white paws, ringed tail tucked beside body.
    box(c,23,23,4,4,'g');box(c,26,20,3,6,'g')
    box(c,25 if tail else 27,17,2,4,'g')
    box(c,26,22,3,1,'t');box(c,24,25,3,1,'t')
    oval(c,16,23,8,5,'g')
    box(c,21,21,3,1,'t');box(c,22,24,2,1,'t')
    oval(c,15,23,5,5,'w')
    box(c,10,26,4,2,'w');box(c,17,26,4,2,'w')
    box(c,15,26,1,2,'s')
    head(c,closed)
    return border(c)
def sleep():
    c=blank();oval(c,20,22,9,5,'g');oval(c,18,25,9,3,'w')
    for x in (18,22,26):box(c,x,19,1,2,'t')
    box(c,25,24,4,3,'g');box(c,23,26,4,2,'g');box(c,25,26,1,2,'t')
    h=blank();head(h,True)
    for y in range(4,21):
        for x in range(4,27):
            if h[y][x]!='.':box(c,3+round((x-4)*.65),15+round((y-4)*.65),1,1,h[y][x])
    box(c,7,27,4,1,'w');box(c,13,27,4,1,'w')
    return border(c)
face=blank();head(face,False,0,3)
frames={'awake':seated(),'blink':seated(True),'tail':seated(False,True),'sleep':sleep(),'face':border(face)}
for name,c in frames.items():
    r=[f'<rect x="{x}" y="{y}" width="1" height="1" fill="{P[k]}"/>' for y,row in enumerate(c) for x,k in enumerate(row) if k!='.']
    (ROOT/f'cat-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges" role="img" aria-label="Cute tabby '+name+'">'+''.join(r)+'</svg>')
(ROOT/'pixels.json').write_text(json.dumps({'size':32,'palette':P,'frames':frames},indent=2))
html=(ROOT.parent/'tabby/index.html').read_text()
html=html.replace('MY TABBY · 02','MY TABBY · 03').replace('우리 고양이, 픽셀로','조금 더 동글동글, 조금 더 단순하게')
html=html.replace('연두빛 눈, 갈색 콧등, 흰 가슴과 양말, 고등어 줄무늬.','작은 점눈과 짧은 다리, 둥근 볼. 흰 가슴과 고등어 무늬는 살짝만.')
html=html.replace('보내주신 고양이 사진을 참고해 직접 설계한 48 × 48 픽셀 캐릭터입니다.','사진 속 특징을 간추린 32 × 32 픽셀 아이콘입니다.')
html=html.replace('width:192px;height:192px','width:160px;height:160px')
html=html.replace('src="cat-sleep.svg" alt=""','src="cat-awake.svg" alt=""').replace('>쉬는 중…</div>','>안녕!</div>')
html=html.replace('data-state="sleep" class="active"','data-state="sleep"').replace('data-state="awake"','data-state="awake" class="active"')
html=html.replace('aria-label="고양이 깨우기"','aria-label="고양이와 인사하기"')
(ROOT/'index.html').write_text(html)
(ROOT/'README.md').write_text('''# Cute tabby v3

Original editable 32px icon, simplified from the earlier photo-referenced design.
No external sprites or image-generation assets. References stay outside repo.
Dot eyes replace detailed irises; lower-contrast stripes, broad cheeks, short ears
and paws. White muzzle/chest and mackerel coat retained. No collar.
Run: python3 design/pixel-cat/cute/build.py
''')
