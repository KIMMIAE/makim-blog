# -*- coding: utf-8 -*-
"""Compare eye sizes on exactly the same original pixel sprite."""
from pathlib import Path
from copy import deepcopy
import json

root=Path(__file__).parent
data=json.loads((root/'pixels.json').read_text())
palette=data['palette']
base=data['frames']['awake']
variants=[]
for key,title,note in [('small','01 · 작은 점눈','현재 버전 · 1 × 2'),('round','02 · 또렷한 눈','추천 · 2 × 2'),('spark','03 · 반짝이는 눈','2 × 3 + 작은 하이라이트')]:
    pixels=deepcopy(base)
    for y in (9,10,11):
        for x in range(7,18):pixels[y][x]='w'
    if key=='small':
        for x in (9,16):
            for y in (10,11):pixels[y][x]='e'
    else:
        for x in (8,15):
            for y in ((10,11) if key=='round' else (9,10,11)):
                for dx in (0,1):pixels[y][x+dx]='e'
            if key=='spark':pixels[9][x]='w'
    rects=[f'<rect x="{x}" y="{y}" width="1" height="1" fill="{palette[k]}"/>' for y,row in enumerate(pixels) for x,k in enumerate(row) if k!='.']
    (root/f'eyes-{key}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32" shape-rendering="crispEdges">'+''.join(rects)+'</svg>')
    variants.append({'key':key,'title':title,'note':note,'pixels':pixels})
(root/'eye-variants.json').write_text(json.dumps(variants,indent=2))
cards=''.join(f'<article class="{"recommended" if v["key"]=="round" else ""}"><h2>{v["title"]}</h2><p>{v["note"]}</p><div class="big"><img src="eyes-{v["key"]}.svg" alt="{v["title"]}" width="192" height="192"></div><div class="sizes"><img src="eyes-{v["key"]}.svg" alt="64픽셀 크기" width="64"><img src="eyes-{v["key"]}.svg" alt="96픽셀 크기" width="96"></div><small>실제 배치 크기 · 64 / 96 px</small></article>' for v in variants)
(root/'eyes.html').write_text('''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>고양이 눈 비교</title><style>*{box-sizing:border-box}body{margin:0;background:#f7f8ff;color:#303443;font-family:system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:56px 24px}h1{font-size:30px;letter-spacing:-1px}p{color:#737787;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:32px}article{background:white;border:2px solid #ececf4;border-radius:24px;padding:26px 18px;text-align:center}.recommended{border-color:#7778ee}h2{font-size:19px}.big{padding:24px 0;background:#fafaff;border-radius:18px;margin:24px 0}.sizes{min-height:108px;display:flex;align-items:end;justify-content:center;gap:24px}img{image-rendering:pixelated}small{color:#868999}a{color:#5355e9}@media(max-width:700px){.grid{grid-template-columns:1fr}}</style>

<main><b>Still Making · CAT STUDY</b><h1>눈만 바꾸면, 인상이 어떻게 달라질까요?</h1><p>머리·몸·색·무늬는 그대로 두고 눈만 비교합니다.</p><div class="grid">'''+cards+'''</div><p>추천은 가운데 2번입니다. 작은 크기에서도 눈이 잘 보이고, 복잡한 홍채 없이 표정이 또렷합니다.</p><a href="./">동작 미리보기로 돌아가기 →</a></main></html>''')
