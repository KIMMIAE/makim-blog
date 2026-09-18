"""Original pixel grids authored for this blog; no external sprite input."""
from pathlib import Path
import json

ROOT = Path(__file__).parent
PALETTE = {'o': '#30364D', 'w': '#F8FAFC', 'g': '#AAB4CE',
           's': '#DCE3EF', 'p': '#FDA4AF', 'b': '#6366F1', 'y': '#FDE68A'}
# 32 x 32 logical canvas. Each character is one deliberately placed pixel.
# Distinctive details: one gray ear, forehead patch, lilac collar, yellow tag,
# two white front paws and an upright hooked tail.
AWAKE = [
'................................',
'................................',
'.......oo........oo.............',
'......oggo......owwo............',
'......ogpgo....owpwwo...........',
'......ogggooooowwwwwo...........',
'......ogggggwwwwwwwwo...........',
'.....ogggggwwwwwwwwwwo..........',
'.....oggggwwwwwwwwwwwo..........',
'.....owwwwwwwwwwwwwwwo..........',
'.....owwoowwwwwoowwwwo..........',
'.....owwoowwwwwoowwwwo..........',
'.....owwwwwwpwwwwwwwwo..........',
'......owwwwowowwwwwo............',
'.......owwwwwwwwwoo.............',
'........obbbbbbbbo.......ooo....',
'........osssyssso.......owwwo...',
'.......owwwwwwwwwo......owwwo...',
'......owwwwwwwwwwwo.....owwo....',
'......owwwwwwwggggwo....owwo....',
'.....owwwwwwwwgggggwo...owwo....',
'.....owwwwwwwwgggggwo...owwo....',
'.....owwwwwwwwgggggwo..owwwo....',
'.....owwwowwwowggggwooowwwo.....',
'.....owwwowwwowggggwwwwwwo......',
'.....owwwowwwowggggwwwwoo.......',
'......ooo.ooo.oooooooo..........',
'................................',
]
SLEEP = [
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'................................',
'.................ooooooo........',
'......oo...oo..oowwwgggggoo.....',
'.....oggo.owwoowwwwwgggggggo....',
'.....ogggowwwowwwwwwwgggggggo...',
'....ogggggwwwwwwwwwwwgggggggo...',
'...oggggwwwwwwwowwwwwwgggggggo..',
'...owwwwwwwwwwwowwwwwwgggggggo..',
'...owwwwwwwwwwwowwwwwwgggggggo..',
'...owwowwwowwwwowwwwwwgggggggo..',
'...owwwoooowwwwowwwwwwwggggggo..',
'...owwwwwpwwwwwobbbwwwwggggggo..',
'....owwwwwwwwwoowywwwwwwggggo...',
'.....oowwwwooowwwooooossssso....',
'......oooooo..oooooooosssso.....',
'......................oooo......',
'................................',
]

def normalized(rows):
    assert all(len(row) <= 32 for row in rows)
    return [row.ljust(32, '.') for row in rows] + ['.' * 32] * (32 - len(rows))

awake = normalized(AWAKE)
sleep = normalized(SLEEP)
blink = awake.copy()
for y in (10, 11):
    blink[y] = blink[y].replace('oo', 'ww')
blink[11] = awake[11]
tail = awake.copy()
for y in range(15, 23):
    row = list(tail[y])
    section = row[24:]
    row[24:] = section[1:] + ['.']
    tail[y] = ''.join(row)
frames = {'awake': awake, 'blink': blink, 'tail': tail, 'sleep': sleep}

def svg(rows, name):
    rects = []
    for y, row in enumerate(rows):
        for x, value in enumerate(row):
            if value != '.':
                rects.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{PALETTE[value]}"/>')
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="128" height="128" shape-rendering="crispEdges" role="img" aria-label="' + name + '">' + ''.join(rects) + '</svg>'

for name, rows in frames.items():
    (ROOT / f'cat-{name}.svg').write_text(svg(rows, f'Blog cat: {name}'))
(ROOT / 'pixels.json').write_text(json.dumps({'palette': PALETTE, 'frames': frames}, indent=2))

HTML = '''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Still Making · 직접 만든 도트 고양이</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f7f8ff;color:#252a42;font-family:system-ui,-apple-system,sans-serif}main{max-width:1040px;margin:0 auto;padding:64px 28px}header{display:flex;justify-content:space-between;align-items:center}header b{font-size:22px}small{color:#6366f1;font-weight:600}h1{font-size:36px;letter-spacing:-1px;margin:56px 0 16px}p{line-height:1.7;color:#646b82}section{margin-top:32px;padding:40px;background:white;border:1px solid #e9eaf4;border-radius:28px}.stage{min-height:240px;display:grid;place-content:center;text-align:center;background:linear-gradient(180deg,#fff,#f2f3ff);border-radius:20px}.cat{border:0;background:transparent;padding:12px 50px 0;cursor:pointer;border-radius:20px}.cat:focus-visible,button:focus-visible{outline:3px solid #6366f1;outline-offset:4px}.cat img{width:160px;height:160px;image-rendering:pixelated;display:block}.bubble{height:28px;color:#6366f1;font-size:15px}.controls{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:20px}.controls button{border:1px solid #e3e5f1;background:#fff;border-radius:999px;padding:11px 20px;color:#404963;cursor:pointer}.controls button.active{background:#5355e9;color:white;border-color:#5355e9}.frames{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:28px}.frame{text-align:center;background:#f7f8fc;border-radius:18px;padding:20px 8px}.frame img{width:96px;image-rendering:pixelated}.frame span{display:block;font-size:14px;color:#646b82}.note{font-size:13px;margin-top:26px}a{color:#5355e9}@media(max-width:600px){main{padding:32px 18px}h1{font-size:27px}section{padding:20px}.frames{grid-template-columns:repeat(2,1fr)}}
</style><main><header><b>Still Making</b><small>PIXEL CAT · 01</small></header><h1>우리 블로그에 살 고양이</h1><p>회색 귀와 이마 무늬, 보라색 목걸이, 작은 노란 태그.<br>32 × 32 픽셀부터 직접 설계한 첫 번째 캐릭터입니다.</p><section><div class="stage"><div class="bubble" id="bubble" aria-live="polite">쉬는 중…</div><button class="cat" id="cat" aria-label="고양이 깨우기"><img id="sprite" src="cat-sleep.svg" alt=""></button></div><div class="controls"><button data-state="sleep" class="active">잠들기</button><button data-state="awake">눈 뜨기</button><button data-state="blink">눈 깜빡이기</button><button data-state="tail">꼬리 움직이기</button></div><div class="frames">FRAMES</div><p class="note">고양이를 클릭하거나 키보드로 실행해 보세요. 잠깐 반응한 뒤 다시 잠듭니다.<br>외부 스프라이트·생성 이미지·아이콘 폰트를 사용하지 않았습니다.</p></section><p class="note">제작 원본: <a href="pixels.json">픽셀 배열</a> · <a href="build.py">SVG 생성 코드</a></p></main>
<script>
const sprite=document.querySelector('#sprite'),bubble=document.querySelector('#bubble'),cat=document.querySelector('#cat');let timers=[];const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const labels={sleep:'쉬는 중…',awake:'불렀어요?',blink:'눈 깜빡!',tail:'살랑살랑'};
function frame(state){sprite.src='cat-'+state+'.svg'}
function clear(){timers.forEach(clearTimeout);timers=[]}
function later(fn,ms){timers.push(setTimeout(fn,ms))}
function choose(state){clear();frame(state);bubble.textContent=labels[state];document.querySelectorAll('[data-state]').forEach(b=>b.classList.toggle('active',b.dataset.state===state));cat.setAttribute('aria-label',state==='sleep'?'고양이 깨우기':'고양이와 인사하기');if(state==='tail'&&!reduced.matches){for(let i=1;i<=6;i++)later(()=>frame(i%2?'awake':'tail'),i*220)}if(state==='blink'&&!reduced.matches)later(()=>frame('awake'),180)}
document.querySelectorAll('[data-state]').forEach(b=>b.onclick=()=>choose(b.dataset.state));cat.onclick=()=>{choose('awake');if(!reduced.matches){later(()=>frame('blink'),700);later(()=>frame('awake'),880);later(()=>frame('tail'),1200);later(()=>frame('awake'),1450)}later(()=>choose('sleep'),3200)};reduced.addEventListener('change',()=>choose('sleep'));
Object.keys(labels).forEach(s=>{const image=new Image();image.src='cat-'+s+'.svg'});
</script></html>'''
HTML = HTML.replace('FRAMES', ''.join(f'<div class="frame"><img src="cat-{name}.svg" alt="{label}"><span>{label}</span></div>' for name, label in [('sleep','잠든 모습'),('awake','깨어난 모습'),('blink','눈 깜빡임'),('tail','꼬리 변형')]))
(ROOT / 'index.html').write_text(HTML)
