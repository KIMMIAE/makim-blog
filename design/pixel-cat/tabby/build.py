"""48px tabby sprites drawn from supplied pet photos, not traced from sprites.

Reference observations: olive eyes, brown nose bridge, white muzzle/chest/legs,
warm gray mackerel coat, dark forehead M and ringed dark-tipped tail. No collar.
Every polygon, pixel and frame below is authored for this project.
"""
from pathlib import Path
from copy import deepcopy
import json
import math

ROOT = Path(__file__).parent
N = 48
P = {'outline':'#363A38','coat':'#9B9788','light':'#BDB7A5',
     'stripe':'#55594F','white':'#FFFEF5','shade':'#E3E5DA',
     'ear':'#DBAAA0','nose':'#BD8874','eye':'#B7CB78','iris':'#8AAB60',
     'pupil':'#29352D','shine':'#FFFFFF','bridge':'#A58E70'}
def blank(): return [[None]*N for _ in range(N)]
def dot(c,x,y,k):
    if 0 <= x < N and 0 <= y < N: c[y][x]=k
def box(c,x,y,w,h,k):
    for j in range(y,y+h):
        for i in range(x,x+w): dot(c,i,j,k)
def ellipse(c,x,y,rx,ry,k):
    for j in range(N):
        for i in range(N):
            if ((i-x)/rx)**2+((j-y)/ry)**2 <= 1: dot(c,i,j,k)
def poly(c,pts,k):
    for y in range(N):
        for x in range(N):
            inside=False
            for i in range(len(pts)):
                a,b=pts[i],pts[i-1]
                if (a[1]>y+.5)!=(b[1]>y+.5) and x+.5 < (b[0]-a[0])*(y+.5-a[1])/(b[1]-a[1])+a[0]: inside=not inside
            if inside: dot(c,x,y,k)
def line(c,pts,k,width=1):
    for a,b in zip(pts,pts[1:]):
        n=max(abs(a[0]-b[0]),abs(a[1]-b[1]),1)
        for s in range(n+1):
            x=round(a[0]+(b[0]-a[0])*s/n); y=round(a[1]+(b[1]-a[1])*s/n)
            box(c,x,y,width,width,k)
def outline(c):
    result=deepcopy(c)
    for y in range(N):
        for x in range(N):
            if c[y][x] is None and any(0<=x+dx<N and 0<=y+dy<N and c[y+dy][x+dx] is not None for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]): result[y][x]='outline'
    return result

def face(c,closed=False,ox=0,oy=0):
    f=blank()
    # broad cheeks and tall, softly stepped ears
    poly(f,[(10,14),(9,3),(12,3),(19,10),(28,10),(35,3),(38,3),(37,16)],'coat')
    poly(f,[(11,6),(12,13),(17,11)],'ear')
    poly(f,[(35,6),(30,11),(36,13)],'ear')
    ellipse(f,23,20,16,12,'coat')
    ellipse(f,23,26,13,7,'white')
    # white cheeks rise outside both eyes; nose bridge remains brown
    poly(f,[(8,20),(14,23),(19,25),(16,29),(9,27)],'white')
    poly(f,[(38,20),(32,23),(27,25),(30,29),(37,27)],'white')
    poly(f,[(20,17),(26,17),(27,26),(23,28),(19,26)],'bridge')
    # forehead M and side tabby bars
    line(f,[(17,11),(19,15),(22,12),(24,16),(27,12),(29,11)],'stripe',2)
    line(f,[(23,10),(23,13)],'stripe')
    line(f,[(8,16),(12,17)],'stripe',2)
    line(f,[(34,17),(38,16)],'stripe',2)
    line(f,[(8,21),(11,22)],'stripe')
    line(f,[(35,22),(38,21)],'stripe')
    for x in (15,31):
        if closed:
            line(f,[(x-3,21),(x-2,22),(x+1,22),(x+3,20)],'outline')
        else:
            ellipse(f,x,21,4,4,'outline')
            ellipse(f,x,21,3,3,'eye')
            box(f,x-1,20,2,4,'pupil')
            dot(f,x+2,22,'iris');dot(f,x-1,19,'shine')
    box(f,22,26,3,1,'nose');dot(f,23,27,'nose')
    dot(f,23,28,'outline');dot(f,22,29,'outline');dot(f,24,29,'outline')
    for x,y in [(17,27),(18,28),(29,27),(28,28)]: dot(f,x,y,'light')
    for y in range(N):
        for x in range(N):
            if f[y][x]: dot(c,x+ox,y+oy,f[y][x])

def seated(closed=False,tail=False):
    c=blank()
    line(c,[(34,40),(40,39),(43,35),(43 if not tail else 40,29),(42 if not tail else 38,26)],'coat',3)
    for x,y in ([(42,27),(43,31),(41,36)] if not tail else [(38,27),(40,31),(41,36)]): box(c,x,y,3,2,'stripe')
    ellipse(c,25,35,12,9,'coat')
    for y in (31,35,39):
        line(c,[(33,y),(29,y+2)],'stripe',2)
    ellipse(c,23,34,6,8,'white')
    box(c,17,33,5,10,'white');box(c,24,33,5,10,'white')
    ellipse(c,18,43,4,2,'white');ellipse(c,27,43,4,2,'white')
    line(c,[(22,37),(22,43)],'shade')
    for x in (17,19,26,28):dot(c,x,44,'shade')
    face(c,closed,0,-1)
    return outline(c)

def sleeping():
    c=blank()
    ellipse(c,28,31,15,11,'coat')
    ellipse(c,24,35,13,8,'white')
    for x in (23,29,35):line(c,[(x,22),(x+2,26),(x,29)],'stripe',2)
    # ringed tail wraps around the flank, with a dark tip
    line(c,[(39,27),(42,31),(41,37),(37,41),(29,42)],'coat',3)
    line(c,[(41,30),(43,30)],'stripe',2)
    line(c,[(40,36),(42,37)],'stripe',2)
    line(c,[(35,41),(37,42)],'stripe',2)
    box(c,27,42,6,2,'stripe')
    f=blank();face(f,True)
    # Scaled own face design, keeping coat and white muzzle consistent.
    for y in range(3,34):
        for x in range(7,40):
            if f[y][x]:dot(c,4+round((x-7)*.64),18+round((y-3)*.64),f[y][x])
    ellipse(c,12,40,5,2,'white');ellipse(c,22,40,4,2,'white')
    return outline(c)

frames={'awake':seated(),'blink':seated(True),'tail':seated(False,True),'sleep':sleeping()}
portrait=blank();face(portrait,False,0,5);frames['face']=outline(portrait)
def svg(c,label):
    r=[]
    for y,row in enumerate(c):
        for x,k in enumerate(row):
            if k:r.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{P[k]}"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 48 48" shape-rendering="crispEdges" role="img" aria-label="{label}">'+''.join(r)+'</svg>'
for name,c in frames.items(): (ROOT/f'cat-{name}.svg').write_text(svg(c,name))
(ROOT/'pixels.json').write_text(json.dumps({'size':48,'palette':P,'frames':frames},indent=2))
html=(ROOT.parent/'index.html').read_text()
html=html.replace('PIXEL CAT · 01','MY TABBY · 02').replace('우리 블로그에 살 고양이','우리 고양이, 픽셀로')
html=html.replace('회색 귀와 이마 무늬, 보라색 목걸이, 작은 노란 태그.','연두빛 눈, 갈색 콧등, 흰 가슴과 양말, 고등어 줄무늬.')
html=html.replace('32 × 32 픽셀부터 직접 설계한 첫 번째 캐릭터입니다.','보내주신 고양이 사진을 참고해 직접 설계한 48 × 48 픽셀 캐릭터입니다.')
html=html.replace('외부 스프라이트·생성 이미지·아이콘 폰트를 사용하지 않았습니다.','사진은 외형 참고에만 사용했습니다. 외부 스프라이트와 생성 이미지는 사용하지 않았습니다.')
html=html.replace('<div class="frames">','<div class="frames"><div class="frame"><img src="cat-face.svg" alt="얼굴 아이콘"><span>얼굴 아이콘</span></div>')
html=html.replace('repeat(4,1fr)','repeat(5,1fr)').replace('width:160px;height:160px','width:192px;height:192px')
(ROOT/'index.html').write_text(html)
(ROOT/'README.md').write_text('''# Photo-referenced tabby cat, v2

Editable pixel artwork authored for this blog from user-supplied cat photos.
Inspected references: IMG_8913, IMG_8952, IMG_7067, IMG_7993.
Reference photos stay outside this repository. No source photo is embedded.
No downloaded sprites, traced game characters, or generated-image pixels used.

Features: warm gray/brown mackerel coat, forehead M, brown nose bridge,
white muzzle/chest/legs, olive-green eyes, ringed dark-tipped tail. No collar.
The icon exaggerates head/eye size; it is a stylized likeness, not a tracing.

Run `python3 design/pixel-cat/tabby/build.py` from the project root.
The script exports 48px SVG frames and editable pixel arrays.
Preview index.html via the existing localhost:4317/tabby/ server.
''')
