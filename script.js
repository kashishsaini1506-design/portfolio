document.getElementById('navToggle').addEventListener('click', function(){
  document.getElementById('navList').classList.toggle('open');
});
document.querySelectorAll('#navList a').forEach(a=>{
  a.addEventListener('click', ()=>document.getElementById('navList').classList.remove('open'));
});

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, {threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* Animated neural-network background */
(function(){
  const canvas = document.getElementById('neuralCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes;
  const NODE_COUNT = window.innerWidth < 700 ? 34 : 70;
  const LINK_DIST = 140;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeNodes(){
    nodes = Array.from({length:NODE_COUNT}, ()=>({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-0.5)*0.35, vy:(Math.random()-0.5)*0.35
    }));
  }
  makeNodes();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function tick(){
    ctx.clearRect(0,0,w,h);
    for(const n of nodes){
      if(!reduceMotion){
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > w) n.vx *= -1;
        if(n.y < 0 || n.y > h) n.vy *= -1;
      }
    }
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist < LINK_DIST){
          ctx.strokeStyle = `rgba(0,240,255,${(1 - dist/LINK_DIST)*0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    for(const n of nodes){
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(168,85,247,0.55)';
      ctx.fill();
    }
    if(!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
})();

/* Custom animated cursor: dot snaps instantly, ring trails with easing */
(function(){
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if(!dot || !ring) return;
  let mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;
  let ringX=mouseX, ringY=mouseY;

  window.addEventListener('mousemove', (e)=>{
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mousedown', ()=>ring.classList.add('click'));
  document.addEventListener('mouseup', ()=>ring.classList.remove('click'));

  const interactive = 'a, button, input, textarea, .pill, .project-card, .filter-btn, .about-card, .exp-card';
  document.querySelectorAll(interactive).forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('active'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('active'));
  });

  document.addEventListener('mouseleave', ()=>{ dot.style.opacity=0; ring.style.opacity=0; });
  document.addEventListener('mouseenter', ()=>{ dot.style.opacity=1; ring.style.opacity=0.7; });
})();
