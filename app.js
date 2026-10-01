(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const views = ["dashboard","calendar","tasks","planner","focus","groups","progress","simulator","settings"];
  const names = {dashboard:"Overview",calendar:"Smart calendar",tasks:"Tasks & deadlines",planner:"AI study planner",focus:"Focus mode",groups:"Group workspace",progress:"Progress & analytics",simulator:"What-if simulator",settings:"Settings & privacy"};
  const toast = (message) => { const node=$("#toast"); node.textContent=message; node.classList.add("show"); clearTimeout(toast.timeout); toast.timeout=setTimeout(()=>node.classList.remove("show"),2600); };
  function showView(name) {
    if (!views.includes(name)) name="dashboard";
    $$(".view").forEach(view=>view.classList.toggle("active",view.id==="view-"+name));
    $$(".nav-item[data-view]").forEach(item=>item.classList.toggle("active",item.dataset.view===name));
    $("#breadcrumb-current").textContent=names[name];
    $("#sidebar").classList.remove("open");
    window.location.hash=name;
    window.scrollTo({top:0,behavior:document.body.classList.contains("reduce-motion")?"instant":"smooth"});
  }
  $$(".nav-item[data-view]").forEach(item=>item.addEventListener("click",()=>showView(item.dataset.view)));
  $$("[data-go]").forEach(item=>item.addEventListener("click",()=>showView(item.dataset.go)));
  $("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
  document.addEventListener("click",event=>{if(innerWidth<=820&&!event.target.closest("#sidebar")&&!event.target.closest("#mobile-menu"))$("#sidebar").classList.remove("open")});
  const today=new Date(); $("#today-label").textContent=today.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});
  const initialView=location.hash.slice(1); if(views.includes(initialView))showView(initialView);

  const checks=$$(".task-check");
  const saved=JSON.parse(localStorage.getItem("uniflow-checks")||"[]");
  checks.forEach((box,index)=>{box.checked=!!saved[index];box.addEventListener("change",saveChecks)});
  function saveChecks(){const values=checks.map(box=>box.checked);localStorage.setItem("uniflow-checks",JSON.stringify(values));const done=values.filter(Boolean).length;$("#done-count").textContent=8+done;$("#task-progress").style.width=Math.min(100,67+done*8)+"%";$("#tasks-open").textContent=Math.max(0,4-done);$("#task-count").textContent=Math.max(0,4-done);toast(done?"Nice work. Your progress is saved on this device.":"Task marked open again.");}
  $("#task-count").textContent=Math.max(0,4-checks.filter(x=>x.checked).length);

  const taskDialog=$("#task-dialog");
  $("#new-task-button").addEventListener("click",()=>taskDialog.showModal());
  $("#task-form").addEventListener("submit",event=>{event.preventDefault();const title=$("#new-task-title").value.trim();if(!title)return;const module=$("#new-task-module").value.trim()||"Personal";const row=document.createElement("label");row.className="task-row";row.innerHTML='<input type="checkbox" class="task-check"><span class="task-name"><b></b><small>Added just now</small></span><span class="module-name"></span><span class="due-date">No date</span><span class="tag tag-soft">New</span><span class="status-open">○ Open</span>';$(".task-name b",row).textContent=title;$(".module-name",row).textContent=module;$(".task-panel").append(row);$("#new-task-title").value="";$("#new-task-module").value="";taskDialog.close();toast("Task added to your list.");});
  $("#filter-button").addEventListener("click",()=>toast("Showing all tasks."));
  $("#invite-button").addEventListener("click",()=>toast("Invite links are not connected in this prototype."));
  $("#message-team").addEventListener("click",()=>toast("Team chat is a concept interaction in this prototype."));
  $("#group-add-task").addEventListener("click",()=>toast("Your next step is ready to add."));
  $("#edit-profile").addEventListener("click",()=>toast("Profile editing is not connected in this prototype."));
  $("#progress-range").addEventListener("click",()=>toast("This view shows your current week."));
  $(".notification-button").addEventListener("click",()=>toast("You're all caught up."));
  
  const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
  let calendarDate=new Date(2026,2,12), selectedDate=new Date(2026,2,12);
  const scheduled={"2026-2-12":[["Proposal due","deadline"],["Lecture review","study"]],"2026-2-13":[["UX critique","class"]],"2026-2-16":[["Problem set 4","deadline"]],"2026-2-19":[["Research proposal","deadline"]],"2026-2-20":[["Library study","study"]],"2026-2-24":[["UX studio","class"]]};
  const dateKey=d=>d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
  function drawCalendar(){
    $("#month-title").textContent=monthNames[calendarDate.getMonth()]+" "+calendarDate.getFullYear();
    const grid=$("#calendar-grid");grid.replaceChildren();
    ["MON","TUE","WED","THU","FRI","SAT","SUN"].forEach(day=>{const cell=document.createElement("div");cell.className="calendar-cell day-name";cell.textContent=day;grid.append(cell)});
    const first=new Date(calendarDate.getFullYear(),calendarDate.getMonth(),1);let offset=(first.getDay()+6)%7;const start=new Date(first);start.setDate(1-offset);
    for(let i=0;i<42;i++){const date=new Date(start);date.setDate(start.getDate()+i);const cell=document.createElement("button");cell.className="calendar-cell";cell.type="button";cell.setAttribute("aria-label",date.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}));if(date.getMonth()!==calendarDate.getMonth())cell.classList.add("other-month");if(dateKey(date)===dateKey(selectedDate))cell.classList.add("selected");if(dateKey(date)==="2026-2-12")cell.classList.add("today");const number=document.createElement("span");number.className="day-number";number.textContent=date.getDate();cell.append(number);(scheduled[dateKey(date)]||[]).forEach(([label,type])=>{const event=document.createElement("span");event.className="calendar-event event-"+type;event.textContent=label;cell.append(event)});cell.addEventListener("click",()=>{selectedDate=date;drawCalendar();toast("Selected "+date.toLocaleDateString("en-GB",{day:"numeric",month:"long"})+".")});grid.append(cell)}
  }
  drawCalendar();$("#prev-month").addEventListener("click",()=>{calendarDate.setMonth(calendarDate.getMonth()-1);drawCalendar()});$("#next-month").addEventListener("click",()=>{calendarDate.setMonth(calendarDate.getMonth()+1);drawCalendar()});$("#today-button").addEventListener("click",()=>{calendarDate=new Date(today.getFullYear(),today.getMonth(),1);selectedDate=new Date(today);drawCalendar()});

  $("#generate-plan").addEventListener("click",()=>{const module=$("#planner-module").value,goal=$("#planner-goal").value.trim()||"Make progress on "+module.toLowerCase(),minutes=Number($("#planner-time").value),energy=$("#planner-energy").value;const focus=Math.max(20,Math.round((minutes-15)*.55)),practice=Math.max(15,minutes-focus-15);const result=$("#plan-result");result.classList.add("generated");result.innerHTML='<div class="generated-plan"><span class="section-kicker">A PLAN THAT LEAVES ROOM TO BREATHE</span><h2>Your '+minutes+' minute study flow</h2><p>'+module+' · '+energy.toLowerCase()+' energy · built around your goal</p><div class="plan-step"><span class="step-time">00–05 min</span><div class="step-copy"><b>Settle in and get ready</b><p>Gather your notes, silence distractions and choose one clear outcome.</p></div></div><div class="plan-step"><span class="step-time">05–'+(5+focus)+' min</span><div class="step-copy"><b>Focused study: '+goal+'</b><p>Work through the most important idea. Capture questions as they come up.</p></div></div><div class="plan-step"><span class="step-time">'+(5+focus)+'–'+(10+focus)+' min</span><div class="step-copy"><b>Take a proper reset</b><p>Step away from the screen, stretch and get some water.</p></div></div><div class="plan-step"><span class="step-time">'+(10+focus)+'–'+minutes+' min</span><div class="step-copy"><b>Practise and wrap up</b><p>Use '+practice+' minutes to apply what you learned and note your next step.</p></div></div><div class="planner-note">✦ This is a suggested plan. Adjust the pace to suit you.</div><button class="button button-primary" id="start-planned-focus" style="margin-top:16px">Start a focus session</button></div>';$("#start-planned-focus").addEventListener("click",()=>showView("focus"));});

  let duration=25*60, remaining=duration, timer=null;
  const display=()=>$("#timer-display").textContent=String(Math.floor(remaining/60)).padStart(2,"0")+":"+String(remaining%60).padStart(2,"0");
  $$(".timer-mode").forEach(button=>button.addEventListener("click",()=>{$$(".timer-mode").forEach(b=>b.classList.remove("active"));button.classList.add("active");duration=Number(button.dataset.minutes)*60;remaining=duration;clearInterval(timer);timer=null;$("#timer-start").textContent="Start focusing";display();$("#timer-ring").style.background="conic-gradient(var(--purple) 0deg,#eeeafc 0deg)"}));
  $("#timer-start").addEventListener("click",()=>{if(timer){clearInterval(timer);timer=null;$("#timer-start").textContent="Resume session";return}$("#timer-start").textContent="Pause session";timer=setInterval(()=>{remaining--;display();$("#timer-ring").style.background="conic-gradient(var(--purple) "+((duration-remaining)/duration*360)+"deg,#eeeafc 0deg)";if(remaining<=0){clearInterval(timer);timer=null;$("#timer-start").textContent="Start focusing";let total=Number(localStorage.getItem("uniflow-focus")||150)+Math.round(duration/60);localStorage.setItem("uniflow-focus",total);$("#focus-total").textContent=total;toast("Focus session complete. Take a well-earned break.")}},1000)});
  $("#timer-reset").addEventListener("click",()=>{clearInterval(timer);timer=null;remaining=duration;display();$("#timer-start").textContent="Start focusing";$("#timer-ring").style.background="conic-gradient(var(--purple) 0deg,#eeeafc 0deg)"});
  $("#focus-total").textContent=localStorage.getItem("uniflow-focus")||150;

  $("#sim-hours").addEventListener("input",event=>$("#sim-hours-label").textContent=event.target.value+" "+(event.target.value==="1"?"hour":"hours"));
  $("#run-simulation").addEventListener("click",()=>{const hours=Number($("#sim-hours").value),day=$("#sim-day").value,module=$("#sim-module").value;$("#sim-result").innerHTML='<div class="sim-orbit">⌁</div><span class="section-kicker">YOUR WEEK, REIMAGINED</span><h2>A '+hours+' hour block could fit.</h2><p>Here’s one low-pressure way to make space for '+module+' this week.</p><div class="simulation-output"><div class="simulation-metric"><span>Suggested time</span><b>'+day+', 10:00 AM</b></div><div class="simulation-metric"><span>Study time this week</span><b>12.5 → '+(12.5+hours)+' hrs</b></div><div class="simulation-metric"><span>Deadline breathing room</span><b>+ '+Math.min(2,hours)+' day'+(hours>1?"s":"")+'</b></div><p class="simulation-note">You can split this into '+Math.max(1,Math.ceil(hours/1.5))+' manageable block'+(hours>1?"s":"")+'. Treat this as an option, not another obligation.</p><button class="button button-primary" id="apply-simulation">Add this idea to my plan</button></div>';$("#apply-simulation").addEventListener("click",()=>{toast("Study idea added to your planning notes.");showView("planner")})});

  const prefs=JSON.parse(localStorage.getItem("uniflow-prefs")||"{}");
  $("#large-text").checked=!!prefs.largeText;$("#reduce-motion").checked=!!prefs.reduceMotion;$("#study-reminders").checked=prefs.reminders!==false;
  function applyPrefs(){document.body.classList.toggle("large-text",$("#large-text").checked);document.body.classList.toggle("reduce-motion",$("#reduce-motion").checked);localStorage.setItem("uniflow-prefs",JSON.stringify({largeText:$("#large-text").checked,reduceMotion:$("#reduce-motion").checked,reminders:$("#study-reminders").checked}))}
  ["large-text","reduce-motion","study-reminders"].forEach(id=>$("#"+id).addEventListener("change",applyPrefs));applyPrefs();
  $("#clear-data").addEventListener("click",()=>{localStorage.removeItem("uniflow-checks");localStorage.removeItem("uniflow-prefs");localStorage.removeItem("uniflow-focus");checks.forEach(check=>check.checked=false);$("#done-count").textContent="8";$("#tasks-open").textContent="4";$("#task-count").textContent="4";$("#task-progress").style.width="67%";$("#focus-total").textContent="150";$("#large-text").checked=false;$("#reduce-motion").checked=false;$("#study-reminders").checked=true;applyPrefs();toast("Saved prototype data cleared from this device.")});
})();