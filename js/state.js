
window.NayeOS = {
  get(){
    return JSON.parse(localStorage.getItem('nayeOSState') || '{"xp":0,"visited":[],"achievements":[],"questWins":0,"coins":0,"theme":"rosa","pet":{"name":"Mochi","mood":70,"visits":0},"daily":{}}');
  },
  save(s){ localStorage.setItem('nayeOSState', JSON.stringify(s)); },
  ensure(){
    const s=this.get();
    if(typeof s.coins!=='number') s.coins=0;
    if(!s.theme) s.theme='rosa';
    if(!s.pet) s.pet={name:'Mochi',mood:70,visits:0};
    if(!s.daily) s.daily={};
    if(!Array.isArray(s.visited)) s.visited=[];
    if(!Array.isArray(s.achievements)) s.achievements=[];
    this.save(s); return s;
  },
  todayKey(){
    const d=new Date();
    return d.toISOString().slice(0,10);
  },
  touchDaily(key, amount=1){
    const s=this.ensure(), day=this.todayKey();
    if(!s.daily[day]) s.daily[day]={};
    s.daily[day][key]=(s.daily[day][key]||0)+amount;
    this.save(s);
  },
  awardXP(xp, achievement=null){
    const s=this.ensure();
    s.xp += xp;
    s.coins += Math.max(1, Math.floor(xp/10));
    if(achievement && !s.achievements.includes(achievement)) s.achievements.push(achievement);
    this.save(s);
  },
  visit(app){
    const s=this.ensure();
    if(!s.visited.includes(app)){
      s.visited.push(app);
      s.xp += 10;
      s.coins += 1;
    }
    s.pet.visits=(s.pet.visits||0)+1;
    s.pet.mood=Math.min(100,(s.pet.mood||70)+2);
    this.save(s);
    this.touchDaily('apps',1);
  }
};
window.NayeOS.ensure();
