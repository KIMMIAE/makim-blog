"""Rounded cheek and chin variant of the original authored tabby sprite."""
from pathlib import Path
from copy import deepcopy
import json

ROOT=Path(__file__).parent
data=json.loads((ROOT.parent/'soft/pixels.json').read_text())
P=data['palette']
awake=deepcopy(data['frames']['awake'])
# Symmetric stair steps: fullness at cheeks, gentle taper into a rounded chin.
bounds={6:(6,19),7:(5,20),8:(4,21),9:(4,21),10:(4,21),
        11:(4,21),12:(5,20),13:(6,19),14:(7,18),15:(9,16)}
original=deepcopy(awake)
for y,(left,right) in bounds.items():
    for x in range(23):awake[y][x]='.'
    for x in range(left,right+1):
        edge=x in (left,right)
        if y>6:
            a,b=bounds[y-1]
            edge=edge or x<a or x>b
        if y<15:
            a,b=bounds[y+1]
            edge=edge or x<a or x>b
        awake[y][x]='o' if edge else ('g' if y<=8 else 'w')
        if not edge and y<=8 and original[y][x] in ('t','p','w'):
            awake[y][x]=original[y][x]
for x in (8,15):
    for y in (10,11):
        for dx in (0,1):awake[y][x+dx]='e'
awake[12][12]='p';awake[12][13]='p'
awake[13][12]='o';awake[13][14]='o'
blink=deepcopy(awake)
for x in (8,15):
    for dx in (0,1):blink[10][x+dx]='w'
tail=deepcopy(awake)
for y in range(15,21):tail[y][23:]=tail[y][24:]+['.']
face=[list('.'*32) for _ in range(32)]
for y in range(2,16):face[y+5]=awake[y].copy()
for x in range(9,17):face[21][x]='o'
# Keep the established curled sleeping silhouette.
frames={'awake':awake,'blink':blink,'tail':tail,'face':face,'sleep':data['frames']['sleep']}
for name,c in frames.items():
    rects=[f'<rect x="{x}" y="{y}" width="1" height="1" fill="{P[k]}"/>' for y,row in enumerate(c) for x,k in enumerate(row) if k!='.']
    (ROOT/f'cat-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges" role="img" aria-label="Rounded tabby '+name+'">'+''.join(rects)+'</svg>')
(ROOT/'pixels.json').write_text(json.dumps({'size':32,'palette':P,'frames':frames},indent=2))
html=(ROOT.parent/'cute/index.html').read_text().replace('MY TABBY · 03','MY TABBY · 05')
html=html.replace('조금 더 동글동글, 조금 더 단순하게','볼과 턱을 더 동그랗게')
html=html.replace('작은 점눈과 짧은 다리, 둥근 볼. 흰 가슴과 고등어 무늬는 살짝만.','2 × 2 점눈, 둥근 볼과 부드러운 턱선. 몸과 꼬리는 그대로.')
html=html.replace('<section>','<section><div style="display:flex;justify-content:center;gap:44px;text-align:center;margin-bottom:24px"><div><img src="../soft/eyes-round.svg" width="128" style="image-rendering:pixelated" alt="수정 전"><p>수정 전</p></div><div><img src="cat-awake.svg" width="128" style="image-rendering:pixelated" alt="둥근 얼굴"><p>둥근 얼굴</p></div></div>')
(ROOT/'index.html').write_text(html)
