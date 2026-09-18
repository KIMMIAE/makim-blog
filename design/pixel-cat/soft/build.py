"""V4: return to the first authored icon's silhouette, with sparse tabby marks."""
import ast
import json
from pathlib import Path
from copy import deepcopy

ROOT=Path(__file__).parent
tree=ast.parse((ROOT.parent/'build.py').read_text())
raw={n.targets[0].id:ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and isinstance(n.targets[0],ast.Name) and n.targets[0].id in ('AWAKE','SLEEP')}
P={'o':'#494C5D','e':'#303443','w':'#FFFEFB','g':'#BCB9B0','t':'#898D86','s':'#E5E5DE','p':'#EDBBB2'}
def grid(rows):return [list(r.ljust(32,'.')) for r in rows]+[list('.'*32) for _ in range(32-len(rows))]
awake=grid(raw['AWAKE'])
# Remove the invented collar. Rebuild the cap symmetrically, with a white blaze.
for y,row in enumerate(awake):
    for x,k in enumerate(row):
        if k in ('b','y'):row[x]='w'
        if 2<=y<=8 and k not in ('.','o','p'):row[x]='g'
        if 9<=y<=14 and k not in ('.','o','p'):row[x]='w'
        if x>=23 and k=='w':row[x]='g'
for x,y in [(9,6),(9,7),(13,5),(13,6),(17,6),(17,7)]:awake[y][x]='t'
for x,y in [(12,7),(13,7),(12,8),(13,8)]:awake[y][x]='w'
# Clear the old eye/mouth interior before placing balanced small dark eyes.
for y in (10,11,12,13):
    for x in range(7,18):awake[y][x]='w'
for x in (9,16):
    awake[10][x]='e';awake[11][x]='e'
awake[12][13]='p'
awake[13][12]='o';awake[13][14]='o'
for x,y in [(18,19),(19,19),(19,22),(20,22),(26,17),(27,17),(25,21),(26,21)]:
    if awake[y][x] not in ('.','o'):awake[y][x]='t'
# Compact body by two rows; keep the original raised tail and white paws.
awake=awake[:20]+awake[22:]+[list('.'*32),list('.'*32)]
blink=deepcopy(awake)
for x in (9,16):blink[10][x]='w';blink[11][x]='e';blink[11][x+1]='e'
tail=deepcopy(awake)
for y in range(15,21):tail[y][23:]=tail[y][24:]+['.']
sleep=grid(raw['SLEEP'])
for row in sleep:
    for x,k in enumerate(row):
        if k in ('b','y'):row[x]='w'
for x,y in [(18,14),(18,15),(22,15),(22,16),(25,17),(25,18),(23,24),(24,24)]:
    if sleep[y][x]=='g':sleep[y][x]='t'
face=[list('.'*32) for _ in range(32)]
for y in range(2,15):face[y+5]=awake[y].copy()
frames={'awake':awake,'blink':blink,'tail':tail,'sleep':sleep,'face':face}
for name,c in frames.items():
    r=[f'<rect x="{x}" y="{y}" width="1" height="1" fill="{P[k]}"/>' for y,row in enumerate(c) for x,k in enumerate(row) if k!='.']
    (ROOT/f'cat-{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges" role="img" aria-label="Tabby '+name+'">'+''.join(r)+'</svg>')
(ROOT/'pixels.json').write_text(json.dumps({'size':32,'palette':P,'frames':frames},indent=2))
html=(ROOT.parent/'cute/index.html').read_text().replace('MY TABBY · 03','MY TABBY · 04')
html=html.replace('조금 더 동글동글, 조금 더 단순하게','처음의 귀여운 느낌으로')
html=html.replace('작은 점눈과 짧은 다리, 둥근 볼. 흰 가슴과 고등어 무늬는 살짝만.','작은 까만 눈, 하얀 얼굴과 짧은 몸. 고등어 무늬는 몇 픽셀만.')
html=html.replace('<div class="frames">','<div class="frames">')
# Show original alongside revision so the reference is unambiguous.
html=html.replace('<section>','<section><div style="display:flex;justify-content:center;gap:48px;text-align:center;margin-bottom:24px"><div><img src="../cat-awake.svg" width="96" style="image-rendering:pixelated" alt="첫 자체 제작안"><p>첫 자체 제작안</p></div><div><img src="cat-awake.svg" width="96" style="image-rendering:pixelated" alt="새 태비 아이콘"><p>새 태비 아이콘</p></div></div>')
(ROOT/'index.html').write_text(html)
