"""Authored pose studies for the selected A and C pixel cats."""
from pathlib import Path
from copy import deepcopy
import json

ROOT=Path(__file__).parent
soft=json.loads((ROOT.parent/'soft/pixels.json').read_text())
palette=soft['palette']
a=next(v['pixels'] for v in json.loads((ROOT.parent/'soft/eye-variants.json').read_text()) if v['key']=='spark')
c=json.loads((ROOT.parent/'compact/pixels.json').read_text())['frames']['awake']
def blank():return [list('.'*32) for _ in range(32)]
def closed(base,eyes):
    out=deepcopy(base)
    for x in eyes:
        for y in (9,10,11):
            for dx in (0,1):out[y][x+dx]='w'
        for dx in (0,1):out[11][x+dx]='e'
    return out
def tilt(base):
    out=deepcopy(base)
    for y in range(16):
        for x in range(23):out[y][x]='.'
    for y in range(16):
        for x in range(23):
            if base[y][x]!='.':
                yy=y+(1 if x>=14 else 0)
                out[yy][x+1]=base[y][x]
    return out
def wave(base):
    out=deepcopy(base)
    # Replace the planted left foreleg with a short bent arm and rounded paw.
    # Redraw the whole left silhouette so the pose has no extra limb.
    rows={
        16:'......oooow',
        17:'.....owwwow',
        18:'.....owpwow',
        19:'......owwow',
        20:'.......owwo',
        21:'........oww',
        22:'........oww',
        23:'.........ow',
        24:'..........o',
    }
    for y,row in rows.items():
        out[y][:11]=list(row)
    return out
def sleep(base,eyes):
    out=blank()
    body={(x,y) for y in range(17,26) for x in range(10,30) if ((x-19)/10)**2+((y-21)/4.5)**2<=1}
    for x,y in body:
        edge=any((x+dx,y+dy) not in body for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)])
        out[y][x]='o' if edge else ('w' if y>=23 else 'g')
    for x in (19,23,26):
        for y in (18,19,20):
            if out[y][x]=='g':out[y][x]='t'
    head=closed(base,eyes)
    for y in range(16):
        for x in range(23):
            if head[y][x]!='.' and x>=3:out[y+9][x-3]=head[y][x]
    for x in range(19,27):out[23][x]='s'
    return out
def loaf(base):
    out=blank()
    # One tucked body, without extended limbs or a second head-like appendage.
    bounds={17:(9,23),18:(7,25),19:(6,26),20:(5,26),21:(5,27),22:(5,27),23:(6,26),24:(8,24)}
    for y,(left,right) in bounds.items():
        for x in range(left,right+1):
            out[y][x]='o' if x in (left,right) or y==24 else ('w' if x<18 else 'g')
    for x in (20,23):
        for y in (18,19,20):
            if out[y][x]=='g':out[y][x]='t'
    for x in range(18,25):out[23][x]='s'
    for y in range(16):
        for x in range(23):
            if base[y][x]!='.':out[y+5][x]=base[y][x]
    return out

def rects(pixels,lo=0,hi=32,left=0,right=32):
    return ''.join(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{palette[k]}"/>' for y,row in enumerate(pixels) if lo<=y<hi for x,k in enumerate(row) if k!='.' and left<=x<right)

def lifted(base):
    out=deepcopy(base)
    for y in range(16):
        for x in range(23,32):out[y][x]='.'
    for y in range(16,32):out[y]=list('.'*32)
    # Narrow hanging torso, two forelegs at the sides and two relaxed back paws.
    rows={16:'..owwwwwwwwwo..',17:'.owwwwwwwwwwwo.',18:'.owwwwwwwwwwwo.',
          19:'.owwowwwwowwwo.',20:'.owwowwwwowwwo.',21:'.owwowwwwowwwo.',
          22:'..ooowwwwoooo..',23:'...owwwwgggo...',24:'...owwwwgggo...',
          25:'...owwwoowwo...',26:'...owwo.owwo...',27:'....oo...oo....'}
    for y,row in rows.items():
        for x,k in enumerate(row):out[y][x+5]=k
    return out

labels={'awake':'기본 앉기','tilt':'살짝 갸웃','loaf':'식빵 자세','sleep':'잠든 모습','lifted':'들어 올렸을 때'}
allframes={}
for variant,base,eyes in [('a',a,(8,15)),('c',c,(9,14))]:
    frames={'awake':base,'tilt':deepcopy(base),'loaf':loaf(base),'sleep':loaf(closed(base,eyes)),'lifted':lifted(base)}
    allframes[variant]=frames
    for pose,pixels in frames.items():
        content=rects(pixels)
        if pose=='tilt':
            # Rotate the intact head as one rigid group, never shear pixel rows.
            content=rects(pixels,16)+rects(pixels,0,16,23)+ '<g transform="rotate(-8 12.5 15)">'+rects(pixels,0,16,0,23)+'</g>'
        if variant == 'c': (ROOT/f'{variant}-{pose}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges">'+content+'</svg>')
(ROOT/'pixels.json').write_text(json.dumps({'palette':palette,'variants':allframes},indent=2))
sections=[]
for variant,title in [('c','최종 선택 · 작고 둥근 얼굴 / 반짝이는 눈')]:
    cards=''.join(f'<article><h3>{label}</h3><img width="128" height="128" src="{variant}-{pose}.svg" alt="{title} {label}"><img class="actual" width="64" height="64" src="{variant}-{pose}.svg" alt="64px {label}"></article>' for pose,label in labels.items())
    sections.append(f'<section><h2>{title}</h2><div class="grid">{cards}</div></section>')
html='''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A · C 고양이 포즈 비교</title>
<style>*{box-sizing:border-box}body{margin:0;background:#f7f8ff;color:#303443;font-family:system-ui,sans-serif}main{max-width:1160px;margin:auto;padding:32px 24px}h1{font-size:28px;letter-spacing:-1px}p{color:#737787;line-height:1.6}h2{font-size:18px;margin:28px 0 16px}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}article{background:#fff;border:1px solid #e6e7f0;border-radius:20px;text-align:center;padding:18px 4px}h3{font-size:14px;margin:0 0 8px}img{image-rendering:pixelated;object-fit:contain;max-width:100%}.actual{display:block;margin:6px auto 0}a{color:#5355e9}@media(max-width:650px){.grid{grid-template-columns:repeat(2,1fr)}} </style>
<main><b>Still Making · CAT STUDY</b><h1>같은 고양이, 다섯 가지 모습</h1><p>위는 A, 아래는 C예요. 큰 그림 아래에는 실제 64px 크기를 넣었어요.</p>'''
html=html.replace('같은 고양이, 다섯 가지 모습','잠들고, 고개를 기울이고, 번쩍')
html=html.replace('위는 A, 아래는 C예요. 큰 그림 아래에는 실제 64px 크기를 넣었어요.','C는 턱 아래 진한 선을 덜어냈어요. 아래 체험 영역에서 고양이를 잡고 움직여보세요.')
play='''<h2>마우스로 살짝 들어 올려보세요</h2><p>고양이를 누른 채 움직이면 들어 올린 자세로 바뀌고, 놓으면 앉습니다. 키보드는 고양이에 초점을 두고 Space 또는 Enter로 전환할 수 있어요.</p><div class="playgrounds">'''
for v in ('c',):
    play+=f'<div class="playground"><b>{v.upper()}</b><button class="draggable" data-cat="{v}" aria-label="{v.upper()} 고양이 들어 올리기" aria-pressed="false"><img draggable="false" src="{v}-awake.svg" alt=""></button></div>'
play+='''</div><style>.playgrounds{display:grid;grid-template-columns:1fr 1fr;gap:16px}.playground{height:280px;background:#efedff;border-radius:24px;position:relative;overflow:hidden;padding:20px}.draggable{position:absolute;left:calc(50% - 64px);top:100px;width:128px;height:128px;border:0;background:transparent;padding:0;cursor:grab;touch-action:none;user-select:none}.draggable img{width:128px;height:128px;pointer-events:none}.draggable:active{cursor:grabbing}.draggable:focus-visible{outline:2px solid #7778ee;border-radius:12px}</style>
<script>
document.querySelectorAll('.draggable').forEach(button=>{
 const img=button.querySelector('img'),v=button.dataset.cat;let drag=null;
 function pose(up){img.src=v+(up?'-lifted.svg':'-awake.svg');button.setAttribute('aria-pressed',String(up));}
 button.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY};button.setPointerCapture(e.pointerId);pose(true);button.style.transform='translateY(-12px)';});
 button.addEventListener('pointermove',e=>{if(!drag)return;const limit=button.parentElement.clientWidth/2-64;const dx=Math.max(-limit,Math.min(limit,e.clientX-drag.x));const dy=Math.max(-90,Math.min(35,e.clientY-drag.y-12));button.style.transform=`translate(${dx}px,${dy}px)`;});
 function release(){drag=null;pose(false);button.style.transform='';}
 button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
 button.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();const up=button.getAttribute('aria-pressed')!=='true';pose(up);button.style.transform=up?'translateY(-16px)':'';}if(e.key==='Escape')release();});
});
</script>'''
html=html.replace('A · C 고양이 포즈 비교','Still Making · 선택한 고양이').replace('C는 턱 아래 진한 선을 덜어냈어요. 아래 체험 영역에서 고양이를 잡고 움직여보세요.','작고 둥근 얼굴과 반짝이는 눈으로 확정했어요. 아래에서 고양이를 잡고 움직여보세요.')
play=play.replace('grid-template-columns:1fr 1fr','grid-template-columns:1fr').replace('<b>C</b>','<b>선택한 고양이</b>')
(ROOT/'index.html').write_text(html+''.join(sections)+play+'</main></html>')
