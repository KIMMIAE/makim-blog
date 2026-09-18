"""Small rounded head, drawn on the original 32px sprite grid."""
from pathlib import Path
from copy import deepcopy
import json

root=Path(__file__).parent
data=json.loads((root.parent/'soft/pixels.json').read_text())
p=data['palette']
base=deepcopy(data['frames']['awake'])
for y in range(17):
    for x in range(22):base[y][x]='.'
mask=set()
bounds={7:(7,18),8:(7,18),9:(6,19),10:(6,19),11:(6,19),12:(6,19),13:(7,18),14:(8,17),15:(10,15)}
for y,(a,b) in bounds.items():
    mask.update((x,y) for x in range(a,b+1))
mask.update([(8,4),(17,4)])
for y,a,b in [(5,7,9),(5,16,18),(6,7,11),(6,14,18)]:
    mask.update((x,y) for x in range(a,b+1))
for x,y in mask:
    edge=any((x+dx,y+dy) not in mask for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)])
    base[y][x]='o' if edge else ('g' if y<=9 else 'w')
for x,y in [(8,6),(9,7),(17,6),(16,7)]:base[y][x]='p'
for x,y in [(10,8),(15,8),(12,7)]:base[y][x]='t'
for x,y in [(12,8),(13,8),(12,9),(13,9)]:base[y][x]='w'
for x in range(8,18):base[9][x]='w'
for x in (9,14):
    for y in (9,10,11):
        for dx in (0,1):base[y][x+dx]='e'
    base[9][x]='w'
base[12][12]='p'
base[13][12]='s'
for x in range(10,16):base[15][x]='w'
for x in range(9,17):base[16][x]='w'
base[16][8]=base[16][17]='o'
blink=deepcopy(base)
for x in (9,14):
    for y in (9,10):
        for dx in (0,1):blink[y][x+dx]='w'
tail=deepcopy(base)
for y in range(15,21):tail[y][23:]=tail[y][24:]+['.']
frames={'awake':base,'blink':blink,'tail':tail,'sleep':data['frames']['sleep']}
for name,c in frames.items():
    rects=[f'<rect x="{x}" y="{y}" width="1" height="1" fill="{p[k]}"/>' for y,row in enumerate(c) for x,k in enumerate(row) if k!='.']
    (root/f'cat-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges">'+''.join(rects)+'</svg>')
(root/'pixels.json').write_text(json.dumps({'size':32,'palette':p,'frames':frames},indent=2))
html=(root.parent/'round/compare.html').read_text()
start=html.index('<div class="grid">')
end=html.index('</main>')
cards=[]
for title,src in [('A · 기존 얼굴 + 반짝이는 눈 · 확정','../soft/eyes-spark.svg'),('C · 작고 둥근 얼굴 + 반짝이는 눈','cat-awake.svg')]:
    cards.append(f'<article><h2>{title}</h2><figure><img src="{src}" alt="{title}"><br><img class="size" src="{src}" alt="64px {title}"></figure></article>')
html=html[:start]+'<div class="grid">'+''.join(cards)+'</div>'+html[end:]
html=html.replace('repeat(3,1fr)','repeat(2,1fr)')
html=html.replace('기존 얼굴 vs 둥근 얼굴','남겨둘 두 가지 고양이')
html=html.replace('위는 기존, 아래는 볼과 턱을 둥글게 다듬은 얼굴입니다.<br>각 열은 같은 눈 크기입니다. 큰 모습과 실제 64px 크기를 함께 비교해보세요.','C의 귀를 도톰한 삼각형으로 다듬고, A와 같은 반짝이는 눈을 넣었어요.<br>아래 작은 이미지는 실제 64px 크기입니다.')
(root/'index.html').write_text(html)
